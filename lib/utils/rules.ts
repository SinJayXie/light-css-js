/* eslint-disable @typescript-eslint/no-unused-vars */

export interface IRule {
  regex: ((name: string) => string | boolean) | RegExp;
  handler: (val: string, match: Array<string>) => Record<string, string> | null;
}

const createStyles = (style?: Record<string, string>) => Object.assign({}, style) as Record<string, string>;

export const defaultRules = (): IRule[] => [
  {
    // Text rule handling
    regex: /text-\[(.*?)]$/,
    handler: (val: string) => {
      const styleSheets: Record<string, string> = {};
      if (/(px|em|vw|vh|%)/.test(val)) {
        styleSheets['font-size'] = val;
      } else if (val.length > 2) { // Color handling
        styleSheets['color'] = val;
      }
      return styleSheets;
    }
  }, {
    // Text alignment rule
    regex(name: string) {
      if (name.startsWith('text-')) {
        const val = name.replace('text-', '').trim();
        return ['left', 'center', 'right'].includes(val) ? val : false;
      }
      return false;
    },
    handler(val: string) {
      const style = createStyles();
      if (['left', 'right', 'center'].includes(val.toLowerCase())) {
        style['text-align'] = val;
      }
      return style;
    }
  }, {
    // Full width/height setting rule for elements
    regex: /full-(.*)$/,
    handler(val) {
      const style = createStyles();
      if (val === 'w') {
        style['width'] = '100%';
      } else if (val === 'h') {
        style['height'] = '100%';
      }
      return style;
    }
  }, {
    // Positioning rule
    regex: /position-(.*)/,
    handler(val: string) {
      return createStyles({
        position: val
      });
    }
  }, {
    // Position offset rule
    regex: /(left|right|top|bottom)-\[(.*)]$/,
    handler(_, match) {
      const [_1, pos, val] = match;
      if (pos && val) {
        return createStyles({
          [pos]: val
        });
      }
      return {};
    }
  }, {
    // Size/padding/flex/gap rule
    regex: /(flex|gap|size|w|h|p)-\[([^\]]*)]/,
    handler(_, match) {
      let key = match[1];
      const val = match[2];
      if (key === 'w') key = 'width';
      if (key === 'h') key = 'height';
      if (key === 'p') key = 'padding';
      if (key === 'size') {
        return createStyles({
          width: val,
          height: val,
          child: 'img {width: 100%;height:100%;}'
        });
      }
      return createStyles({
        [key]: val
      });
    }
  },
  {
    // Margin rule: m-[value] / mt-[value] / mb-[value] / ml-[value] / mr-[value]
    regex: /(m|mt|mb|ml|mr)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, type, val] = match;
      const keyMap: Record<string, string> = {
        m: 'margin',
        mt: 'margin-top',
        mb: 'margin-bottom',
        ml: 'margin-left',
        mr: 'margin-right'
      };
      return createStyles({
        [keyMap[type]]: val
      });
    }
  }, {
    // Border rule: border-[value] (supports format like 1px solid #ccc) / border-radius-[value]
    regex: /(border|border-radius)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // Background rule: bg-[color] / bg-img-[image URL] / bg-size-[value] / bg-position-[value]
    regex: /bg-(img|size|position)?-?\[([^\]]*)]/,
    handler(_, match) {
      const [_1, type = '', val] = match;
      const keyMap: Record<string, string> = {
        '': 'background',
        img: 'background-image',
        size: 'background-size',
        position: 'background-position'
      };
      const key = keyMap[type];
      // Special handling for background images (complete url() syntax)
      const value = type === 'img' ? `url(${val})` : val;
      return createStyles({
        [key]: value
      });
    }
  }, {
    // Opacity rule: opacity-[value] (0-1 or 0%-100%)
    regex: /opacity-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        opacity: val
      });
    }
  }, {
    // Display mode: display-[value] (block/inline/flex/none, etc.)
    regex: /display-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        display: val
      });
    }
  }, {
    // Flex layout enhancement: justify-[value] (justify-content) / align-[value] (align-items)
    regex: /(justify|align)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, type, val] = match;
      const keyMap: Record<string, string> = {
        justify: 'justify-content',
        align: 'align-items'
      };
      return createStyles({
        [keyMap[type]]: val
      });
    }
  }, {
    // Line height rule: line-height-[value]
    regex: /line-height-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        'line-height': val
      });
    }
  }, {
    // Font style: font-weight-[value] / font-style-[value]
    regex: /(font-weight|font-style)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // Overflow handling: overflow-[value] / overflow-x-[value] / overflow-y-[value]
    regex: /(overflow|overflow-x|overflow-y)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // Cursor style: cursor-[value] (pointer/default/hover, etc.)
    regex: /cursor-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        cursor: val
      });
    }
  }, {
    // New line-clamp rule
    regex: /line-clamp-\[(.*)]$/,
    handler(_, match) {
      const lineNum = match[1];
      return createStyles({
        'display': '-webkit-box',
        '-webkit-line-clamp': lineNum,
        '-webkit-box-orient': 'vertical',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis'
      });
    }
  }
];
