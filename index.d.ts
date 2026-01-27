export declare interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string>;
}

export declare class LightCSS {
    constructor(rules?: IRule[])
    destroy(): void
}

export declare function lightCSS(opt?: LightCSSOptions): LightCSS

export declare interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
}

export { }
