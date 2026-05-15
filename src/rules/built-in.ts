import { validateColor, validatePixelUnit, IRule } from './types';
import { default as cssPropertyName } from '../utils/css-property';

const createStyles = (style?: Record<string, string>) => Object.assign({}, style) as Record<string, string>;

const FLEX_DIRECTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];
const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'];

const FONT_SIZES: Record<string, string> = {
  xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
  xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
  '5xl': '3rem', '6xl': '3.75rem', '7xl': '4.5rem', '8xl': '6rem', '9xl': '8rem'
};

const FONT_WEIGHTS: Record<string, string> = {
  thin: '100', extralight: '200', light: '300', normal: '400',
  medium: '500', semibold: '600', bold: '700', extrabold: '800', black: '900'
};

const LINE_HEIGHTS: Record<string, string> = {
  tighter: '1.25', tight: '1.375', normal: '1.5', relaxed: '1.625', looser: '2'
};

const LETTER_SPACINGS: Record<string, string> = {
  tighter: '-0.05em', tight: '-0.025em', normal: '0em', wide: '0.025em', wider: '0.05em'
};

const TAILWIND_COLORS: Record<string, Record<string, string>> = {
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
  zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
  neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
  stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
  red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
  yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
  lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
  green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
  cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
  sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
  blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
  indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
  violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
  purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
  fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
  pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
  rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' }
};

