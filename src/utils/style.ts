import type { IRule } from '../rules';
import { escapeCssSpecialChars, getSelector } from './dom';
import { REGEX } from './regex';

const formatClassName = function(str: string) {
  return str.replace(REGEX.SELECTOR, '').trim();
};

export const createStyle = function(
  classList: Set<string> = new Set(),
  rules: IRule[] = [],
  map: Map<string, Record<string, string>> = new Map()
) {
  classList.forEach(classStr => {
    const formattedClass = formatClassName(classStr);
    if (map.has(classStr)) return;
    for (const rule of rules) {
      if (typeof rule.regex === 'function') {
        const val = rule.regex(formattedClass);
        if (typeof val === 'string') {
          const styleRule = rule.handler(val.trim(), [val]);
          if (styleRule) map.set(classStr, styleRule as Record<string, string>);
          break;
        }
      } else if ((rule.regex as unknown) instanceof RegExp) {
        const match = formattedClass.match(rule.regex);
        if (match) {
          const filterMatch = match.filter(Boolean);
          const styleRule = rule.handler(filterMatch[1], filterMatch);
          if (styleRule !== null) map.set(classStr, styleRule as Record<string, string>);
          break;
        }
      }
    }
  });

  return map;
};

export const buildStyle = function(
  map: Map<string, Record<string, string>> = new Map(),
  oldKeys: Set<string> = new Set(),
  prefix: string = ''
) {
  const styleText: string[] = [];
  const injectCss: string[] = [];
  const prefixSelector = prefix ? `.${prefix} ` : '';

  map.forEach((styleConfig, key) => {
    if (oldKeys.has(key)) return;

    if (styleConfig._injectCss) {
      injectCss.push(styleConfig._injectCss);
      delete styleConfig._injectCss;
    }

    const hasChild = !!styleConfig.child;

    const escapedClassName = escapeCssSpecialChars(key);
    const hasSelector = REGEX.SELECTOR.test(key);
    const baseSelector = `${prefixSelector}.${escapedClassName}${hasSelector ? getSelector(key) : ''}`;

    let styleProperties = '';
    for (const [prop, value] of Object.entries(styleConfig)) {
      if (prop !== 'child' && prop !== '_injectCss') styleProperties += `${prop}:${value};`;
    }
    styleText.push(`${baseSelector}{${styleProperties}}`);
    if (hasChild) {
      const [childEl, childStyle] = styleConfig.child.split('{').map(s => s.trim().replace('}', ''));
      if (childEl && childStyle) {
        styleText.push(`${prefixSelector}.${escapedClassName} ${childEl}{${childStyle}}`);
      }
    }
  });
  return { styleRules: styleText, injectCss };
};
