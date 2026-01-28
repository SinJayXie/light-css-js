declare interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null;
}

export declare class LightCSS {
    private readonly ob;
    private readonly classMap;
    private readonly style;
    private readonly rules;
    private readonly parentClass;
    private readonly insertMode;
    private readonly cacheClassName;
    private sheet;
    private lastUpdateTime;
    version: string;
    constructor(opt: LightCSSOptions);
    private addCache;
    /**
     * 处理新添加的元素节点
     * @param addedNodes
     * @private
     */
    private processAddedNodes;
    /**
     * 处理 class 属性的变动
     * @param mutation
     * @private
     */
    private processClassPatch;
    /**
     * 创建样式
     * @private
     */
    private createStyle;
    /**
     * 监听 MutationObserver
     * @param mutations
     * @private
     */
    private handler;
    /**
     * 销毁实例
     */
    destroy(): void;
    /**
     * 初始化
     * @param isAppendDefault
     * @private
     */
    private _init;
}

export declare function lightCSS(opt?: LightCSSOptions): LightCSS;

declare interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
}

export { }
