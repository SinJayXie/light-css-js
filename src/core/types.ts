import type { IRule } from '../rules';

export interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
    throttleDelay?: number;
    noLogger?: boolean;
}
