/**
 * 从指定DOM元素及其所有子元素中提取所有唯一的class类名
 * @param rootDom 根DOM元素
 * @returns 去重且非空的class名称数组
 */
export const extractClassFromDom = (rootDom: HTMLElement): string[] => {
  // 初始化Set（天然去重，比数组push后再去重更高效）
  const classNamesSet = new Set<string>();

  // 处理根元素的class
  const rootClassNames = String(rootDom.className).trim().split(/\s+/);
  rootClassNames.forEach(cls => cls && classNamesSet.add(cls));

  // 处理所有子元素的class（直接限定类型，避免内部instanceof判断）
  const allChildElements = rootDom.querySelectorAll<Element>('*');
  allChildElements.forEach(child => {
    try {
      const childClassNames = String(child.classList.value).trim().split(/\s+/);
      childClassNames.forEach(cls => cls && classNamesSet.add(cls));
    } catch {
      console.log('[LightCSS] Skipping dom.');
    }
  });

  // 转换为数组返回
  return Array.from(classNamesSet);
};

/**
 * 转义字符串中的CSS特殊字符（[ # ]）
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export const escapeCssSpecialChars = (str: string): string => {
  return str.replace(/([\[\]#])/g, '\\$1');
};
