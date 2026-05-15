import { extractClassFromDom, throttleWithMerge } from '../utils';
import { buildStyle, createStyle } from '../utils';
import { defaultRules, rulePrioritySort } from '../rules';
import { Constant } from '../constants';
import { logger } from '../utils';
import type { LightCSSOptions } from './types';

const cacheApp = new WeakSet();
const br = Constant.NEWLINE;
const LIGHT_CSS_INSTANCE_KEY = Symbol.for(Constant.INSTANCE);
(window as unknown as { [LIGHT_CSS_INSTANCE_KEY]: WeakSet<LightCSS> })[LIGHT_CSS_INSTANCE_KEY] = cacheApp;

enum INSERT_MODE {
    RULE,
    HTML
}

export class LightCSS {
  private readonly ob: MutationObserver;
  private readonly classMap: Map<string, Record<string, string>>;
  private readonly style: HTMLStyleElement;
  private readonly rules: ReturnType<typeof rulePrioritySort> = [];
  private readonly parentClass: string;
  private readonly cacheClassName: Set<string>;
  private readonly config: LightCSSOptions;

  private insertMode: number;
  private sheet: CSSStyleSheet;
  private lastUpdateTime: number;

  public version: string = Constant.VERSION;

  constructor(opt: LightCSSOptions) {
    this.config = Object.assign<LightCSSOptions, LightCSSOptions>({
      defaultRules: true,
      throttleDelay: 16,
      noLogger: false
    }, opt);
    this.ob = new MutationObserver(throttleWithMerge(this.handler.bind(this), this.config.throttleDelay || 16));
    this.classMap = new Map();
    this.style = document.createElement('style');
    this.sheet = this.createStyleSheet();
    this.cacheClassName = new Set();
    this.insertMode = this.config.useInnerHTML ? INSERT_MODE.HTML : INSERT_MODE.RULE;
    this.rules.push(...rulePrioritySort(this.config.rules));
    this.parentClass = this.config.prefix || '';
    this.lastUpdateTime = performance.now();
    this.init(this.config.defaultRules);
  }

  private addCache(arr: Set<string> | Array<string> | DOMTokenList) {
    arr.forEach(v => this.cacheClassName.add(v));
    return this;
  }

  private createStyleSheet(): CSSStyleSheet {
    if (typeof CSSStyleSheet === 'undefined') {
      this.insertMode = INSERT_MODE.HTML;
      return null as unknown as CSSStyleSheet;
    }
    try {
      return new CSSStyleSheet();
    } catch {
      this.insertMode = INSERT_MODE.HTML;
      logger.warn('[LightCSS] CSSStyleSheet constructor not available, using legacy API');
      return null as unknown as CSSStyleSheet;
    }
  }

  private processAddedNodes(addedNodes: NodeList) {
    addedNodes.forEach(node => {
      if (node instanceof Element && 'classList' in node) {
        this.addCache(extractClassFromDom(node));
      }
    });
  }

  private processClassPatch(mutation: MutationRecord) {
    const { target } = mutation;
    if (target.nodeType === Node.ELEMENT_NODE) {
      const t = target as Element;
      this.addCache(t.classList);
    }
  }

  private generateStyle() {
    if (this.cacheClassName.size === 0) return;
    const lastSize = this.classMap.size;
    const prevClassMapKeys = new Set(this.classMap.keys());
    createStyle(this.cacheClassName, this.rules, this.classMap);

    this.cacheClassName.clear();

    if (lastSize < this.classMap.size) {
      const { styleRules, injectCss } = buildStyle(this.classMap, prevClassMapKeys, this.parentClass);
      logger.log(
        '[LightCSS]: Add patch style %d - (%sms)',
        this.classMap.size - lastSize,
        (performance.now() - this.lastUpdateTime).toFixed(5)
      );

      const allRules = [...styleRules];
      if (injectCss.length > 0) {
        allRules.unshift(...injectCss);
      }

      const taskCall = () => {
        if (this.insertMode === INSERT_MODE.HTML) {
          this.style.innerHTML += allRules.join(br) + br;
        } else {
          try {
            allRules.forEach(rule => this.sheet.insertRule(rule));
          } catch (e) {
            logger.warn(`[LightCSS] Warning: call to "insertRule()" failed. Using "innerHTML" to append styles instead.`);
            logger.error(e);
            this.style.innerHTML += allRules.join(br);
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

  private handler(mutations: MutationRecord[]) {
    this.lastUpdateTime = performance.now();
    if (mutations.length === 0) return;
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) this.processAddedNodes(mutation.addedNodes);
      if (mutation.attributeName === 'class') this.processClassPatch(mutation);
    });
    this.generateStyle();
  }

  public destroy() {
    this.ob.disconnect();
    this.style.remove();
    this.cacheClassName.clear();
    this.classMap.clear();
    cacheApp.delete(this);
  }

  private init(isAppendDefault?: boolean) {
    if (isAppendDefault) this.rules.push(...defaultRules());
    if (this.config.noLogger) logger.enabled = false;
    this.style.setAttribute('type', 'text/css');
    this.style.setAttribute('data-plugin-name', Constant.LIBRARY_NAME);
    logger.log('[LightCSS] Initialized successfully | version: %s', this.version);
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
