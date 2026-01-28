/* eslint-disable @typescript-eslint/no-unused-vars */

export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null;
}

const createStyles = (style?: Record<string, string>) => Object.assign({}, style) as Record<string, string>;

export const defaultRules = (): IRule[] => [
  {
    // 文本规则操作
    regex: /text-\[(.*?)]$/,
    handler: (val: string) => {
      const styleSheets: Record<string, string> = {};
      if (/(px|em|vw|vh|%)/.test(val)) {
        styleSheets['font-size'] = val;
      } else if (val.length > 2) { // 颜色处理
        styleSheets['color'] = val;
      }
      return styleSheets;
    }
  }, {
    // 文本对齐规则
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
    // 元素全宽高设置规则
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
    // 定位规则
    regex: /position-(.*)/,
    handler(val: string) {
      return createStyles({
        position: val
      });
    }
  }, {
    // 定位偏移规则
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
    // 尺寸/内边距/flex/gap规则
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
    // 外边距规则：m-[值] / mt-[值] / mb-[值] / ml-[值] / mr-[值]
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
    // 边框规则：border-[值]（支持 1px solid #ccc 格式）/ border-radius-[值]
    regex: /(border|border-radius)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // 背景规则：bg-[颜色] / bg-img-[图片地址] / bg-size-[值] / bg-position-[值]
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
      // 背景图片特殊处理（补全 url() 语法）
      const value = type === 'img' ? `url(${val})` : val;
      return createStyles({
        [key]: value
      });
    }
  }, {
    // 透明度规则：opacity-[值]（0-1 或 0%-100%）
    regex: /opacity-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        opacity: val
      });
    }
  }, {
    // 显示模式：display-[值]（block/inline/flex/none 等）
    regex: /display-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        display: val
      });
    }
  }, {
    // Flex 布局增强：justify-[值]（justify-content）/ align-[值]（align-items）
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
    // 行高规则：line-height-[值]
    regex: /line-height-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        'line-height': val
      });
    }
  }, {
    // 字体样式：font-weight-[值] / font-style-[值]
    regex: /(font-weight|font-style)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // 溢出处理：overflow-[值] / overflow-x-[值] / overflow-y-[值]
    regex: /(overflow|overflow-x|overflow-y)-\[([^\]]*)]/,
    handler(_, match) {
      const [_1, key, val] = match;
      return createStyles({
        [key]: val
      });
    }
  }, {
    // 光标样式：cursor-[值]（pointer/default/hover 等）
    regex: /cursor-\[(.*)]$/,
    handler(_, match) {
      const val = match[1];
      return createStyles({
        cursor: val
      });
    }
  }, {
    // 新增 line-clamp 规则
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
