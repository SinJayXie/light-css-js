
export const REGEX = {
  SELECTOR: /^(hover|active):/,
  SPACE: /\s+/,
  ESCAPE_CHAR: /([\[\],.\/<>?!@#$%^&*()=+|\\~`;'":])/g,
  PIXEL_UNIT: /^-?\d+(\.\d+)?(px|rem|em|vw|vh|vmin|vmax|lh|rlh|%)$/i
} as const;
