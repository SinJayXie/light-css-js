import { IRule } from './rules.ts';
import { escapeCssSpecialChars, getSelector } from './index.ts';

const fmtClassStr = function(str: string) {
  return str.replace(/^(hover|active):/, '').trim();
};

/**
 * 创建 style rule 对象 MAP
 * @param classList
 * @param rules
 * @param map
 */
export const createStyle = (classList: string[], rules: IRule[], map: Map<string, Record<string, string>>) => {
  const cacheMap = map;
  classList.forEach(classStr => {
    const fmtClass = fmtClassStr(classStr);
    if (cacheMap.has(classStr)) return; // 样式缓存表有就不执行了，跳过
    for (const rule of rules) {
      if (typeof rule.regex === 'function') { // regex 也可以是方法
        const val = rule.regex(fmtClass);
        if (typeof val === 'string') {
          const styleRule = rule.handler(val.trim(), [val]);
          if (styleRule) cacheMap.set(classStr, styleRule); // 存入样式表缓存
          break; // 处理下一条 class
        }
      } else if ((rule.regex as unknown) instanceof RegExp) { // 正则模式
        const match = fmtClass.match(rule.regex);
        if (match) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, value] = match;
          if (value) {
            const styleRule = rule.handler(value, match);
            if (styleRule !== null) cacheMap.set(classStr, styleRule); // 存入样式表缓存
          }
          break; // 处理下一条 class
        }
      }
    }
  });

  return cacheMap;
};

/**
 * 构建新的样式 rules
 * @param map
 * @param oldKeys
 * @param prefix
 */
export const buildStyle = (map: Map<string, Record<string, string>>, oldKeys: string[], prefix: string) => {
  const styleText: string[] = [];
  map.forEach((config, key) => {
    if (oldKeys.includes(key)) return;
    const fmtKey = escapeCssSpecialChars(key); // 格式化下 [、]、# 等 css 不能直接识别的符号
    const prefixKey = prefix ? '.' + prefix + ' ' : ''; // 拼接前缀 -> .prefix .text-[16px] { ... }
    let hasChild = false;
    const hasSelector = /^(hover|active):/.test(key); // 匹配 (hover|active):rule
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

    if (hasChild && typeof config['child'] === 'string') { // 加入自定义class选择器 如 .size img{width:100%;height:100%}
      styleText.push(`${prefixKey}.${fmtKey} ${config['child']}`);
    }
  });
  return styleText;
};
