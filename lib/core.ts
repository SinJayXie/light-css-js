import { extractClassFromDom, throttleWithMerge } from './utils';
import { buildStyle, createStyle } from './utils/create-style.ts';
import { defaultRules, IRule } from './utils/rules.ts';
import { REGEX } from './utils/regex-map.ts';
import { Constant } from './utils/constant.ts';

const cacheApp = new WeakSet();
const br = Constant.NEWLINE;
const LIGHT_CSS_INSTANCE_KEY = Symbol.for(Constant.INSTANCE);
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

  public version: string = Constant.VERSION;

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
    this.rules = [...this.config.rules || []]; // Import user-defined rules
    this.parentClass = this.config.prefix || '';
    this.lastUpdateTime = performance.now();
    this.init(this.config.defaultRules);
  }

  private addCache(arr: string[]) {
    arr.forEach(v => this.cacheClassName.add(v));
    return this;
  }

  /**
   * Process newly added element nodes
   * @param addedNodes List of nodes added to the DOM
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
   * Process changes to the class attribute
   * @param mutation MutationRecord containing class attribute change info
   * @private
   */
  private processClassPatch(mutation: MutationRecord) {
    const { target } = mutation;
    if (target.nodeType === Node.ELEMENT_NODE) {
      const t = target as Element;
      this.addCache(t.classList.value.split(REGEX.SPACE));
    }
  }

  /**
   * Generate styles from cached class names
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

      const taskCall = () => {
        if (this.insertMode === INSERT_MODE.HTML) {
          this.style.innerHTML += styleRules.join(br) + br;
        } else {
          try {
            styleRules.forEach(rule => {
              this.sheet.insertRule(rule);
            });
          } catch (e) {
            console.warn(`[LightCSS] Warning: call to "insertRule()" failed. Using "innerHTML" to append styles instead.`);
            console.error(e);
            this.style.innerHTML += styleRules.join(br); // Fallback if insertRule fails
          }
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(taskCall, { timeout: 16 });
      } else {
        setTimeout(taskCall, 0);
      }
    }
  }

  /**
   * Handle MutationObserver events
   * @param mutations Array of MutationRecords from the observer
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
   * Destroy the LightCSS instance and clean up resources
   */
  public destroy() {
    this.ob.disconnect();
    this.style.remove();
    this.cacheClassName.clear();
    this.classMap.clear();
    cacheApp.delete(this);
  }

  /**
   * Initialize the LightCSS instance
   * @param isAppendDefault Whether to include default style rules
   * @private
   */
  private init(isAppendDefault?: boolean) {
    if (isAppendDefault) this.rules.push(...defaultRules());
    this.style.setAttribute('type', 'text/css');
    this.style.setAttribute('data-plugin-name', Constant.LIBRARY_NAME);
    console.log('[LightCSS] Initialized successfully | version: %s', this.version);
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
