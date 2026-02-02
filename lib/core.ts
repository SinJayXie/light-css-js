import { extractClassFromDom, throttleWithMerge } from './utils';
import { buildStyle, createStyle } from './utils/create-style.ts';
import { defaultRules, IRule } from './utils/rules.ts';

const cacheApp = new WeakSet();
const br = '\n';
const LIGHT_CSS_INSTANCE_KEY = Symbol.for('LightCSS:INSTANCE');
(window as unknown as { [LIGHT_CSS_INSTANCE_KEY]: WeakSet<LightCSS> })[LIGHT_CSS_INSTANCE_KEY] = cacheApp;

export interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
    throttleDelay?: number;
}

enum INSERT_MODE {
    RULE,
    HTML
}

const VERSION = '1.0.9';

export class LightCSS {
  private readonly ob: MutationObserver;
  private readonly classMap: Map<string, Record<string, string>>;
  private readonly style: HTMLStyleElement;
  private readonly rules: IRule[] = [];
  private readonly parentClass: string;
  private readonly insertMode: number;
  private readonly cacheClassName: Set<string>;
  private readonly config: LightCSSOptions;

  private sheet: CSSStyleSheet;
  private lastUpdateTime: number;

  public version = VERSION;

  constructor(opt: LightCSSOptions) {
    this.config = Object.assign<LightCSSOptions, LightCSSOptions>({
      defaultRules: true,
      throttleDelay: 16
    }, opt);
    this.ob = new MutationObserver(throttleWithMerge(this.handler.bind(this), this.config.throttleDelay || 16));
    this.classMap = new Map();
    this.style = document.createElement('style');
    this.sheet = new CSSStyleSheet();
    this.cacheClassName = new Set();
    this.insertMode = this.config.useInnerHTML ? INSERT_MODE.HTML : INSERT_MODE.RULE;
    this.rules = [...this.config.rules || []]; // 导入用户规则
    this.parentClass = this.config.prefix || '';
    this.lastUpdateTime = performance.now();
    this.init(this.config.defaultRules);
  }

  private addCache(arr: string[]) {
    arr.forEach(v => this.cacheClassName.add(v));
    return this;
  }

  /**
     * 处理新添加的元素节点
     * @param addedNodes
     * @private
     */
  private processAddedNodes(addedNodes: NodeList) {
    addedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        this.addCache(extractClassFromDom(node));
      }
    });
  }

  /**
     * 处理 class 属性的变动
     * @param mutation
     * @private
     */
  private processClassPatch(mutation: MutationRecord) {
    const { target } = mutation;
    if (target instanceof HTMLElement) {
      this.addCache(target.className.split(/\s+/));
    }
  }

  /**
     * 创建样式
     * @private
     */
  private createStyle() {
    const lastSize = this.classMap.size;
    const oldKeys = Array.from(this.classMap.keys());
    createStyle(Array.from(this.cacheClassName), this.rules, this.classMap);
    this.cacheClassName.clear();
    if (lastSize < this.classMap.size) {
      const styleRules = buildStyle(this.classMap, oldKeys, this.parentClass);
      console.log(
        '[LightCSS]: Add patch style %d - (%sms)',
        this.classMap.size - lastSize,
        (performance.now() - this.lastUpdateTime).toFixed(5)
      );

      const callback = requestIdleCallback || setTimeout;

      callback(() => {
        if (this.insertMode === INSERT_MODE.HTML) {
          this.style.innerHTML += styleRules.join(br) + br;
        } else {
          try {
            styleRules.forEach(rule => {
              this.sheet.insertRule(rule);
            });
          } catch (e) {
            console.warn(`[LightCSS]：Warning call "insertRule()" fail. Use "innerHTML" append.`);
            console.error(e);
            this.style.innerHTML += styleRules.join(br); // 以防insertRule失败
          }
        }
      });
    }
  }

  /**
     * 监听 MutationObserver
     * @param mutations
     * @private
     */
  private handler(mutations: MutationRecord[]) {
    this.lastUpdateTime = performance.now();
    if (mutations.length > 0) {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) this.processAddedNodes(mutation.addedNodes);
        if (mutation.attributeName === 'class') this.processClassPatch(mutation);
      });
      this.createStyle();
    }
  }

  /**
     * 销毁实例
     */
  public destroy() {
    this.ob.disconnect();
    this.style.remove();
    this.cacheClassName.clear();
    this.classMap.clear();
    cacheApp.delete(this);
  }

  /**
     * 初始化
     * @param isAppendDefault
     * @private
     */
  private init(isAppendDefault?: boolean) {
    if (isAppendDefault) this.rules.push(...defaultRules());
    this.style.setAttribute('type', 'text/css');
    this.style.setAttribute('data-plugin-name', 'light-css.js');
    console.log('[LightCSS] Init successfully version:%s', this.version);
    document.head.appendChild(this.style);
    this.sheet = this.style.sheet!;
    this.ob.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    });
    cacheApp.add(this);
  }
}
