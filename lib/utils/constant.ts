import { version } from '../../package.json' with {type: 'json'};

export const Constant = {
  VERSION: version,
  NEWLINE: '\n',
  INSTANCE: 'LightCSS:INSTANCE',
  LIBRARY_NAME: 'light-css.js',
  COLOR_SCHEMA: new Set(['red', 'green', 'blue', 'black', 'white', 'gray', 'lightgray', 'darkgray', 'silver', 'maroon', 'yellow', 'orange', 'pink', 'purple', 'brown', 'cyan', 'teal', 'navy', 'aqua', 'fuchsia', 'lime', 'olive', 'magenta', 'skyblue', 'lightpink'])
} as const;
