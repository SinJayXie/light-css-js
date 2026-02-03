import { version } from '../../package.json' with {type: 'json'};

export const Constant = {
  VERSION: version,
  NEWLINE: '\n',
  INSTANCE: 'LightCSS:INSTANCE',
  LIBRARY_NAME: 'light-css.js'
} as const;
