import { IRule } from './rules.ts';
import { escapeCssSpecialChars, getSelector } from './index.ts';
import { REGEX } from './regex-map.ts';

const formatClassName = function(str: string) {
  return str.replace(REGEX.SELECTOR, '').trim();
};

/**
 * Create a MAP of style rule objects
 * @param classList List of class names to process
 * @param rules Array of style rule definitions (IRule)
 * @param map Cache map for storing style rule objects
 */
export const createStyle = function(
  classList: Set<string> = new Set(),
  rules: IRule[] = [],
  map: Map<string, Record<string, string>> = new Map()
) {
  classList.forEach(classStr => {
    const formattedClass = formatClassName(classStr);
    if (map.has(classStr)) return; // Skip if the style cache table already has the entry
    for (const rule of rules) {
      if (typeof rule.regex === 'function') { // regex can also be a function
        const val = rule.regex(formattedClass);
        if (typeof val === 'string') {
          const styleRule = rule.handler(val.trim(), [val]);
          if (styleRule) map.set(classStr, styleRule); // Store in style cache table
          break; // Process next class
        }
      } else if ((rule.regex as unknown) instanceof RegExp) { // Regular expression mode
        const match = formattedClass.match(rule.regex);
        if (match && match[1]) {
          const styleRule = rule.handler(match[1], match);
          if (styleRule !== null) map.set(classStr, styleRule); // Store in style cache table
          break; // Process next class
        }
      }
    }
  });

  return map;
};

/**
 * Build new style rules
 * @param map Cache map containing style rule objects
 * @param oldKeys List of existing class keys to skip
 * @param prefix Prefix for generated CSS selectors
 */
export const buildStyle = function(
  map: Map<string, Record<string, string>> = new Map(),
  oldKeys: Set<string> = new Set(),
  prefix: string = ''
) {
  const styleText: string[] = [];
  const prefixSelector = prefix ? `.${prefix} ` : '';

  map.forEach((styleConfig, key) => {
    if (oldKeys.has(key)) return;
    const hasChild = !!styleConfig.child;

    // Escape special CSS characters like [, ], # that cannot be directly recognized by CSS
    const escapedClassName = escapeCssSpecialChars(key);
    // Splice prefix -> .prefix .text-[16px] { ... }
    const hasSelector = REGEX.SELECTOR.test(key);
    const baseSelector = `${prefixSelector}.${escapedClassName}${hasSelector ? getSelector(key) : ''}`;

    const styleProperties = Object.entries(styleConfig)
      .filter(([key]) => key !== 'child')
      .map(([key, value]) => `${key}:${value};`)
      .join('');
    styleText.push(`${baseSelector}{${styleProperties}}`);
    if (hasChild) {
      const [childEl, childStyle] = styleConfig.child.split('{').map(s => s.trim().replace('}', ''));
      if (childEl && childStyle) {
        styleText.push(`${prefixSelector}.${escapedClassName} ${childEl}{${childStyle}}`);
      }
    }
  });
  return styleText;
};
