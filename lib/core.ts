import { extractClassFromDom } from './utils';
import { buildStyle, createStyle } from './utils/create-style.ts';
import { defaultRules, IRule } from './utils/rules.ts';

export interface LightCSSOptions {
    rules?: IRule[];
    prefix?: string;
    useInnerHTML?: boolean;
    defaultRules?: boolean;
}

export class LightCSS {
  private readonly ob: MutationObserver;
  private readonly classMap: Map<string, Record<string, string>>;
  private readonly style: HTMLStyleElement;
  private readonly rules: IRule[] = [];
  private readonly parentClass: string;
  private readonly insertMode: number;
  private readonly cacheClassName: Set<string>;

  private sheet: CSSStyleSheet;
  private lastUpdateTime: number;

  public version = '1.0.0';

  constructor(opt: LightCSSOptions) {
    const baseOpt = Object.assign({
      defaultRules: true
    }, opt);
    this.ob = new MutationObserver(this.handler.bind(this));
    this.classMap = new Map();
    this.style = document.createElement('style');
    this.sheet = new CSSStyleSheet();
    this.cacheClassName = new Set();
    this.insertMode = baseOpt.useInnerHTML ? 1 : 2;
    this.rules = [...baseOpt.rules || []]; // 导入用户规则
    this.parentClass = baseOpt.prefix || '';
    this.lastUpdateTime = performance.now();
    this._init(baseOpt.defaultRules);
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
        '[LightCSS]: Add patch style %d - %dms',
        this.classMap.size - lastSize,
        performance.now() - this.lastUpdateTime
      );

      if (this.insertMode === 1) {
        this.style.innerHTML += styleRules.join('\n');
      } else {
        try {
          styleRules.forEach(rule => {
            this.sheet.insertRule(rule);
          });
        } catch (e) {
          console.warn(`[LightCSS]：Warning call "insertRule()" fail. Use "innerHTML" append.`);
          console.error(e);
          this.style.innerHTML += styleRules.join(' '); // 兜底方案，以防insertRule失败
        }
      }
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
  }

  /**
     * 初始化
     * @param isAppendDefault
     * @private
     */
  private _init(isAppendDefault: boolean) {
    if (isAppendDefault) this.rules.push(...defaultRules());
    this.style.setAttribute('type', 'text/css');
    this.style.setAttribute('data-plugin-name', 'light-css.js');
    document.head.appendChild(this.style);
    this.sheet = this.style.sheet!;
    this.ob.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }
}
