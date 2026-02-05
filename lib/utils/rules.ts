export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null;
    priority?: number;
}

const createStyles = (style?: Record<string, string>) => Object.assign({}, style) as Record<string, string>;

// Extract common key mapping constants to reduce repeated definitions
const KEY_MAPS = {
  sizeKey: { w: 'width', h: 'height', p: 'padding', size: 'size' },
  marginKey: { m: 'margin', mt: 'margin-top', mb: 'margin-bottom', ml: 'margin-left', mr: 'margin-right' },
  bgKey: { '': 'background', img: 'background-image', size: 'background-size', position: 'background-position' },
  flexKey: { justify: 'justify-content', align: 'align-items' }
} as const;

export const defaultRules = (): IRule[] => [
  {
    // Text rule handling
    regex: /text-\[(.*?)]$/,
    handler: (val: string) => {
      if (/(px|em|vw|vh|%)/.test(val)) {
        return { 'font-size': val };
      } else {
        return createStyles(val.length > 2 ? { color: val } : {});
      }
    }
  }, {
    // Text alignment rule
    regex: (name: string) => {
      const val = name.startsWith('text-') ? name.replace('text-', '').trim() : false;
      return val && ['left', 'center', 'right'].includes(val) ? val : false;
    },
    handler: (val: string) =>
      ['left', 'right', 'center'].includes(val.toLowerCase())
        ? createStyles({ 'text-align': val })
        : createStyles()
  }, {
    // Full width/height setting rule for elements
    regex: /full-(.*)$/,
    handler: (val: string) => createStyles({
      ...(val === 'w' ? { width: '100%' } : {}),
      ...(val === 'h' ? { height: '100%' } : {})
    })
  }, {
    // Positioning rule
    regex: /position-(.*)/,
    handler: (val: string) => createStyles({ position: val })
  }, {
    // Position offset rule
    regex: /(left|right|top|bottom)-\[(.*)]$/,
    handler: (_, [, pos, val]: string[]) =>
      pos && val ? createStyles({ [pos]: val }) : createStyles()
  }, {
    // Size/padding/flex/gap rule
    regex: /(flex|gap|size|w|h|p)-\[([^\]]*)]/,
    handler: (_, [, key, val]: string[]) => {
      const mappedKey = KEY_MAPS.sizeKey[key as keyof typeof KEY_MAPS.sizeKey] || key;
      return mappedKey === 'size'
        ? createStyles({ width: val, height: val, child: 'img {width: 100%;height:100%;}' })
        : createStyles({ [mappedKey]: val });
    }
  },
  {
    // Margin rule: m-[value] / mt-[value] / mb-[value] / ml-[value] / mr-[value]
    regex: /(m|mt|mb|ml|mr)-\[([^\]]*)]/,
    handler: (_, [, type, val]: string[]) =>
      createStyles({ [KEY_MAPS.marginKey[type as keyof typeof KEY_MAPS.marginKey]]: val })
  }, {
    // Border rule: border-[value] (supports format like 1px solid #ccc) / border-radius-[value]
    regex: /(border|border-radius)-\[([^\]]*)]/,
    handler: (_, [, key, val]: string[]) => createStyles({ [key]: val })
  }, {
    // Background rule: bg-[color] / bg-img-[image URL] / bg-size-[value] / bg-position-[value]
    regex: /bg-(img|size|position)?-?\[([^\]]*)]/,
    handler: (_, [, type = '', val]: string[]) => {
      const key = KEY_MAPS.bgKey[type as keyof typeof KEY_MAPS.bgKey];
      const value = type === 'img' ? `url(${val})` : val;
      return createStyles({ [key]: value });
    }
  }, {
    // Opacity rule: opacity-[value] (0-1 or 0%-100%)
    regex: /opacity-\[(.*)]$/,
    handler: (_, [, val]: string[]) => createStyles({ opacity: val })
  }, {
    // Display mode: display-[value] (block/inline/flex/none, etc.)
    regex: /display-\[(.*)]$/,
    handler: (_, [, val]: string[]) => createStyles({ display: val })
  }, {
    // Flex layout enhancement: justify-[value] (justify-content) / align-[value] (align-items)
    regex: /(justify|align)-\[([^\]]*)]/,
    handler: (_, [, type, val]: string[]) =>
      createStyles({ [KEY_MAPS.flexKey[type as keyof typeof KEY_MAPS.flexKey]]: val })
  }, {
    // Line height rule: line-height-[value]
    regex: /line-height-\[(.*)]$/,
    handler: (_, [, val]: string[]) => createStyles({ 'line-height': val })
  }, {
    // Font style: font-weight-[value] / font-style-[value]
    regex: /(font-weight|font-style)-\[([^\]]*)]/,
    handler: (_, [, key, val]: string[]) => createStyles({ [key]: val })
  }, {
    // Overflow handling: overflow-[value] / overflow-x-[value] / overflow-y-[value]
    regex: /(overflow|overflow-x|overflow-y)-\[([^\]]*)]/,
    handler: (_, [, key, val]: string[]) => createStyles({ [key]: val })
  }, {
    // Cursor style: cursor-[value] (pointer/default/hover, etc.)
    regex: /cursor-\[(.*)]$/,
    handler: (_, [, val]: string[]) => createStyles({ cursor: val })
  }, {
    // New line-clamp rule
    regex: /line-clamp-\[(.*)]$/,
    handler: (_, [, lineNum]: string[]) => createStyles({
      display: '-webkit-box',
      '-webkit-line-clamp': lineNum,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      'text-overflow': 'ellipsis'
    })
  }
];
