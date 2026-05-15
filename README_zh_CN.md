# Light CSS
[![npm 版本](https://img.shields.io/npm/v/light-css-js.svg)](https://www.npmjs.com/package/light-css-js)
[![开源协议](https://img.shields.io/npm/l/light-css-js)](https://github.com/sinjayxie/light-css-js/blob/main/LICENSE)
[![包体积](https://img.shields.io/bundlephobia/minzip/light-css-js)](https://bundlephobia.com/package/light-css-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

一款轻量级 CSS 工具库，可通过类名动态生成并应用 CSS 样式。开发体验对标 Tailwind CSS、UnoCSS，同时更轻量化、灵活。

## ✨ 特性
- **零依赖**：无需引入任何外部依赖包
- **核心精简**：仅保留核心功能，代码体积极小
- **动态生成**：根据类名实时生成样式，无需预编译
- **灵活配置**：支持自定义样式规则、类名前缀
- **TypeScript 友好**：内置完整类型定义，提升开发体验
- **性能优化**：采用节流函数 + 元素观察器，高效生成样式
- **浏览器兼容**：支持所有现代浏览器

## 📦 安装
```bash
# npm 安装
npm install light-css-js

# yarn 安装
yarn add light-css-js

# pnpm 安装
pnpm add light-css-js

# CDN 直接引入
<script src="https://cdn.jsdelivr.net/npm/light-css-js/dist/light-css.umd.js"></script>
```

## 🚀 快速上手
### 基础使用
```typescript
import { lightCSS } from 'light-css-js';

// 初始化
const css = lightCSS();

// 销毁实例，清理资源（按需调用）
css.destroy();
```

### 配置项
```typescript
import { lightCSS, LightCSSOptions } from 'light-css-js';

const css = lightCSS({
  // 自定义样式规则数组
  rules: [],
  
  // 类名前缀（默认无）
  prefix: 'lc-app',
  
  // 是否通过 innerHTML 注入样式（默认 false）
  useInnerHTML: false,
  
  // 是否启用内置默认样式规则（默认 true）
  defaultRules: true,
  
  // 样式生成节流延迟，单位毫秒（默认 16）
  throttleDelay: 16,
  
  // 关闭日志输出（默认 false）
  noLogger: false,
});
```

## 📚 内置默认类名规则
### 文字样式
#### 文字颜色
- `text-[颜色值]`：设置文字颜色
  - `text-[#ff0000]`：自定义十六进制颜色
  - `text-[red]`：基础颜色名
  - `text-[slate-500]`：适配 Tailwind 色系
- `text-transparent`：透明文字
- `text-current`：继承当前文字颜色

#### 字体大小
- `text-[尺寸值]`：自定义字体大小
  - `text-[16px]`：16像素字体
- `text-xs` / `text-sm` / `text-base` / `text-lg` / `text-xl` / `text-2xl` / `text-3xl`：预设字号

#### 字体粗细
`font-thin` / `font-extralight` / `font-light` / `font-normal` / `font-medium` / `font-semibold` / `font-bold` / `font-extrabold` / `font-black`

#### 行高
`leading-none` / `leading-tighter` / `leading-tight` / `leading-normal` / `leading-relaxed` / `leading-loose`

#### 文字装饰
- 下划线/删除线：`underline` / `overline` / `line-through` / `no-underline`
- 字体样式：`italic` / `oblique` / `normal`
- 大小写：`uppercase` / `lowercase` / `capitalize` / `normal-case`

### 间距（内边距 & 外边距）
#### 基础间距
- `p-[值]` / `m-[值]`：内边距/外边距（例：`p-[10px]`、`m-[10px]`）
- `p-1` / `p-2` / `p-3` / `p-4`……：预设间距（步长 0.25rem）

#### 方向内边距
- `pt-[值]` / `pr-[值]` / `pb-[值]` / `pl-[值]`：上/右/下/左内边距
- `pt-1` / `pr-2` / `pb-3` / `pl-4`：预设方向内边距

#### 方向外边距
- `mt-[值]` / `mr-[值]` / `mb-[值]` / `ml-[值]`：上/右/下/左外边距
- `mt-1` / `mr-2` / `mb-3` / `ml-4`：预设方向外边距

#### 横向/纵向间距
- `px-[值]`：水平内边距（左右）
- `py-[值]`：垂直内边距（上下）
- `mx-[值]`：水平外边距
- `my-[值]`：垂直外边距

### 尺寸样式
- `w-[值]` / `h-[值]`：宽/高（例：`w-[100px]`、`h-[200px]`）
- `miw-[值]` / `maw-[值]`：最小宽度/最大宽度
- `mih-[值]` / `mah-[值]`：最小高度/最大高度
- `lh-[值]`：行高
- `inset-[值]`：定位内边距（绝对定位用）
- `l-[值]` / `r-[值]` / `t-[值]` / `b-[值]`：左/右/上/下偏移量

### 边框样式
- `b-[宽度]` / `border-[宽度]`：边框宽度（例：`b-2`、`b-[4px]`）
- `b-[颜色]` / `border-[颜色]`：边框颜色（例：`b-red`、`b-[#ff0000]`）
- `b-[宽度]-[颜色]`：同时设置边框宽+色（例：`b-2-red`、`b-[4px]-[#ff0000]`）
- 方向边框：`b-t-[值]` / `b-r-[值]` / `b-b-[值]` / `b-l-[值]`
- 边框样式：`b-solid` / `b-dashed` / `b-dotted` / `b-double` / `b-none`

### 圆角
- `round-[值]`：自定义圆角（例：`round-[4px]`）
- `rounded` / `rounded-none` / `rounded-sm` / `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-2xl` / `rounded-3xl` / `rounded-full`：预设圆角
- 方向圆角：`rounded-tl-[值]` / `rounded-tr-[值]` / `rounded-bl-[值]` / `rounded-br-[值]`

### 背景样式
- `bg-[颜色]`：背景色（例：`bg-[#f0f0f0]`、`bg-red-500`）
- `bg-img-[url]`：背景图片（例：`bg-img-[url(image.jpg)]`）
- `bg-clip-[值]`：背景裁剪方式（例：`bg-clip-[content-box]`）
- `bg-origin-[值]`：背景定位原点（例：`bg-origin-[padding-box]`）
- `bg-pos-[值]`：背景位置（例：`bg-pos-[center_center]`）
- `bg-repeat-[值]`：背景重复方式（例：`bg-repeat-[no-repeat]`）
- `bg-size-[值]`：背景尺寸（例：`bg-size-[cover]`）

#### 渐变背景
- `bg-gradient-to-(t|r|b|l|tr|tl|br|bl)`：渐变方向（上/右/下/左/右上/左上/右下/左下）
- `from-[颜色]-[色阶]`：渐变起始色（例：`from-indigo-500`）
- `via-[颜色]-[色阶]`：渐变中间色（例：`via-purple-500`）
- `to-[颜色]-[色阶]`：渐变结束色（例：`to-pink-500`）

### 弹性布局（Flex）
- `flex-[值]`：flex 属性值（例：`flex-[1]`、`flex-[none]`）
- 排列方向：`flex-row` / `flex-col` / `flex-row-reverse` / `flex-col-reverse`
- 换行规则：`flex-wrap` / `flex-nowrap` / `flex-wrap-reverse`
- 伸缩属性：`flex-grow` / `flex-shrink` / `flex-0`
- 主轴对齐：`justify-start` / `justify-end` / `justify-center` / `justify-between` / `justify-around` / `justify-evenly`
- 交叉轴对齐：`items-start` / `items-end` / `items-center` / `items-baseline` / `items-stretch`
- 自身对齐：`self-start` / `self-end` / `self-center` / `self-baseline` / `self-stretch`
- 多行对齐：`content-start` / `content-end` / `content-center` / `content-between` / `content-around` / `content-evenly`
- 排序：`order-[数字]` / `order-first` / `order-last`

### 网格布局（Grid）
- `grid-cols-[数字]`：网格列数（例：`grid-cols-3`）
- `grid-rows-[数字]`：网格行数（例：`grid-rows-2`）
- `col-span-[数字]` / `col-span-auto`：列跨域
- `row-span-[数字]` / `row-span-auto`：行跨域
- `col-start-[数字]` / `col-end-[数字]`：列起始/结束位置
- `row-start-[数字]` / `row-end-[数字]`：行起始/结束位置

### 定位
- `pos-[值]` / `position-[值]`：定位方式
  - `pos-static` / `pos-relative` / `pos-absolute` / `pos-fixed` / `pos-sticky`
- `top-[值]` / `right-[值]` / `bottom-[值]` / `left-[值]`：定位偏移量

### 显示模式
- `disp-[值]`：自定义显示类型（例：`disp-[flex]`、`disp-[none]`）
- 预设值：`block` / `inline` / `inline-block` / `flex` / `inline-flex` / `grid` / `inline-grid` / `none`

### 层级（Z-index）
- `z-[值]`：层级值（例：`z-[99]`）
- `z-auto`：自动层级

### 溢出处理
- `overflow-[值]`：整体溢出方式（例：`overflow-[hidden]`）
- `overflow-x-[值]` / `overflow-y-[值]`：横向/纵向溢出
- 可选值：`auto` / `hidden` / `clip` / `visible` / `scroll`

### 文字行数截断
- `line-clamp-[数字]`：限制文字行数（例：`line-clamp-[2]`）

### 阴影
- `shadow-[尺寸]-[颜色]`：自定义阴影（例：`shadow-[4px]-[#00000033]`）
- 预设阴影：`shadow-sm` / `shadow-md` / `shadow-lg` / `shadow-xl` / `shadow-2xl` / `shadow-3xl`

### 间距间隙（Gap）
- `gap-[值]`：网格/弹性布局间隙（例：`gap-[8px]`）
- `gap-x-[值]` / `gap-y-[值]`：横向/纵向间隙（例：`gap-x-[16px]`、`gap-y-[8px]`）

### 动画
- 预设动画：`animate-spin` / `animate-pulse` / `animate-bounce` / `animate-shake` / `animate-wiggle` / `animate-ping`
- `animate-[自定义动画]`：自定义动画
- `duration-[毫秒]`：动画时长（例：`duration-[500]`）
- `transition-[属性]`：过渡属性（例：`transition-transform`）

### 变形变换
- `scale-[值]` / `scale-x-[值]` / `scale-y-[值]`：缩放
- `translate-[值]` / `translate-x-[值]` / `translate-y-[值]`：位移
- `rotate-[值]` / `rotate-x-[值]` / `rotate-y-[值]`：旋转

### 特效样式
- `opacity-[值]`：透明度（例：`opacity-[80]` → 0.8）
- `cursor-[值]`：鼠标样式（例：`cursor-pointer`）
- `select-[值]`：文字选中方式（例：`select-none`）
- `pointer-events-[值]`：鼠标事件响应（例：`pointer-events-none`）
- `resize-[值]`：元素可调整大小（例：`resize-both`）
- `contain-[值]`：布局约束（例：`contain-strict`）
- `will-change-[值]`：浏览器渲染优化（例：`will-change-transform`）

### 宽高比
- `aspect-auto` / `aspect-square` / `aspect-video`：预设比例
- `aspect-[比例]`：自定义比例（例：`aspect-[16/9]`）

## 📖 API 文档
### `lightCSS(options?: LightCSSOptions)`
创建并返回 LightCSS 实例

**参数说明**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `rules` | `IRule[]` | `[]` | 自定义样式规则数组 |
| `prefix` | `string` | `''` | 类名前缀 |
| `useInnerHTML` | `boolean` | `false` | 是否通过 innerHTML 注入样式 |
| `defaultRules` | `boolean` | `true` | 是否启用内置默认规则 |
| `throttleDelay` | `number` | `16` | 样式生成节流延迟（毫秒） |
| `noLogger` | `boolean` | `false` | 关闭日志输出 |

**返回值**：LightCSS 实例

### LightCSS 类
#### 方法
- `destroy()`：销毁实例，清理所有关联资源

## 📂 项目目录结构
```
light-css/
├── src/
│   ├── core/          # 核心类（LightCSS 等）
│   ├── rules/         # 样式规则定义与工具
│   ├── utils/         # 工具函数
│   ├── constants.ts   # 项目常量
│   └── index.ts       # 入口文件
├── examples/          # 使用示例
├── dist/              # 编译打包产物
├── package.json
└── vite.config.ts
```

## 🛠️ 开发调试
```bash
# 安装依赖
pnpm install

# 启动开发服务
pnpm run dev

# 生产打包
pnpm run build

# 代码格式检查
pnpm run lint
```

## 🌐 浏览器兼容
支持所有主流现代浏览器：
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 开源协议
MIT 许可证

## 🤝 贡献指南
欢迎提交 Issue 和 Pull Request！

## 🔖 版本更新记录
### v1.0.17（当前版本）
- 优化 CSSStyleSheet 处理逻辑，兼容兜底 innerHTML 注入方式
- 优化节流逻辑，提升样式生成性能

### v1.0.15
- 调整内置默认样式规则

### v1.0.14
- 优化代码执行性能
- 新增关闭调试日志配置项（`noLogger?: boolean`）

### v1.0.13
- 新增常量与正则常量

### v1.0.11
- 修复 SVG 元素判断错误

### v1.0.10
- 新增 hover/active 伪类支持

### v1.0.8
- 新增样式生成节流处理，支持 `throttleDelay` 配置

### v1.0.7
- 新增伪类选择器：`hover:规则`、`active:规则`

### v1.0.5
- 更新文档，优化已知问题

### v1.0.0
- 首次发布
- 实现基础类名转 CSS 功能
- 支持常用样式规则
- 提供 TypeScript 类型定义

## 💡 使用示例
更多示例可查看 [examples 目录](./examples/main.ts)
```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] round-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">你好 Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">
    一款轻量级 CSS 工具库，通过类名动态生成并应用样式。
  </p>
  <button class="mt-[10px] pl-[16px] pr-[16px] pt-[8px] pb-[8px] 
      bg-[#007bff] text-[#fff] round-[4px] hover:bg-[#0069d9]">
    点击我
  </button>
</div>
```
