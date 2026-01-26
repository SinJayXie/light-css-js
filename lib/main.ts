import { LightCSS, LightCSSOptions } from './core.ts';

export function lightCSS(opt?:LightCSSOptions) {
  return new LightCSS(opt || {});
}
export { LightCSS };
