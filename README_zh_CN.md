# Light CSS 中文文档
Light CSS 是一款轻量级的 CSS 工具库，可通过类名动态生成并应用 CSS 样式。它提供类 Tailwind CSS 的开发体验，同时更轻量、更灵活。

## 核心特性
- **极致轻量**：核心代码仅包含必要功能，体积小巧
- **动态生成**：无需预编译，根据类名实时生成 CSS 样式
- **灵活配置**：支持自定义规则、自定义类名前缀

## 项目仓库
[light-css-js](https://github.com/sinjayxie/light-css-js.git)

## 安装方式
```bash
# 使用 npm
npm install light-css-js

# 使用 yarn
yarn add light-css-js

# 使用 pnpm
pnpm add light-css-js
```

## 快速开始
### 基础使用
```javascript
import { lightCSS } from 'light-css-js';

// 初始化
const css = lightCSS();

// 如需销毁实例（清理资源）
// css.destroy();
```

### 配置项说明
```javascript
import { lightCSS } from 'light-css-js';

// CDN 引入方式调用
// lightCSS.lightCSS({...})

// 带配置初始化
const css = lightCSS({
  // 自定义规则数组
  rules: [],
  // 类名前缀
  prefix: 'lc-app',
  // 是否使用 innerHTML 插入样式
  useInnerHTML: false,
  // 是否启用内置默认规则
  defaultRules: true,
  // 样式生成的节流延迟（毫秒）
  throttleDelay: 16,
  // 关闭日志输出
  noLogger: false,
});
```

## 支持的默认类名规则
### 文本样式
- `text-[值]` - 设置字体大小、文本颜色或文本对齐方式
  - `text-[16px]` - 设置字体大小为 16px（仅支持合法像素单位）
  - `text-[#ff0000]` - 设置文本颜色为红色（支持所有合法颜色值）
  - `text-[left]` / `text-[center]` / `text-[right]` / `text-[justify]` / `text-[start]` / `text-[end]` - 设置文本对齐方式

### 阴影样式
- `shadow-[值]-[颜色]` - 设置盒子阴影（格式：0 0 [值] [颜色]）
  - `shadow-[4px]-[#00000033]` - 设置盒子阴影为 `0 0 4px rgba(0, 0, 0, 0.2)`（值支持合法像素单位，颜色支持合法颜色值）

### 间距（内边距 & 外边距）
- `p-[值]` / `m-[值]` - 设置整体内边距/外边距（仅支持合法像素单位）
  - `p-[10px]` - 设置内边距为 10px
  - `m-[10px]` - 设置外边距为 10px
- `pl-[值]` / `pr-[值]` / `pt-[值]` / `pb-[值]` - 左/右/上/下内边距
  - `pt-[5px]` - 设置顶部内边距为 5px
- `ml-[值]` / `mr-[值]` / `mt-[值]` / `mb-[值]` - 左/右/上/下外边距
  - `mb-[8px]` - 设置底部外边距为 8px

### 尺寸与定位
- `w-[值]` - 宽度（仅支持合法像素单位）
  - `w-[100px]` - 设置宽度为 100px
- `h-[值]` - 高度（仅支持合法像素单位）
  - `h-[200px]` - 设置高度为 200px
- `lh-[值]` - 行高（仅支持合法像素单位）
  - `lh-[24px]` - 设置行高为 24px
- `miw-[值]` - 最小宽度（仅支持合法像素单位）
  - `miw-[300px]` - 设置最小宽度为 300px
- `mih-[值]` - 最小高度（仅支持合法像素单位）
  - `mih-[200px]` - 设置最小高度为 200px
- `maw-[值]` - 最大宽度（仅支持合法像素单位）
  - `maw-[800px]` - 设置最大宽度为 800px
- `mah-[值]` - 最大高度（仅支持合法像素单位）
  - `mah-[600px]` - 设置最大高度为 600px
- `l-[值]` / `r-[值]` / `t-[值]` / `b-[值]` - 左/右/上/下偏移量（仅支持合法像素单位）
  - `l-[10px]` - 设置左偏移为 10px
- `inset-[值]` - 内偏移（仅支持合法像素单位）
  - `inset-[5px]` - 设置内偏移为 5px
- `round-[值]` - 边框圆角（仅支持合法像素单位）
  - `round-[4px]` - 设置边框圆角为 4px
- `gap-[值]` - 间距（仅支持合法像素单位）
  - `gap-[8px]` - 设置间距为 8px
- `flex-[值]` - 弹性布局占比
  - `flex-[1]` - 设置 flex 为 1

### 显示模式
- `disp-[值]` - 设置元素显示模式
  - `disp-[flex]` - 启用弹性布局
  - `disp-[none]` - 隐藏元素
  - 支持的值：none、block、inline、inline-block、flex、grid、inline-flex、inline-grid、table、table-cell、table-row、table-column、flow、flow-root、contents、unset

### 层级（Z-index）
- `z-[值]` - 设置元素层级
  - `z-[99]` - 设置 z-index 为 99
  - `z-[auto]` - 设置 z-index 为 auto
  - 注意：方括号会被自动移除（例如 `z-[[100]]` → `z-index: 100`）

### 溢出处理
- `overflow-[值]` - 设置整体溢出行为
  - `overflow-[hidden]` - 隐藏溢出内容
- `overflow-x-[值]` / `overflow-y-[值]` - 设置水平/垂直方向溢出行为
  - `overflow-x-[scroll]` - 水平方向显示滚动条
  - 支持的值：auto、hidden、clip、visible、scroll

### 文本行数限制
- `line-clamp-[数字]` - 限制文本显示的最大行数
  - `line-clamp-[2]` - 限制文本最多显示 2 行（自动设置 overflow: hidden 及 WebKit 盒子相关属性）

### 背景样式
- `bg-[值]` - 设置背景颜色（支持所有合法颜色值）
  - `bg-[#f0f0f0]` - 设置背景色为浅灰色
- `bg-img-[值]` - 设置背景图片
  - `bg-img-[url(image.jpg)]` - 设置背景图片为 image.jpg
- `bg-clip-[值]` - 设置背景裁剪（值中的下划线会被转换为空格）
  - `bg-clip-[content-box]` - 设置 background-clip 为 "content box"
- `bg-origin-[值]` - 设置背景原点（值中的下划线会被转换为空格）
  - `bg-origin-[padding-box]` - 设置 background-origin 为 "padding box"
- `bg-pos-[值]` - 设置背景位置（值中的下划线会被转换为空格）
  - `bg-pos-[center_center]` - 设置 background-position 为 "center center"
- `bg-repeat-[值]` - 设置背景重复方式（值中的下划线会被转换为空格）
  - `bg-repeat-[no-repeat]` - 设置 background-repeat 为 "no repeat"
- `bg-size-[值]` - 设置背景尺寸（值中的下划线会被转换为空格）
  - `bg-size-[cover]` - 设置 background-size 为 cover

## 完整示例
```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] round-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">Hello Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">这是一款轻量级 CSS 工具库，可通过类名动态生成并应用 CSS 样式。</p>
  <button class="mt-[10px] pl-[16px] pr-[16px] pt-[8px] pb-[8px] bg-[#007bff] text-[#fff] round-[4px] hover:bg-[#0069d9]">
    点击我
  </button>
</div>
```

## 自定义规则
你可以通过配置项添加自定义规则，扩展 Light CSS 的能力：
```javascript
import { lightCSS } from 'light-css-js';

const css = lightCSS({
  rules: [
    {
      // 自定义规则：color-[值]
      regex: /^color-\[(.*)]$/, // 支持函数 (classStr: string) => Boolean | 匹配字符串（会作为 handler 的第一个参数传入）
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
创建并返回 LightCSS 实例。

**参数**：
- `options`（可选）：配置对象
  - `rules`（可选）：自定义规则数组
  - `prefix`（可选）：类名前缀
  - `useInnerHTML`（可选）：是否使用 innerHTML 插入样式
  - `defaultRules`（可选）：是否启用内置默认规则
  - `noLogger`（可选）：是否关闭日志输出

**返回值**：
- LightCSS 实例

### LightCSS 类
#### 实例方法
- `destroy()`: 销毁实例并清理所有关联资源

## 浏览器兼容性
支持所有现代浏览器：
- Chrome
- Firefox
- Safari
- Edge

## 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产包
pnpm run build
```

## 许可证
MIT License

## 贡献指南
欢迎提交 Issue 和 Pull Request 参与贡献！

## 版本历史
### v1.0.14
- 优化代码执行性能
- 新增关闭调试日志的配置项（`noLogger?: boolean`）

### v1.0.13
- 新增常量和正则常量

### v1.0.11
- 修复 SVG 元素判断错误问题

### v1.0.10
- 新增 hover/active 伪类支持
```html
<div class="text-[#333] hover:text-[red] active:text-[blue]">
  新增伪类支持示例
</div>
```

### v1.0.8
- 为样式生成添加节流处理，新增配置项 `throttleDelay: number`

### v1.0.7
- 新增伪类选择器 `hover:规则` 和 `active:规则`（例如 `hover:text-[red]`、`active:text-[green]`）

### v1.0.5
- 更新文档并优化已知问题

### v1.0.0
- 初始版本发布
- 实现基础的类名转 CSS 功能
- 支持多种常用样式规则
- 提供 TypeScript 类型定义
