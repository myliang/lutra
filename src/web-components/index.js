/* global window, CSSStyleSheet, HTMLElement, CustomEvent */
import Template from './template';
import NodeExpr from './node-expr';
import TemplateExpr from './template-expr';

// const stringsCache = new Map();
NodeExpr.getTemplateExpr = strings => new TemplateExpr(strings);

// cache
const containerCache = new Map();
// gobal methods
export function html(strings, ...values) {
  return new Template(strings, ...values);
}

export function render(template, container) {
  let root = containerCache.get(container);
  if (root === undefined) {
    root = NodeExpr.root(container);
    containerCache.set(container, root);
  }
  root.update(template);
}

// decorators
// customElements.define('xfd-color-palette', ColorPalette);
export function component(name, style, attrs = []) {
  return (target) => {
    target.$style = style;
    target.$attrs = attrs;
    // console.log('target::::::', target.$attrs);
    attrs.forEach((attr) => {
      // console.log('::::', target.prototype);
      Object.defineProperty(target.prototype, attr, {
        get() {
          // console.log('name.value:', this.getAttribute(attr));
          return this.getAttribute(attr);
        },
        configurable: true,
        enumerable: true,
      });
    });
    // in last line
    window.customElements.define(name, target);
  };
}

export class BaseElement extends HTMLElement {
  onChange = (e, v) => {
    this.dispatchEvent(new CustomEvent('change', {
      detail: [e, v],
    }));
  };

  constructor() {
    super();
    // this.change = () => {};
    // console.log('constructor:', this);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = this.constructor.getStyleSheets();
    this.update();
  }

  update() {
    const r = this.render();
    // console.log('r:', r);
    render(r, this.shadowRoot);
  }

  render() {}

  // connectedCallback
  // disconnectedCallback
  // adoptedCallback

  // name, oldValue, newValue
  attributeChangedCallback(name, oval, nval) {
    // console.log(this, 'attributeChangedCallback:', oval, nval);
    if (nval !== null && nval !== '{}') {
      this.update();
    }
  }

  static get observedAttributes() {
    // console.log(':attrs:', this, this.$attrs);
    return this.$attrs || [];
  }

  static getStyleSheets() {
    const { $style } = this;
    if ($style) {
      // console.log('style:', style);
      const cssStyle = new CSSStyleSheet();
      cssStyle.replaceSync($style);
      // console.log('css:style', cssStyle);
      return [cssStyle];
    }
    return [];
  }
}
