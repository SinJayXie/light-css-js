# Light CSS

[![npm version](https://img.shields.io/npm/v/light-css-js.svg)](https://www.npmjs.com/package/light-css-js)
[![License](https://img.shields.io/npm/l/light-css-js)](https://github.com/sinjayxie/light-css-js/blob/main/LICENSE)
[![Size](https://img.shields.io/bundlephobia/minzip/light-css-js)](https://bundlephobia.com/package/light-css-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

A lightweight CSS utility library that dynamically generates and applies CSS styles via class names. It delivers a development experience similar to Tailwind CSS and UNO CSS, while being more lightweight and flexible.

## ✨ Features

- **Zero Dependencies** - No external dependencies required
- **Lightweight Core** - Minimal codebase with only essential functionality
- **Dynamic Generation** - Generates CSS styles on-the-fly based on class names, no precompilation required
- **Flexible Configuration** - Supports custom rules and class name prefixes
- **TypeScript Support** - Built-in TypeScript type definitions for better developer experience
- **Performance Optimized** - Uses throttling andMutationObserver for efficient style generation
- **Browser Compatible** - Works with all modern browsers

## 📦 Installation

```bash
# Using npm
npm install light-css-js

# Using yarn
yarn add light-css-js

# Using pnpm
pnpm add light-css-js

# Using CDN
<script src="https://cdn.jsdelivr.net/npm/light-css-js/dist/light-css.umd.js"></script>
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { lightCSS } from 'light-css-js';

// Initialize
const css = lightCSS();

// Destroy when needed to clean up resources
css.destroy();
```

### Configuration Options

```typescript
import { lightCSS, LightCSSOptions } from 'light-css-js';

const css = lightCSS({
  // Custom rules array
  rules: [],
  
  // Class name prefix (default: not set)
  prefix: 'lc-app',
  
  // Whether to use innerHTML to insert styles (default: false)
  useInnerHTML: false,
  
  // Whether to enable built-in default rules (default: true)
  defaultRules: true,
  
  // Throttle delay for style generation in milliseconds (default: 16)
  throttleDelay: 16,
  
  // Disable logger output (default: false)
  noLogger: false,
});
```

## 📚 Supported Default Class Name Rules

### Typography

#### Text Color
- `text-[color]` - Set text color
  - `text-[#ff0000]` - Custom color
  - `text-[red]` - Named color
  - `text-[slate-500]` - Tailwind color palette
- `text-transparent` - Transparent color
- `text-current` - Current color

#### Font Size
- `text-[size]` - Custom size
  - `text-[16px]` - 16 pixels
- `text-xs` / `text-sm` / `text-base` / `text-lg` / `text-xl` / `text-2xl` / `text-3xl` - Predefined sizes

#### Font Weight
- `font-thin` / `font-extralight` / `font-light` / `font-normal` / `font-medium` / `font-semibold` / `font-bold` / `font-extrabold` / `font-black`

#### Line Height
- `leading-none` / `leading-tighter` / `leading-tight` / `leading-normal` / `leading-relaxed` / `leading-loose`

#### Text Decoration
- `underline` / `overline` / `line-through` / `no-underline`
- `italic` / `oblique` / `normal`
- `uppercase` / `lowercase` / `capitalize` / `normal-case`

### Spacing (Padding & Margin)

#### Base Spacing
- `p-[value]` / `m-[value]` - Padding/margin (e.g., `p-[10px]`, `m-[10px]`)
- `p-1` / `p-2` / `p-3` / `p-4` ... - Predefined spacing (0.25rem step)

#### Directional Padding
- `pt-[value]` / `pr-[value]` / `pb-[value]` / `pl-[value]` - Top/Right/Bottom/Left padding
- `pt-1` / `pr-2` / `pb-3` / `pl-4` - Predefined directional padding

#### Directional Margin
- `mt-[value]` / `mr-[value]` / `mb-[value]` / `ml-[value]` - Top/Right/Bottom/Left margin
- `mt-1` / `mr-2` / `mb-3` / `ml-4` - Predefined directional margin

#### XY Direction
- `px-[value]` - Horizontal padding (left + right)
- `py-[value]` - Vertical padding (top + bottom)
- `mx-[value]` - Horizontal margin
- `my-[value]` - Vertical margin

### Sizing

- `w-[value]` / `h-[value]` - Width/height (e.g., `w-[100px]`, `h-[200px]`)
- `miw-[value]` / `maw-[value]` - Min-width/Max-width
- `mih-[value]` / `mah-[value]` - Min-height/Max-height
- `lh-[value]` - Line height
- `inset-[value]` - Inset (for absolute positioning)
- `l-[value]` / `r-[value]` / `t-[value]` / `b-[value]` - Left/Right/Top/Bottom offsets

### Border

- `b-[width]` / `border-[width]` - Border width (e.g., `b-2`, `b-[4px]`)
- `b-[color]` / `border-[color]` - Border color (e.g., `b-red`, `b-[#ff0000]`)
- `b-[width]-[color]` - Border width and color (e.g., `b-2-red`, `b-[4px]-[#ff0000]`)
- Directional: `b-t-[value]` / `b-r-[value]` / `b-b-[value]` / `b-l-[value]`
- Style: `b-solid` / `b-dashed` / `b-dotted` / `b-double` / `b-none`

### Border Radius

- `round-[value]` - Border radius (e.g., `round-[4px]`)
- `rounded` / `rounded-none` / `rounded-sm` / `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-2xl` / `rounded-3xl` / `rounded-full`
- Directional: `rounded-tl-[value]` / `rounded-tr-[value]` / `rounded-bl-[value]` / `rounded-br-[value]`

### Background

- `bg-[color]` - Background color (e.g., `bg-[#f0f0f0]`, `bg-red-500`)
- `bg-img-[url]` - Background image (e.g., `bg-img-[url(image.jpg)]`)
- `bg-clip-[value]` - Background clip (e.g., `bg-clip-[content-box]`)
- `bg-origin-[value]` - Background origin (e.g., `bg-origin-[padding-box]`)
- `bg-pos-[value]` - Background position (e.g., `bg-pos-[center_center]`)
- `bg-repeat-[value]` - Background repeat (e.g., `bg-repeat-[no-repeat]`)
- `bg-size-[value]` - Background size (e.g., `bg-size-[cover]`)

#### Gradient Backgrounds

- `bg-gradient-to-(t|r|b|l|tr|tl|br|bl)` - Gradient direction
- `from-[color]-[shade]` - Gradient from color (e.g., `from-indigo-500`)
- `via-[color]-[shade]` - Gradient via color (e.g., `via-purple-500`)
- `to-[color]-[shade]` - Gradient to color (e.g., `to-pink-500`)

### Flexbox

- `flex-[value]` - Flex value (e.g., `flex-[1]`, `flex-[none]`)
- `flex-row` / `flex-col` / `flex-row-reverse` / `flex-col-reverse` - Flex direction
- `flex-wrap` / `flex-nowrap` / `flex-wrap-reverse` - Flex wrap
- `flex-grow` / `flex-shrink` / `flex-0` - Flex grow/shrink
- `justify-start` / `justify-end` / `justify-center` / `justify-between` / `justify-around` / `justify-evenly`
- `items-start` / `items-end` / `items-center` / `items-baseline` / `items-stretch`
- `self-start` / `self-end` / `self-center` / `self-baseline` / `self-stretch`
- `content-start` / `content-end` / `content-center` / `content-between` / `content-around` / `content-evenly`
- `order-[number]` / `order-first` / `order-last`

### Grid

- `grid-[columns]` - Number of columns (e.g., `grid-cols-3`)
- `grid-rows-[number]` - Number of rows (e.g., `grid-rows-2`)
- `col-span-[number]` / `col-span-auto` - Column span
- `row-span-[number]` / `row-span-auto` - Row span
- `col-start-[number]` / `col-end-[number]` - Column start/end
- `row-start-[number]` / `row-end-[number]` - Row start/end

### Position

- `pos-[value]` / `position-[value]` - Position value
  - `pos-static` / `pos-relative` / `pos-absolute` / `pos-fixed` / `pos-sticky`
- `top-[value]` / `right-[value]` / `bottom-[value]` / `left-[value]` - Position offsets

### Display

- `disp-[value]` - Display mode (e.g., `disp-[flex]`, `disp-[none]`)
- Predefined: `block` / `inline` / `inline-block` / `flex` / `inline-flex` / `grid` / `inline-grid` / `none`

### Z-index

- `z-[value]` - Z-index (e.g., `z-[99]`)
- `z-auto` - Auto z-index

### Overflow

- `overflow-[value]` - Overflow (e.g., `overflow-[hidden]`)
- `overflow-x-[value]` / `overflow-y-[value]` - Axis-specific overflow
- Values: `auto` / `hidden` / `clip` / `visible` / `scroll`

### Text Clamp

- `line-clamp-[number]` - Limit text lines (e.g., `line-clamp-[2]`)

### Shadow

- `shadow-[value]-[color]` - Custom shadow (e.g., `shadow-[4px]-[#00000033]`)
- Predefined: `shadow-sm` / `shadow-md` / `shadow-lg` / `shadow-xl` / `shadow-2xl` / `shadow-3xl`

### Gap

- `gap-[value]` - Gap (e.g., `gap-[8px]`)
- `gap-[x|y]-[value]` - Axis-specific gap (e.g., `gap-x-[16px]`, `gap-y-[8px]`)

### Animation

- `animate-spin` / `animate-pulse` / `animate-bounce` / `animate-shake` / `animate-wiggle` / `animate-ping`
- `animate-[custom]` - Custom animation
- `duration-[ms]` - Animation duration (e.g., `duration-[500]`)
- `transition-[property]` - Transition property (e.g., `transition-transform`)

### Transform

- `scale-[value]` / `scale-[x|y]-[value]` - Scale transform
- `translate-[value]` / `translate-[x|y]-[value]` - Translate transform
- `rotate-[value]` / `rotate-[x|y]-[value]` - Rotate transform

### Effects

- `opacity-[value]` - Opacity (e.g., `opacity-[80]` → 0.8)
- `cursor-[value]` - Cursor style (e.g., `cursor-pointer`)
- `select-[value]` - Text selection (e.g., `select-none`)
- `pointer-events-[value]` - Pointer events (e.g., `pointer-events-none`)
- `resize-[value]` - Resizable (e.g., `resize-both`)
- `contain-[value]` - Containment (e.g., `contain-strict`)
- `will-change-[value]` - Will change (e.g., `will-change-transform`)

### Aspect Ratio

- `aspect-auto` / `aspect-square` / `aspect-video`
- `aspect-[ratio]` - Custom ratio (e.g., `aspect-[16/9]`)

## 📖 API Documentation

### `lightCSS(options?: LightCSSOptions)`

Creates and returns a LightCSS instance.

**Parameters:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rules` | `IRule[]` | `[]` | Custom rules array |
| `prefix` | `string` | `''` | Class name prefix |
| `useInnerHTML` | `boolean` | `false` | Use innerHTML for style injection |
| `defaultRules` | `boolean` | `true` | Enable built-in default rules |
| `throttleDelay` | `number` | `16` | Throttle delay in ms |
| `noLogger` | `boolean` | `false` | Disable logger output |

**Returns:** `LightCSS` instance

### `LightCSS Class`

#### Methods

- `destroy()` - Destroys the instance and cleans up all associated resources

## 📂 Project Structure

```
light-css/
├── src/
│   ├── core/          # Core classes (LightCSS, etc.)
│   ├── rules/         # Rule definitions and utilities
│   ├── utils/         # Utility functions
│   ├── constants.ts   # Project constants
│   └── index.ts       # Main entry point
├── examples/          # Example usage
├── dist/              # Built output
├── package.json
└── vite.config.ts
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Lint
pnpm run lint
```

## 🌐 Browser Compatibility

Supports all modern browsers:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 License

MIT License

## 🤝 Contribution

Issues and Pull Requests are welcome!

## 🔖 Version History

### v1.0.17 (Current)
- Optimized CSSStyleSheet handling with fallback to innerHTML
- Improved Performance with better throttling

### v1.0.15
- Change default rules

### v1.0.14
- Optimize code execution performance
- Added option to turn off debug logs (`noLogger?: boolean`)

### v1.0.13
- Add constants and regex constants

### v1.0.11
- Fix SVG element judgment error

### v1.0.10
- Added hover/active pseudo-class support

### v1.0.8
- Added throttle handling for style generation with `throttleDelay: number`

### v1.0.7
- Added pseudo-class selectors `hover:rule` and `active:rule`

### v1.0.5
- Updated documentation and optimized known issues

### v1.0.0
- Initial release
- Implemented basic class name to CSS conversion functionality
- Supported a variety of commonly used style rules
- Provided TypeScript type definitions

## 💡 Examples

See the [examples directory](./examples/main.ts) for more usage examples.

```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] round-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">Hello Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">
    This is a lightweight CSS utility library that dynamically generates 
    and applies CSS styles via class names.
  </p>
  <button class="mt-[10px] pl-[16px] pr-[16px] pt-[8px] pb-[8px] 
      bg-[#007bff] text-[#fff] round-[4px] hover:bg-[#0069d9]">
    Click Me
  </button>
</div>
```
