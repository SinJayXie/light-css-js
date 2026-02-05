declare interface IRule {
    regex: ((name: string) => string | boolean) | RegExp;
    handler: (val: string, match: Array<string>) => Record<string, string> | null;
    priority?: number;
}

export declare class LightCSS {
    private readonly ob;
    private readonly classMap;
    private readonly style;
    private readonly rules;
    private readonly parentClass;
    private readonly insertMode;
    private readonly cacheClassName;
    private readonly config;
    private sheet;
    private lastUpdateTime;
    version: string;
    constructor(opt: LightCSSOptions);
    private addCache;
    /**
     * Process newly added element nodes
     * @param addedNodes List of nodes added to the DOM
     * @private
     */
    private processAddedNodes;
    /**
     * Process changes to the class attribute
     * @param mutation MutationRecord containing class attribute change info
     * @private
     */
    private processClassPatch;
    /**
     * Generate styles from cached class names
     * @private
     */
    private createStyle;
    /**
     * Handle MutationObserver events
     * @param mutations Array of MutationRecords from the observer
     * @private
     */
    private handler;
    /**
     * Destroy the LightCSS instance and clean up resources
     */
    destroy(): void;
    /**
     * Initialize the LightCSS instance
     * @param isAppendDefault Whether to include default style rules
     * @private
     */
    private init;
}

export declare function lightCSS(opt?: LightCSSOptions): LightCSS;

declare interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
    throttleDelay?: number;
    noLogger?: boolean;
}

export { }
