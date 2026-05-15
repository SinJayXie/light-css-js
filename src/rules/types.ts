const COLOR_SCHEMA = new Set(['red', 'green', 'blue', 'black', 'white', 'gray', 'lightgray', 'darkgray', 'silver', 'maroon', 'yellow', 'orange', 'pink', 'purple', 'brown', 'cyan', 'teal', 'navy', 'aqua', 'fuchsia', 'lime', 'olive', 'magenta', 'skyblue', 'lightpink']);
import { REGEX } from '../utils';

export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null | object;
    priority?: number;
}

export const rulePrioritySort = function(arr?: IRule[]) {
  if (Array.isArray(arr)) return arr.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  return [];
};

export const validateColor = function(color: string) {
  if (color.startsWith('#') && [3, 4, 6, 8].includes(color.substring(1).length)) {
    return color;
  } else if (color.startsWith('0x') && [3, 4, 6, 8].includes(color.substring(2).length)) {
    return '#' + color.substring(2);
  } else if (COLOR_SCHEMA.has(color.toLowerCase())) {
    return color.toLowerCase();
  }
  return null;
};

export const validatePixelUnit = function(value: string) {
  return REGEX.PIXEL_UNIT.test(value);
};