export const defaultRules = function(): IRule[] {
  return [
    {
      regex: /^text-\[(.*)]$/,
      handler: (val: string) => {
        const isColor = validateColor(val);
        if (validatePixelUnit(val)) {
          return createStyles({ 'font-size': val });
        } else if (isColor !== null) {
          return createStyles({ 'color': isColor });
        } else if (/(left|right|center|justify|start|end)/.test(val)) {
          return createStyles({ 'text-align': val });
        }
        return null;
      }
    },
    {
      regex: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
      handler(_, match) {
        return { 'font-size': FONT_SIZES[match[1]] || '1rem' };
      }
    },
    {
      regex: /^text-(transparent|current|inherit|white|black)$/,
      handler(_, match) {
        return { 'color': match[1] };
      }
    },
    {
      regex: /^text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { 'color': colorValue };
        }
        return null;
      }
    },
    {
      regex: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
      handler(_, match) {
        return { 'font-weight': FONT_WEIGHTS[match[1]] || '400' };
      }
    },
    {
      regex: /^leading-(tighter|tight|normal|relaxed|looser)$/,
      handler(_, match) {
        return { 'line-height': LINE_HEIGHTS[match[1]] || '1.5' };
      }
    },
    {
      regex: /^tracking-(tighter|tight|normal|wide|wider)$/,
      handler(_, match) {
        return { 'letter-spacing': LETTER_SPACINGS[match[1]] || '0em' };
      }
    },
    {
      regex: /^(italic|oblique|normal)$/,
      handler(_, match) {
        return { 'font-style': match[1] };
      }
    },
    {
      regex: /^(underline|overline|line-through|no-underline)$/,
      handler(_, match) {
        const decorationMap: Record<string, string> = {
          underline: 'underline', overline: 'overline', 'line-through': 'line-through', 'no-underline': 'none'
        };
        return { 'text-decoration': decorationMap[match[1]] };
      }
    },
    {
      regex: /^(uppercase|lowercase|capitalize|normal-case)$/,
      handler(_, match) {
        return { 'text-transform': match[1] };
      }
    },
    {
      regex: /^(whitespace)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/,
      handler(_, match) {
        return { 'white-space': match[2] };
      }
    },
    {
      regex: /^(text|word)-(break|keep|normal|ellipsis|clip)$/,
      handler(_, match) {
        const prefix = match[1];
        const val = match[2];
        if (prefix === 'text') {
          if (val === 'ellipsis' || val === 'clip') {
            return { overflow: 'hidden', 'text-overflow': val, 'white-space': 'nowrap' };
          }
          return { 'text-overflow': val };
        }
        return { 'word-break': val === 'keep' ? 'break-word' : val };
      }
    },
    {
      regex: /^shadow-\[(.*)]-\[(.*)]$/,
      handler(_, match: Array<string>) {
        const value = validatePixelUnit(match[1]);
        const color = validateColor(match[2]);
        return color && value ? {
          '--color': color,
          'box-shadow': `0 0 ${match[1]} var(--color)`
        } : null;
      }
    },
    {
      regex: /^shadow-(sm|md|lg|xl|2xl|3xl)$/,
      handler(_, match) {
        const shadowMap: Record<string, string> = {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '3xl': '0 35px 60px -15px rgb(0 0 0 / 0.3)'
        };
        return { 'box-shadow': shadowMap[match[1]] };
      }
    },
    {
      regex: /^([pm])([xy])?-\[(.*)]$/,
      handler(_, match) {
        const prefix = match[1];
        const direction = match[2];
        const value = match[3];

        if (!validatePixelUnit(value)) return null;

        const prop = prefix === 'p' ? 'padding' : 'margin';

        if (direction === 'x') {
          return { 'padding-left': value, 'padding-right': value };
        } else if (direction === 'y') {
          return { 'padding-top': value, 'padding-bottom': value };
        }
        return { [prop]: value };
      }
    },
    {
      regex: /^([pm])-(\d+)$/,
      handler(_, match) {
        const prefix = match[1];
        const value = parseInt(match[2]);
        const remValue = `${value * 0.25}rem`;
        const prop = prefix === 'p' ? 'padding' : 'margin';
        return { [prop]: remValue };
      }
    },
    {
      regex: /^([pm])([xy])-(\d+)$/,
      handler(_, match) {
        const prefix = match[1];
        const direction = match[2];
        const value = parseInt(match[3]);
        const remValue = `${value * 0.25}rem`;
        const prop = prefix === 'p' ? 'padding' : 'margin';

        if (direction === 'x') {
          return { 'padding-left': remValue, 'padding-right': remValue };
        } else if (direction === 'y') {
          return { 'padding-top': remValue, 'padding-bottom': remValue };
        }
        return { [prop]: remValue };
      }
    },
    {
      regex: /^([pm][lrtb])-\[(.*)]$/,
      handler(_, match) {
        const [rule, value] = match.slice(1);
        return validatePixelUnit(value) ? {
          [cssPropertyName.getGapProperty(rule)]: value
        } : null;
      }
    },
    {
      regex: /^([pm])-([trbl])-(\d+)$/,
      handler(_, match) {
        const prefix = match[1];
        const side = match[2];
        const value = parseInt(match[3]);
        const remValue = `${value * 0.25}rem`;

        const sideMap: Record<string, string> = {
          t: 'Top', r: 'Right', b: 'Bottom', l: 'Left'
        };

        const prop = prefix === 'p' ? 'padding' : 'margin';
        return { [`${prop}${sideMap[side]}`]: remValue };
      }
    },
    {
      regex: /^([pm])([trbl])-(\d+)$/,
      handler(_, match) {
        const prefix = match[1];
        const side = match[2];
        const value = parseInt(match[3]);
        const remValue = `${value * 0.25}rem`;

        const sideMap: Record<string, string> = {
          t: 'Top', r: 'Right', b: 'Bottom', l: 'Left'
        };

        const prop = prefix === 'p' ? 'padding' : 'margin';
        return { [`${prop}${sideMap[side]}`]: remValue };
      }
    },
    {
      regex: /^([pm])([trbl])-\[.*]$/,
      handler(_, match) {
        const prefix = match[1];
        const side = match[2];
        const value = match[0].match(/\[(.*)]$/)?.[1];

        if (!value || !validatePixelUnit(value)) return null;

        const sideMap: Record<string, string> = {
          t: 'Top', r: 'Right', b: 'Bottom', l: 'Left'
        };

        const prop = prefix === 'p' ? 'padding' : 'margin';
        return { [`${prop}${sideMap[side]}`]: value };
      }
    },
    {
      regex: /^(w|h|lh|min-w|max-w|min-h|max-h)-\[.*]$/,
      handler(_, match) {
        const rule = match[1];
        const fullProperty = cssPropertyName.getSortProperty(rule);
        const value = match[0].match(/\[(.*)]$/)?.[1];
        return fullProperty && value && validatePixelUnit(value) ? {
          [fullProperty]: value
        } : null;
      }
    },
    {
      regex: /^(w|h|lh|min-w|max-w|min-h|max-h)-(\d+)$/,
      handler(_, match) {
        const rule = match[1];
        const value = parseInt(match[2]);
        const remValue = `${value * 0.25}rem`;

        const propMap: Record<string, string> = {
          w: 'width', h: 'height', lh: 'line-height',
          'min-w': 'min-width', 'max-w': 'max-width',
          'min-h': 'min-height', 'max-h': 'max-height'
        };

        return { [propMap[rule]]: remValue };
      }
    },
    {
      regex: /^(inset|l|r|t|b)-\[.*]$/,
      handler(_, match) {
        const rule = match[1];
        const value = match[0].match(/\[(.*)]$/)?.[1];

        if (!value || !validatePixelUnit(value)) return null;

        const propMap: Record<string, string> = {
          inset: 'inset', l: 'left', r: 'right', t: 'top', b: 'bottom'
        };

        return { [propMap[rule]]: value };
      }
    },
    {
      regex: /^(inset|l|r|t|b)-(\d+)$/,
      handler(_, match) {
        const rule = match[1];
        const value = parseInt(match[2]);
        const remValue = `${value * 0.25}rem`;

        const propMap: Record<string, string> = {
          inset: 'inset', l: 'left', r: 'right', t: 'top', b: 'bottom'
        };

        return { [propMap[rule]]: remValue };
      }
    },
    {
      regex: /^gap-\[.*]$/,
      handler(_, match) {
        const value = match[0].match(/\[(.*)]$/)?.[1];
        return value && validatePixelUnit(value) ? { gap: value } : null;
      }
    },
    {
      regex: /^gap-(\d+)$/,
      handler(_, match) {
        const value = parseInt(match[1]);
        return { gap: `${value * 0.25}rem` };
      }
    },
    {
      regex: /^gap-([xy])-\[.*]$/,
      handler(_, match) {
        const direction = match[1];
        const value = match[0].match(/\[(.*)]$/)?.[1];

        if (!value || !validatePixelUnit(value)) return null;

        return direction === 'x'
          ? { 'column-gap': value }
          : { 'row-gap': value };
      }
    },
    {
      regex: /^gap-([xy])-(\d+)$/,
      handler(_, match) {
        const direction = match[1];
        const value = parseInt(match[2]);
        const remValue = `${value * 0.25}rem`;

        return direction === 'x'
          ? { 'column-gap': remValue }
          : { 'row-gap': remValue };
      }
    },
    {
      regex: /^round(?:ed)?-\[.*]$/,
      handler(_, match) {
        const value = match[0].match(/\[(.*)]$/)?.[1];
        return value && validatePixelUnit(value) ? { 'border-radius': value } : null;
      }
    },
    {
      regex: /^round(?:ed)?-(\d+)$/,
      handler(_, match) {
        const value = parseInt(match[1]);
        return { 'border-radius': `${value * 0.25}rem` };
      }
    },
    {
      regex: /^round(?:ed)?-(none|sm|md|lg|xl|2xl|3xl|full)$/,
      handler(_, match) {
        const radiusMap: Record<string, string> = {
          none: '0', sm: '0.125rem', md: '0.375rem', lg: '0.5rem',
          xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', full: '9999px'
        };
        return { 'border-radius': radiusMap[match[1]] || '0.25rem' };
      }
    },
    {
      regex: /^round(?:ed)?-([tlbr])-\[.*]$/,
      handler(_, match) {
        const corner = match[1];
        const value = match[0].match(/\[(.*)]$/)?.[1];

        if (!value || !validatePixelUnit(value)) return null;

        const cornerMap: Record<string, string> = {
          tl: 'top-left', tr: 'top-right', bl: 'bottom-left', br: 'bottom-right'
        };

        return { [`border-${cornerMap[corner]}-radius`]: value };
      }
    },
    {
      regex: /^round(?:ed)?-([tlbr])-(\d+)$/,
      handler(_, match) {
        const corner = match[1];
        const value = parseInt(match[2]);
        const remValue = `${value * 0.25}rem`;

        const cornerMap: Record<string, string> = {
          tl: 'top-left', tr: 'top-right', bl: 'bottom-left', br: 'bottom-right'
        };

        return { [`border-${cornerMap[corner]}-radius`]: remValue };
      }
    },
    {
      regex: /^b(?:order)?(?:-\d+)?(?:-\[.*])?$/,
      handler(_, match) {
        const fullMatch = match[0];

        if (fullMatch === 'b' || fullMatch === 'border') {
          return { 'border-width': '1px' };
        }

        const widthMatch = fullMatch.match(/^b(?:order)?-(\d+)$/);
        if (widthMatch) {
          return { 'border-width': `${parseInt(widthMatch[1])}px` };
        }

        const colorMatch = fullMatch.match(/^b(?:order)?-\[(.*)]$/);
        if (colorMatch) {
          const color = validateColor(colorMatch[1]);
          return color ? { 'border-color': color } : null;
        }

        const widthColorMatch = fullMatch.match(/^b(?:order)?-(\d+)-\[(.*)]$/);
        if (widthColorMatch) {
          const color = validateColor(widthColorMatch[2]);
          return color ? {
            'border-width': `${parseInt(widthColorMatch[1])}px`,
            'border-color': color
          } : null;
        }

        return null;
      }
    },
    {
      regex: /^b(?:order)?-([trbl])-\d+$/,
      handler(_, match) {
        const side = match[1];
        const width = parseInt(match[2]);

        const sideMap: Record<string, string> = {
          t: 'top', r: 'right', b: 'bottom', l: 'left'
        };

        return { [`border-${sideMap[side]}-width`]: `${width}px` };
      }
    },
    {
      regex: /^b(?:order)?-([trbl])-\[.*]$/,
      handler(_, match) {
        const side = match[1];
        const value = match[0].match(/\[(.*)]$/)?.[1];

        if (!value) return null;

        const sideMap: Record<string, string> = {
          t: 'top', r: 'right', b: 'bottom', l: 'left'
        };

        if (validatePixelUnit(value)) {
          return { [`border-${sideMap[side]}-width`]: value };
        }

        const color = validateColor(value);
        if (color) {
          return { [`border-${sideMap[side]}-color`]: color };
        }

        return null;
      }
    },
    {
      regex: /^b(?:order)?-(solid|dashed|dotted|double|groove|ridge|inset|outset|hidden|none)$/,
      handler(_, match) {
        return { 'border-style': match[1] };
      }
    },
    {
      regex: /^b(?:order)?-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { 'border-color': colorValue };
        }
        return null;
      }
    },
    {
      regex: /^b(?:order)?-(\d+)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const width = match[1];
        const colorName = match[2];
        const shade = match[3];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { 'border-width': `${width}px`, 'border-color': colorValue };
        }
        return null;
      }
    },
    {
      regex: /^disp-\[(.*)]$/,
      handler(_, match) {
        return { display: match[1] };
      }
    },
    {
      regex: /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|flow|flow-root|contents|table|table-cell|table-row|table-column|none)$/,
      handler(_, match) {
        return { display: match[1] };
      }
    },
    {
      regex: /^z-(\d+|auto|inherit)$/,
      handler(_, match) {
        return { 'z-index': match[1] };
      }
    },
    {
      regex: /^overflow-(visible|hidden|scroll|auto|clip)$/,
      handler(_, match) {
        return { overflow: match[1] };
      }
    },
    {
      regex: /^overflow-([xy])-(visible|hidden|scroll|auto|clip)$/,
      handler(_, match) {
        return { [`overflow-${match[1]}`]: match[2] };
      }
    },
    {
      regex: /^line-clamp-(\d+)$/,
      handler(_, match) {
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': match[1],
          '-webkit-box-orient': 'vertical'
        };
      }
    },
    {
      regex: /^bg-(color|img|clip|origin|pos|repeat|size)$/,
      handler() {
        return null;
      }
    },
    {
      regex: /^bg-\[(.*)]$/,
      handler(_, match) {
        const value = match[1];

        if (validateColor(value)) {
          return { 'background-color': value };
        }

        if (value.startsWith('url(')) {
          return { 'background-image': value };
        }

        return null;
      }
    },
    {
      regex: /^bg-(transparent|current|inherit)$/,
      handler(_, match) {
        return { 'background-color': match[1] };
      }
    },
    {
      regex: /^bg-(no-repeat|repeat|repeat-x|repeat-y|space|round)$/,
      handler(_, match) {
        return { 'background-repeat': match[1] };
      }
    },
    {
      regex: /^bg-(fixed|local|scroll)$/,
      handler(_, match) {
        return { 'background-attachment': match[1] };
      }
    },
    {
      regex: /^bg-(center|top|bottom|left|right)$/,
      handler(_, match) {
        return { 'background-position': match[1] };
      }
    },
    {
      regex: /^bg-(cover|contain|auto)$/,
      handler(_, match) {
        return { 'background-size': match[1] };
      }
    },
    {
      regex: /^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { 'background-color': colorValue };
        }
        return null;
      }
    },
    {
      regex: /^bg-gradient-to-(t|r|b|l|tr|tl|br|bl)$/,
      handler(_, match) {
        const dir = match[1];
        const dirMap: Record<string, string> = {
          t: 'to top', r: 'to right', b: 'to bottom', l: 'to left',
          tr: 'to top right', tl: 'to top left', br: 'to bottom right', bl: 'to bottom left'
        };
        return { 'background-image': `linear-gradient(${dirMap[dir]}, var(--tw-gradient-from), var(--tw-gradient-to))` };
      }
    },
    {
      regex: /^from-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { '--tw-gradient-from': colorValue, '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to, ${colorValue})` };
        }
        return null;
      }
    },
    {
      regex: /^via-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { '--tw-gradient-stops': `var(--tw-gradient-from), ${colorValue}, var(--tw-gradient-to)` };
        }
        return null;
      }
    },
    {
      regex: /^to-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      handler(_, match) {
        const colorName = match[1];
        const shade = match[2];
        const colorValue = TAILWIND_COLORS[colorName]?.[shade];
        if (colorValue) {
          return { '--tw-gradient-to': colorValue };
        }
        return null;
      }
    },
    {
      regex: /^bg-clip-(border|padding|content|text)$/,
      handler(_, match) {
        return { 'background-clip': match[1] };
      }
    },
    {
      regex: /^(flex|inline-flex)$/,
      handler(_, match) {
        return { display: match[1] };
      }
    },
    {
      regex: /^flex-(row|col|row-reverse|column-reverse|wrap|nowrap|wrap-reverse|1|auto|none|initial|inherit|grow|shrink)$/,
      handler(_, match) {
        const val = match[1];
        if (FLEX_DIRECTIONS.includes(val)) return { 'flex-direction': val };
        if (FLEX_WRAPS.includes(val)) return { 'flex-wrap': val };
        if (val === '1') return { flex: '1 1 0%' };
        if (val === 'auto') return { flex: '1 1 auto' };
        if (val === 'none') return { flex: 'none' };
        if (val === 'initial') return { flex: 'initial' };
        if (val === 'inherit') return { flex: 'inherit' };
        if (val === 'grow') return { 'flex-grow': '1' };
        if (val === 'shrink') return { 'flex-shrink': '1' };
        return null;
      }
    },
    {
      regex: /^flex-(grow|shrink)-0$/,
      handler(_, match) {
        return { [`flex-${match[1]}`]: '0' };
      }
    },
    {
      regex: /^(justify|items|self|content)-(start|end|center|baseline|stretch|normal|first|last|safe|unsafe|flex-start|flex-end|self-start|self-end|space-between|space-around|space-evenly)$/,
      handler(_, match) {
        const [prefix, value] = match.slice(1);
        const propertyMap: Record<string, string> = {
          justify: 'justify-content',
          items: 'align-items',
          self: 'align-self',
          content: 'align-content'
        };
        return { [propertyMap[prefix]]: value };
      }
    },
    {
      regex: /^order-(-?\d+|first|last)$/,
      handler(_, match) {
        const val = match[1];
        if (val === 'first') return { order: '-9999' };
        if (val === 'last') return { order: '9999' };
        return { order: val };
      }
    },
    {
      regex: /^(grid|inline-grid)$/,
      handler(_, match) {
        return { display: match[1] };
      }
    },
    {
      regex: /^grid-cols-(\d+|none|subgrid)$/,
      handler(_, match) {
        const value = match[1];
        if (value === 'none') return { 'grid-template-columns': 'none' };
        if (value === 'subgrid') return { 'grid-template-columns': 'subgrid' };
        return { 'grid-template-columns': `repeat(${value}, minmax(0, 1fr))` };
      }
    },
    {
      regex: /^grid-rows-(\d+|none|subgrid)$/,
      handler(_, match) {
        const value = match[1];
        if (value === 'none') return { 'grid-template-rows': 'none' };
        if (value === 'subgrid') return { 'grid-template-rows': 'subgrid' };
        return { 'grid-template-rows': `repeat(${value}, minmax(0, 1fr))` };
      }
    },
    {
      regex: /^(col|row)-(span|start|end)-(\d+|auto)$/,
      handler(_, match) {
        const prefix = match[1];
        const modifier = match[2];
        const value = match[3];

        if (modifier === 'span') {
          return { [`grid-${prefix}-span`]: value === 'auto' ? 'auto' : value };
        }
        if (modifier === 'start') {
          return { [`grid-${prefix}-start`]: value };
        }
        if (modifier === 'end') {
          return { [`grid-${prefix}-end`]: value };
        }
        return null;
      }
    },
    {
      regex: /^(pos|position)-(static|relative|absolute|fixed|sticky)$/,
      handler(_, match) {
        return { position: match[2] };
      }
    },
    {
      regex: /^(float)-(left|right|none)$/,
      handler(_, match) {
        return { float: match[2] };
      }
    },
    {
      regex: /^(clear)-(left|right|both|none)$/,
      handler(_, match) {
        return { clear: match[2] };
      }
    },
    {
      regex: /^(visible|invisible)$/,
      handler(_, match) {
        return { visibility: match[1] === 'visible' ? 'visible' : 'hidden' };
      }
    },
    {
      regex: /^(box|border)-(border|content)$/,
      handler(_, match) {
        return { 'box-sizing': match[2] };
      }
    },
    {
      regex: /^(transform|none)$/,
      handler(_, match) {
        return { transform: match[1] };
      }
    },
    {
      regex: /^(translate|rotate)(?:-([xyz]))?-(.*)$/,
      handler(_, match) {
        const transformType = match[1];
        const axis = match[2];
        const value = match[3];

        if (!value || !validatePixelUnit(value)) return null;

        const transformMap: Record<string, string> = {
          'translate-x': `translateX(${value})`,
          'translate-y': `translateY(${value})`,
          'translate-z': `translateZ(${value})`,
          'translate': `translate(${value})`,
          'rotate-x': `rotateX(${value})`,
          'rotate-y': `rotateY(${value})`,
          'rotate-z': `rotateZ(${value})`,
          'rotate': `rotate(${value})`
        };

        const key = axis ? `${transformType}-${axis}` : transformType;
        return transformMap[key] ? { transform: transformMap[key] } : null;
      }
    },
    {
      regex: /^scale(?:-([xyz]))?-(.*)$/,
      handler(_, match) {
        const axis = match[1];
        const value = match[2];

        if (axis === 'x') return { transform: `scaleX(${value})` };
        if (axis === 'y') return { transform: `scaleY(${value})` };
        if (axis === 'z') return { transform: `scaleZ(${value})` };
        if (Number.isNaN(Number(axis))) return null;
        return { transform: `scale(${Number(axis) / 100})` };
      }
    },
    {
      regex: /^(translate|rotate)(?:-([xyz]))?-(\d+)$/,
      handler(_, match) {
        const transformType = match[1];
        const axis = match[2];
        const value = parseInt(match[3]) * 0.25;

        const transformMap: Record<string, string> = {
          'translate-x': `translateX(${value}rem)`,
          'translate-y': `translateY(${value}rem)`,
          'translate-z': `translateZ(${value}rem)`,
          'translate': `translate(${value}rem)`,
          'rotate-x': `rotateX(${value}deg)`,
          'rotate-y': `rotateY(${value}deg)`,
          'rotate-z': `rotateZ(${value}deg)`,
          'rotate': `rotate(${value}deg)`
        };

        const key = axis ? `${transformType}-${axis}` : transformType;
        return transformMap[key] ? { transform: transformMap[key] } : null;
      }
    },
    {
      regex: /^transition-(all|none|colors|opacity|transform|width|height|shadow|transform-opacity)$/,
      handler(_, match) {
        const transitionMap: Record<string, string> = {
          'all': 'all 150ms ease-in-out',
          'none': 'none',
          'colors': 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
          'opacity': 'opacity 150ms ease-in-out',
          'transform': 'transform 150ms ease-in-out',
          'width': 'width 150ms ease-in-out',
          'height': 'height 150ms ease-in-out',
          'shadow': 'box-shadow 150ms ease-in-out',
          'transform-opacity': 'transform 150ms ease-in-out, opacity 150ms ease-in-out'
        };
        return { transition: transitionMap[match[1]] };
      }
    },
    {
      regex: /^transition-\[(.+)]$/,
      handler(_, match) {
        return { transition: match[1] };
      }
    },
    {
      regex: /^duration-(\d+)$/,
      handler(_, match) {
        return { 'transition-duration': `${match[1]}ms` };
      }
    },
    {
      regex: /^duration-\[.*]$/,
      handler(_, match) {
        const value = match[0].match(/\[(.*)]$/)?.[1];
        return value ? { 'transition-duration': value } : null;
      }
    },
    {
      regex: /^animate-(spin|pulse|ping|bounce|shake|wiggle|pulse-fade)$/,
      handler(_, match) {
        const animationMap: Record<string, string> = {
          spin: 'spin 1s linear infinite',
          ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
          pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          bounce: 'bounce 1s infinite',
          shake: 'shake 0.5s ease-in-out',
          wiggle: 'wiggle 0.5s ease-in-out',
          'pulse-fade': 'pulse-fade 2s ease-in-out infinite'
        };

        const keyframesMap: Record<string, string> = {
          spin: '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
          ping: '@keyframes ping { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }',
          pulse: '@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }',
          bounce: '@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }',
          shake: '@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }',
          wiggle: '@keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }',
          'pulse-fade': '@keyframes pulse-fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }'
        };

        return {
          animation: animationMap[match[1]],
          _injectCss: keyframesMap[match[1]]
        };
      }
    },
    {
      regex: /^opacity-(\d+)$/,
      handler(_, match) {
        const value = parseInt(match[1]);
        return { opacity: (value / 100).toString() };
      }
    },
    {
      regex: /^opacity-\[.*]$/,
      handler(_, match) {
        const value = match[0].match(/\[(.*)]$/)?.[1];
        return value ? { opacity: value } : null;
      }
    },
    {
      regex: /^cursor-(auto|default|pointer|wait|text|move|not-allowed|none|help|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|zoom-in|zoom-out)$/,
      handler(_, match) {
        return { cursor: match[1] };
      }
    },
    {
      regex: /^select-(none|auto|text|contain|all)$/,
      handler(_, match) {
        return { 'user-select': match[1] };
      }
    },
    {
      regex: /^(pointer-events)-(auto|none)$/,
      handler(_, match) {
        return { 'pointer-events': match[2] };
      }
    },
    {
      regex: /^resize-(none|both|horizontal|vertical)$/,
      handler(_, match) {
        return { resize: match[1] };
      }
    },
    {
      regex: /^contain-(none|strict|content|size|layout|style|paint)$/,
      handler(_, match) {
        return { contain: match[1] };
      }
    },
    {
      regex: /^(will-change)-(auto|scroll|contents|transform|opacity|custom)$/,
      handler(_, match) {
        return { 'will-change': match[2] === 'custom' ? 'transform, opacity' : match[2] };
      }
    },
    {
      regex: /^(aspect)-(auto|square|video|\d+\/\d+)$/,
      handler(_, match) {
        const value = match[2];
        if (value === 'auto' || value === 'square') {
          return { 'aspect-ratio': value };
        }
        if (value === 'video') {
          return { 'aspect-ratio': '16 / 9' };
        }
        return { 'aspect-ratio': value };
      }
    }
  ];
};
