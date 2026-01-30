/**
 * 从指定DOM元素及其所有子元素中提取所有唯一的class类名
 * @param rootDom 根DOM元素
 * @returns 去重且非空的class名称数组
 */
export const extractClassFromDom = (rootDom: HTMLElement): string[] => {
  const classNamesSet = new Set<string>();

  const rootClassNames = String(rootDom.className).trim().split(/\s+/);
  rootClassNames.forEach(cls => cls && classNamesSet.add(cls));

  const walkDom = (node: Node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const childClassNames = String(el.className).trim().split(/\s+/);
    childClassNames.forEach(cls => cls && classNamesSet.add(cls));
    for (let i = 0; i < el.childNodes.length; i++) {
      walkDom(el.childNodes[i]);
    }
  };

  try {
    walkDom(rootDom);
  } catch {
    console.log('[LightCSS] Skipping dom.');
  }

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

/**
 * 支持合并参数的节流函数（针对 MutationObserver 的 mutations 数组）
 * @param fn 执行函数
 * @param delay 节流延迟
 * @returns 节流后的函数
 */
export const throttleWithMerge = function <T extends(...args: [MutationRecord[]]) => void>(
  fn: T,
  delay: number
) {
  let timer: number | null = null;
  let pendingMutations: MutationRecord[] = [];

  return (...args: Parameters<T>) => {
    pendingMutations = pendingMutations.concat(args[0]);
    if (!timer) {
      timer = window.setTimeout(() => {
        fn(pendingMutations);
        pendingMutations = [];
        timer = null;
      }, delay);
    }
  };
};
