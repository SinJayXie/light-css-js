declare interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null;
}

export declare class LightCSS {
    version: string;
    constructor(opt: LightCSSOptions);
    destroy(): void;
}

export declare function lightCSS(opt?: LightCSSOptions): LightCSS;

declare interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
    throttleDelay?: number;
}

export { }
