# Light CSS

一个轻量级的 CSS 工具库，通过类名动态生成和应用 CSS 样式，提供类似 Tailwind CSS 的开发体验，但更加轻量和灵活。

## 特性

- **轻量级**：核心代码体积小，仅包含必要的功能
- **动态生成**：根据类名实时生成 CSS 样式，无需预编译
- **灵活配置**：支持自定义规则和前缀

## 项目地址

[light-css-js](https://github.com/sinjayxie/light-css-js.git)


## 安装

```bash
# 使用 npm
npm install light-css-js

# 使用 yarn
yarn add light-css-js

# 使用 pnpm
pnpm add light-css-js
```

## 快速开始

### 基本使用

```javascript
import { lightCSS } from 'light-css-js';

// 初始化
const css = lightCSS();

// 在需要时销毁
// css.destroy();
```

### 配置选项

```javascript
import { lightCSS } from 'light-css-js';

// CDN 引入 
// lightCSS.lightCSS({...})

// 带配置的初始化
const css = lightCSS({
  // 自定义规则
  rules: [],
  // 类名前缀
  prefix: 'lc-',
  // 是否使用 innerHTML 方式插入样式
  useInnerHTML: false,
  // 是否使用默认规则
  defaultRules: true,
  // 处理抖动延迟
  throttleDelay: 16,
});
```

## 支持的类名规则默认规则

### 文本样式

- `text-[值]` - 设置字体大小或颜色
  - `text-[16px]` - 字体大小 16px
  - `text-[#ff0000]` - 文本颜色红色
- `text-left` / `text-center` / `text-right` - 文本对齐方式

### 尺寸和间距

- `w-[值]` - 宽度
  - `w-[100px]` - 宽度 100px
- `h-[值]` - 高度
  - `h-[200px]` - 高度 200px
- `p-[值]` - 内边距
  - `p-[10px]` - 内边距 10px
- `m-[值]` - 外边距
  - `m-[10px]` - 外边距 10px
- `mt-[值]` / `mb-[值]` / `ml-[值]` / `mr-[值]` - 上/下/左/右边距
  - `mt-[5px]` - 上外边距 5px

### 定位

- `position-[值]` - 定位方式
  - `position-absolute` - 绝对定位
- `left-[值]` / `right-[值]` / `top-[值]` / `bottom-[值]` - 定位偏移
  - `left-[10px]` - 左偏移 10px

### 边框和背景

- `border-[值]` - 边框样式
  - `border-[1px solid #ccc]` - 1px 实线边框
- `border-radius-[值]` - 边框圆角
  - `border-radius-[4px]` - 4px 圆角
- `bg-[值]` - 背景颜色
  - `bg-[#f0f0f0]` - 背景颜色 #f0f0f0
- `bg-img-[值]` - 背景图片
  - `bg-img-[url("image.jpg")]` - 背景图片
- `bg-size-[值]` - 背景大小
  - `bg-size-[cover]` - 背景覆盖
- `bg-position-[值]` - 背景位置
  - `bg-position-[center]` - 背景居中

### Flex 布局

- `flex-[值]` - flex 属性
  - `flex-[1]` - flex: 1
- `justify-[值]` - justify-content
  - `justify-center` - 水平居中
- `align-[值]` - align-items
  - `align-center` - 垂直居中

### 其他常用样式

- `display-[值]` - 显示模式
  - `display-[flex]` - flex 布局
  - `display-[none]` - 隐藏元素
- `opacity-[值]` - 透明度
  - `opacity-[0.5]` - 50% 透明度
- `cursor-[值]` - 光标样式
  - `cursor-[pointer]` - 指针光标
- `line-clamp-[值]` - 文本行数限制
  - `line-clamp-[2]` - 最多显示 2 行文本

## 示例

```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] rounded-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">Hello Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">这是一个轻量级的 CSS 工具库，通过类名动态生成和应用 CSS 样式。</p>
  <button class="mt-[10px] px-[16px] py-[8px] bg-[#007bff] text-[#fff] rounded-[4px] hover:bg-[#0069d9]">
    点击我
  </button>
</div>
```

## 自定义规则

您可以通过配置选项添加自定义规则：

```javascript
import { lightCSS } from 'light-css-js';

const css = lightCSS({
  rules: [
    {
      // 自定义规则：color-[值]
      regex: /^color-\[(.*)]$/, // 支持 Function (classStr: string) => Boolean | Match string 这个返回给 handler(val) 的第一个参数
      handler(_, match) {
        const val = match[1];
        return {
          'color': val
        };
      }
    }
  ]
});
```

## API 文档

### lightCSS 函数

创建并返回一个 LightCSS 实例。

**参数**：
- `options` (可选)：配置选项对象
  - `rules` (可选)：自定义规则数组
  - `prefix` (可选)：类名前缀
  - `useInnerHTML` (可选)：是否使用 innerHTML 方式插入样式
  - `defaultRules` (可选)：是否使用默认规则

**返回值**：
- LightCSS 实例

### LightCSS 类

#### 方法

- `destroy()`：销毁实例，清理所有资源

## 浏览器兼容性

支持所有现代浏览器，包括：

- Chrome
- Firefox
- Safari
- Edge

## 开发

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建
pnpm run build
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 版本历史

### v1.0.10
- 增加 hover|active
```html
<div class="color-[#333] hover:color-[red] active:color-[blue]">
  新增 Hover Active 选择器
</div>
```

### v1.0.8
- 添加抖动处理样式 
```throttleDelay: number```

### v1.0.7
- 添加选择器 hover:rule,active:rule | hover:text-[red] active:text-[green]

### v1.0.5
- 更新文档 优化问题


### v1.0.0
- 初始版本
- 实现基本的类名到 CSS 转换功能
- 支持多种常用样式规则
- 提供 TypeScript 类型定义




