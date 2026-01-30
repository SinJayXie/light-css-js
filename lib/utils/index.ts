/**
 * 从指定DOM元素及其所有子元素中提取所有唯一的class类名
 * @param rootDom 根DOM元素
 * @returns 去重且非空的class名称数组
 */
export const extractClassFromDom = (rootDom: HTMLElement): string[] => {
  const classNamesSet = new Set<string>();

  const rootClassNames = String(rootDom.className).trim().split(/\s+/);
  rootClassNames.forEach(cls => cls && classNamesSet.add(cls));

  const allChildElements = rootDom.querySelectorAll<Element>('*');
  allChildElements.forEach(child => {
    try {
      const childClassNames = String(child.classList.value).trim().split(/\s+/);
      childClassNames.forEach(cls => cls && classNamesSet.add(cls));
    } catch {
      console.log('[LightCSS] Skipping dom.');
    }
  });

  return Array.from(classNamesSet);
};

/**
 * 转义字符串中的CSS特殊字符（[ # ]）
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export const escapeCssSpecialChars = (str: string): string => {
  return str.replace(/([\[\]#:])/g, '\\$1');
};

/**
 * 获取选择器
 * @param key
 */
export const getSelector = function(key: string) {
  const res = key.split(':').shift();
  if (res !== '' && res !== undefined) {
    return ':' + res.trim();
  }
  return '';
};
