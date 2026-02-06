import { validateColor, validatePixelUnit } from './index.ts';
import cssPropertyName from './css-property-name.ts';

export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null | object;
    priority?: number;
}

const createStyles = (style?: Record<string, string>) => Object.assign({}, style) as Record<string, string>;

export const defaultRules = function(): IRule[] {
  return [
    {
      regex: /^text-\[(.*)]$/,
      handler: (val: string) => {
        const isColor = validateColor(val);
        if (validatePixelUnit(val)) {
          return createStyles({
            'font-size': val
          });
        } else if (isColor !== null) {
          return createStyles({
            'color': isColor
          });
        } else if (/(left|right|center|justify|start|end)/.test(val)) {
          return createStyles({
            'text-align': val
          });
        }
        return null;
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
      regex: /^([pm][lrtb]?)-\[(.*)]$/,
      handler(_, match) {
        const [rule, value] = match.slice(1);
        return validatePixelUnit(value) ? {
          [cssPropertyName.getGapProperty(rule)]: value
        } : null;
      }
    },
    {
      regex: /^(l|r|t|b|w|h|lh|miw|mih|maw|mah|inset|round|gap|flex])-\[(.*)]$/,
      handler(_, match) {
        const [rule, value] = match.slice(1);
        const fullProperty = cssPropertyName.getSortProperty(rule);
        return fullProperty && validatePixelUnit(value) ? {
          [fullProperty]: value
        } : null;
      }
    },
    {
      regex: /^disp-\[(none|block|inline|inline-block|flex|grid|inline-flex|inline-grid|table|table-cell|table-row|table-column|flow|flow-root|contents|unset)]$/,
      handler(val: string) {
        return {
          display: val
        };
      }
    },
    {
      regex: /^z-(auto|(\d+)|\[(.*)])$/,
      handler(val: string) {
        return {
          'z-index': val.replace(/([\[\]])/g, '')
        };
      }
    },
    {
      regex: /^overflow(?:-([xy]))?-(auto|hidden|clip|visible|scroll)$/,
      handler(_, match) {
        const hasXY = ['x', 'y'].includes(match[1]);
        return {
          [`overflow${hasXY ? `-${match[1]}` : ''}`]: hasXY ? match[2] : match[1]
        };
      }
    },
    {
      regex: /^line-clamp-(\d+)$/,
      handler(v) {
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': v,
          '-webkit-box-orient': 'vertical'
        };
      }
    },
    {
      regex: /^bg(?:-(color|img|clip|origin|pos|repeat|size))?-\[(.*)]$/,
      handler(_, match) {
        if (validateColor(match[1])) {
          return createStyles({
            'background-color': match[1]
          });
        } else if (match[1].startsWith('url(')) {
          return createStyles({
            'background-image': match[1]
          });
        } else if (/^(color|img|clip|origin|pos|repeat|size)$/.test(match[1])) {
          const splitValue = match[2].split('_');
          return createStyles({
            ['background-' + match[1]]: splitValue.join(' ')
          });
        }
        return null;
      }
    }
  ];
};
