import { REGEX } from './regex';
import { logger } from './logger';

export const extractClassFromDom = (rootDom: Element): Set<string> => {
  const classNamesSet = new Set<string>();

  for (const cls of rootDom.classList) classNamesSet.add(cls);

  const walkDom = (node: Node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as Element;
    for (const cls of el.classList) classNamesSet.add(cls);
    for (const childNode of el.childNodes) walkDom(childNode);
  };

  try {
    walkDom(rootDom);
  } catch {
    logger.log('[LightCSS] Skipping dom.');
  }
  return classNamesSet;
};

export const escapeCssSpecialChars = (str: string): string => {
  return str.replace(REGEX.ESCAPE_CHAR, '\\$1');
};

export const getSelector = function(key: string) {
  const res = key.split(':').shift();
  if (res !== '' && res !== undefined) {
    return ':' + res.trim();
  }
  return '';
};

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
