export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string>;
}

export interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
}

export class LightCSS {
  constructor(rules?: IRule[])
  destroy(): void
}

export function lightCSS(opt?: LightCSSOptions): LightCSS
