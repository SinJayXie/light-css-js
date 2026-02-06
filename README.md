# Light CSS
A lightweight CSS utility library that dynamically generates and applies CSS styles via class names. It delivers a development experience similar to Tailwind CSS, while being more lightweight and flexible.

## Features
- **Lightweight**: Minimal core codebase with only essential functionality included
- **Dynamic Generation**: Generates CSS styles on the fly based on class names, no precompilation required
- **Flexible Configuration**: Supports custom rules and class name prefixes

## Project Repository
[light-css-js](https://github.com/sinjayxie/light-css-js.git)

## Installation
```bash
# Using npm
npm install light-css-js

# Using yarn
yarn add light-css-js

# Using pnpm
pnpm add light-css-js
```

## Quick Start
### Basic Usage
```javascript
import { lightCSS } from 'light-css-js';

// Initialize
const css = lightCSS();

// Destroy when needed
// css.destroy();
```

### Configuration Options
```javascript
import { lightCSS } from 'light-css-js';

// CDN Import
// lightCSS.lightCSS({...})

// Initialize with configuration
const css = lightCSS({
  // Custom rules
  rules: [],
  // Class name prefix
  prefix: 'lc-app',
  // Insert styles using innerHTML
  useInnerHTML: false,
  // Use default built-in rules
  defaultRules: true,
  // Throttle delay for style generation
  throttleDelay: 16,
  // Turn off logger
  noLogger: false,
});
```

## Supported Default Class Name Rules
### Text Styles
- `text-[value]` - Set font size, text color or text alignment
  - `text-[16px]` - Set font size to 16px (supports valid pixel units only)
  - `text-[#ff0000]` - Set text color to red (supports valid color values)
  - `text-[left]` / `text-[center]` / `text-[right]` / `text-[justify]` / `text-[start]` / `text-[end]` - Set text alignment

### Shadow Styles
- `shadow-[value]-[color]` - Set box shadow (0 0 [value] [color])
  - `shadow-[4px]-[#00000033]` - Set box shadow to `0 0 4px rgba(0, 0, 0, 0.2)` (supports valid pixel units for value and valid color values for color)

### Spacing (Padding & Margin)
- `p-[value]` / `m-[value]` - Set padding/margin (supports valid pixel units only)
  - `p-[10px]` - Set padding to 10px
  - `m-[10px]` - Set margin to 10px
- `pl-[value]` / `pr-[value]` / `pt-[value]` / `pb-[value]` - Left/right/top/bottom padding
  - `pt-[5px]` - Set top padding to 5px
- `ml-[value]` / `mr-[value]` / `mt-[value]` / `mb-[value]` - Left/right/top/bottom margin
  - `mb-[8px]` - Set bottom margin to 8px

### Sizing & Positioning
- `w-[value]` - Width (supports valid pixel units only)
  - `w-[100px]` - Set width to 100px
- `h-[value]` - Height (supports valid pixel units only)
  - `h-[200px]` - Set height to 200px
- `lh-[value]` - Line height (supports valid pixel units only)
  - `lh-[24px]` - Set line height to 24px
- `miw-[value]` - Min-width (supports valid pixel units only)
  - `miw-[300px]` - Set min-width to 300px
- `mih-[value]` - Min-height (supports valid pixel units only)
  - `mih-[200px]` - Set min-height to 200px
- `maw-[value]` - Max-width (supports valid pixel units only)
  - `maw-[800px]` - Set max-width to 800px
- `mah-[value]` - Max-height (supports valid pixel units only)
  - `mah-[600px]` - Set max-height to 600px
- `l-[value]` / `r-[value]` / `t-[value]` / `b-[value]` - Left/right/top/bottom offset (supports valid pixel units only)
  - `l-[10px]` - Set left offset to 10px
- `inset-[value]` - Inset (supports valid pixel units only)
  - `inset-[5px]` - Set inset to 5px
- `round-[value]` - Border radius (supports valid pixel units only)
  - `round-[4px]` - Set border radius to 4px
- `gap-[value]` - Gap (supports valid pixel units only)
  - `gap-[8px]` - Set gap to 8px
- `flex-[value]` - Flex (supports valid pixel units only)
  - `flex-[1]` - Set flex to 1

### Display
- `disp-[value]` - Set display mode
  - `disp-[flex]` - Enable flex layout
  - `disp-[none]` - Hide the element
  - Supported values: none, block, inline, inline-block, flex, grid, inline-flex, inline-grid, table, table-cell, table-row, table-column, flow, flow-root, contents, unset

### Z-index
- `z-[value]` - Set z-index
  - `z-[99]` - Set z-index to 99
  - `z-[auto]` - Set z-index to auto
  - Note: Square brackets will be automatically removed (e.g., `z-[[100]]` → `z-index: 100`)

### Overflow
- `overflow-[value]` - Set overflow
  - `overflow-[hidden]` - Set overflow to hidden
- `overflow-x-[value]` / `overflow-y-[value]` - Set overflow-x/overflow-y
  - `overflow-x-[scroll]` - Set overflow-x to scroll
  - Supported values: auto, hidden, clip, visible, scroll

### Line Clamp
- `line-clamp-[number]` - Limit text to a specific number of lines
  - `line-clamp-[2]` - Limit text to a maximum of 2 lines (automatically sets overflow: hidden and WebKit box properties)

### Background Styles
- `bg-[value]` - Set background color (supports valid color values)
  - `bg-[#f0f0f0]` - Set background color to light gray
- `bg-img-[value]` - Set background image
  - `bg-img-[url(image.jpg)]` - Set background image to image.jpg
- `bg-clip-[value]` - Set background-clip (underscores in value are converted to spaces)
  - `bg-clip-[content-box]` - Set background-clip to "content box"
- `bg-origin-[value]` - Set background-origin (underscores in value are converted to spaces)
  - `bg-origin-[padding-box]` - Set background-origin to "padding box"
- `bg-pos-[value]` - Set background-position (underscores in value are converted to spaces)
  - `bg-pos-[center_center]` - Set background-position to "center center"
- `bg-repeat-[value]` - Set background-repeat (underscores in value are converted to spaces)
  - `bg-repeat-[no-repeat]` - Set background-repeat to "no repeat"
- `bg-size-[value]` - Set background-size (underscores in value are converted to spaces)
  - `bg-size-[cover]` - Set background-size to cover

## Example
```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] round-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">Hello Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">This is a lightweight CSS utility library that dynamically generates and applies CSS styles via class names.</p>
  <button class="mt-[10px] pl-[16px] pr-[16px] pt-[8px] pb-[8px] bg-[#007bff] text-[#fff] round-[4px] hover:bg-[#0069d9]">
    Click Me
  </button>
</div>
```

## Custom Rules
You can add custom rules via the configuration options:
```javascript
import { lightCSS } from 'light-css-js';

const css = lightCSS({
  rules: [
    {
      // Custom rule: color-[value]
      regex: /^color-\[(.*)]$/, // Supports Function (classStr: string) => Boolean | Match string (passed as the first parameter to handler(val))
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

## API Documentation
### lightCSS Function
Creates and returns a LightCSS instance.

**Parameters**:
- `options` (optional): Configuration object
  - `rules` (optional): Array of custom rules
  - `prefix` (optional): Class name prefix
  - `useInnerHTML` (optional): Whether to insert styles using innerHTML
  - `defaultRules` (optional): Whether to enable built-in default rules
  - `noLogger` (optional): Whether to close the log

**Return Value**:
- LightCSS instance

### LightCSS Class
#### Methods
- `destroy()`: Destroys the instance and cleans up all associated resources

## Browser Compatibility
Supports all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

## Development
### Local Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## License
MIT License

## Contribution
Issues and Pull Requests are welcome!

## Version History

### v1.0.14
- Optimize code execution performance
- Added option to turn off debug logs (`noLogger?: boolean`)

### v1.0.13
- Add constants and regex constants

### v1.0.11
- Fix SVG element judgment error

### v1.0.10
- Added hover/active pseudo-class support
```html
<div class="text-[#333] hover:text-[red] active:text-[blue]">
  New Hover & Active Pseudo-classes
</div>
```

### v1.0.8
- Added throttle handling for style generation with `throttleDelay: number`

### v1.0.7
- Added pseudo-class selectors `hover:rule` and `active:rule` (e.g., `hover:text-[red]`, `active:text-[green]`)

### v1.0.5
- Updated documentation and optimized known issues

### v1.0.0
- Initial release
- Implemented basic class name to CSS conversion functionality
- Supported a variety of commonly used style rules
- Provided TypeScript type definitions
