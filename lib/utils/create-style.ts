import { IRule } from './rules.ts';
import { escapeCssSpecialChars, getSelector } from './index.ts';
import { REGEX } from './regex-map.ts';

const fmtClassStr = function(str: string) {
  return str.replace(REGEX.SELECTOR, '').trim();
};

/**
 * Create a MAP of style rule objects
 * @param classList List of class names to process
 * @param rules Array of style rule definitions (IRule)
 * @param map Cache map for storing style rule objects
 */
export const createStyle = (classList: string[], rules: IRule[], map: Map<string, Record<string, string>>) => {
  const cacheMap = map;
  classList.forEach(classStr => {
    const fmtClass = fmtClassStr(classStr);
    if (cacheMap.has(classStr)) return; // Skip if the style cache table already has the entry
    for (const rule of rules) {
      if (typeof rule.regex === 'function') { // regex can also be a function
        const val = rule.regex(fmtClass);
        if (typeof val === 'string') {
          const styleRule = rule.handler(val.trim(), [val]);
          if (styleRule) cacheMap.set(classStr, styleRule); // Store in style cache table
          break; // Process next class
        }
      } else if ((rule.regex as unknown) instanceof RegExp) { // Regular expression mode
        const match = fmtClass.match(rule.regex);
        if (match) {
          const value = match[1];
          if (value) {
            const styleRule = rule.handler(value, match);
            if (styleRule !== null) cacheMap.set(classStr, styleRule); // Store in style cache table
          }
          break; // Process next class
        }
      }
    }
  });

  return cacheMap;
};

/**
 * Build new style rules
 * @param map Cache map containing style rule objects
 * @param oldKeys List of existing class keys to skip
 * @param prefix Prefix for generated CSS selectors
 */
export const buildStyle = (map: Map<string, Record<string, string>>, oldKeys: string[], prefix: string) => {
  const styleText: string[] = [];
  map.forEach((config, key) => {
    if (oldKeys.includes(key)) return;
    // Escape special CSS characters like [, ], # that cannot be directly recognized by CSS
    const fmtKey = escapeCssSpecialChars(key);
    // Splice prefix -> .prefix .text-[16px] { ... }
    const prefixKey = prefix ? '.' + prefix + ' ' : '';
    let hasChild = false;
    // Match (hover|active):rule
    const hasSelector = REGEX.SELECTOR.test(key);
    const styleBlock = [`${prefixKey}.${fmtKey}${hasSelector ? getSelector(key) : ''}{`];
    const configs: string[] = [];
    Object.keys(config).forEach(item => {
      if (item === 'child') {
        hasChild = true;
      } else {
        configs.push(`${item}:${config[item]};`);
      }
    });
    styleBlock.push(...configs);
    styleBlock.push('}');
    styleText.push(styleBlock.join(''));

    // Add custom class selectors (e.g., .size img{width:100%;height:100%})
    if (hasChild && typeof config['child'] === 'string') {
      styleText.push(`${prefixKey}.${fmtKey} ${config['child']}`);
    }
  });
  return styleText;
};
