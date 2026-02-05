import { REGEX } from './regex-map.ts';
import { logger } from './logger.ts';
import { IRule } from './rules.ts';

/**
 * Get all class names under a DOM element
 * @param rootDom The root DOM element
 * @returns {string[]} Returns an array of class rules
 */
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

/**
 * Escape CSS special characters in a string ([ # ])
 * @param str The string to be escaped
 * @returns The escaped string
 */
export const escapeCssSpecialChars = (str: string): string => {
  return str.replace(REGEX.ESCAPE_CHAR, '\\$1');
};

/**
 * Get the selector
 * @param key The key string used to extract the selector
 */
export const getSelector = function(key: string) {
  const res = key.split(':').shift();
  if (res !== '' && res !== undefined) {
    return ':' + res.trim();
  }
  return '';
};

/**
 * Throttle function that supports parameter merging (for the mutations array of MutationObserver)
 * @param fn The target function to execute
 * @param delay Throttle delay (in milliseconds)
 * @returns The throttled function
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

export const rulePrioritySort = function(arr?: IRule[]) {
  if (Array.isArray(arr)) return arr.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  return [];
};
