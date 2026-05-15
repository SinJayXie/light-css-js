const BASE_SORT_NAME = {
  m: 'margin',
  p: 'padding',
  l: 'left',
  r: 'right',
  t: 'top',
  b: 'bottom',
  h: 'height',
  w: 'width',
  miw: 'min-width',
  mih: 'min-height',
  maw: 'max-width',
  mah: 'max-height',
  lh: 'line-height',
  inset: 'inset',
  round: 'border-radius',
  gap: 'gap',
  flex: 'flex'
} as const;

const safeGetText = function(obj: Record<string, unknown>, str: string, defaultValue?: string): string {
  try {
    return <string>obj[str] || defaultValue || '';
  } catch {
    return defaultValue || '';
  }
};

export default {
  getGapProperty(str: string) {
    return str.split('')
      .map(v => safeGetText(BASE_SORT_NAME, v.toLowerCase(), ''))
      .join('-');
  },
  getSortProperty(str: string) {
    return safeGetText(BASE_SORT_NAME, str.toLowerCase(), '');
  }
} as const;
