export interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string>;
}

export class LightCSS {
  constructor(rules?: IRule[])
  destroy(): void
}

export function lightCSS(): LightCSS
