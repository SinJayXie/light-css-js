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
  prefix: 'lc-',
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
- `text-[value]` - Set font size or text color
  - `text-[16px]` - Set font size to 16px
  - `text-[#ff0000]` - Set text color to red
- `text-left` / `text-center` / `text-right` - Text alignment

### Sizing & Spacing
- `w-[value]` - Width
  - `w-[100px]` - Set width to 100px
- `h-[value]` - Height
  - `h-[200px]` - Set height to 200px
- `p-[value]` - Padding
  - `p-[10px]` - Set padding to 10px
- `m-[value]` - Margin
  - `m-[10px]` - Set margin to 10px
- `mt-[value]` / `mb-[value]` / `ml-[value]` / `mr-[value]` - Top/bottom/left/right margin
  - `mt-[5px]` - Set top margin to 5px

### Positioning
- `position-[value]` - Position type
  - `position-absolute` - Set to absolute positioning
- `left-[value]` / `right-[value]` / `top-[value]` / `bottom-[value]` - Position offset
  - `left-[10px]` - Set left offset to 10px

### Borders & Backgrounds
- `border-[value]` - Border style
  - `border-[1px solid #ccc]` - Set 1px solid gray border
- `border-radius-[value]` - Border radius
  - `border-radius-[4px]` - Set border radius to 4px
- `bg-[value]` - Background color
  - `bg-[#f0f0f0]` - Set background color to light gray
- `bg-img-[value]` - Background image
  - `bg-img-[url("image.jpg")]` - Set background image
- `bg-size-[value]` - Background size
  - `bg-size-[cover]` - Set background to cover the container
- `bg-position-[value]` - Background position
  - `bg-position-[center]` - Center the background image

### Flex Layout
- `flex-[value]` - Flex property
  - `flex-[1]` - Set flex to 1
- `justify-[value]` - justify-content
  - `justify-center` - Horizontally center flex items
- `align-[value]` - align-items
  - `align-center` - Vertically center flex items

### Other Common Styles
- `display-[value]` - Display mode
  - `display-[flex]` - Enable flex layout
  - `display-[none]` - Hide the element
- `opacity-[value]` - Opacity
  - `opacity-[0.5]` - Set opacity to 50%
- `cursor-[value]` - Cursor style
  - `cursor-[pointer]` - Set to pointer cursor
- `line-clamp-[value]` - Text line limit
  - `line-clamp-[2]` - Limit text to a maximum of 2 lines

## Example
```html
<div class="w-[200px] h-[200px] bg-[#f0f0f0] p-[20px] rounded-[8px]">
  <h1 class="text-[24px] text-[#333] mb-[10px]">Hello Light CSS</h1>
  <p class="text-[14px] text-[#666] line-clamp-[2]">This is a lightweight CSS utility library that dynamically generates and applies CSS styles via class names.</p>
  <button class="mt-[10px] px-[16px] py-[8px] bg-[#007bff] text-[#fff] rounded-[4px] hover:bg-[#0069d9]">
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
- Added turn off debug log
- noLogger?: boolean

### v1.0.13
- Add constants and regex constants 

### v1.0.11
- Fix SVG element judgment error

### v1.0.10
- Added hover|active pseudo-class support
```html
<div class="color-[#333] hover:color-[red] active:color-[blue]">
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
