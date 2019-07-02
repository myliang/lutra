/* global window, CSSStyleSheet, HTMLElement */
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
    // console.log('target::::::', target);
    window.customElements.define(name, target);
    target.$style = style;
    target.$attrs = attrs;
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
  };
}

/*
export function attr(target, name, descriptor) {
  // console.log('target:>', target, descriptor);
  const clazz = target.constructor;
  if (!clazz.hasOwnProperty('_attrs')) {
    clazz._attrs = [];
  }
  clazz._attrs.push(name);
  // descriptor.get = () => target.getAttribute(name);
  // target.constructor.attrs.push(name);
  // console.log('name:', target, name);
  Object.defineProperty(target, name, {
    get() {
      // console.log('name.value:', this.getAttribute(name));
      return this.getAttribute(name);
    },
    configurable: true,
    enumerable: true,
  });
}
*/

export class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.change = () => {};
    // console.log('constructor:', this.constructor.style);
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.adoptedStyleSheets = this.constructor.getStyleSheets();
    this.update();
  }

  update() {
    const r = this.render();
    // console.log('r:', r);
    render(r, this.shadow);
  }

  render() {}

  // connectedCallback
  // disconnectedCallback
  // adoptedCallback

  // name, oldValue, newValue
  attributeChangedCallback() {
    // console.log('name:', name, ', oldValue:', oval, ', newValue:', nval);
    this.update();
  }

  static get observedAttributes() {
    // console.log(':attrs:', this, this._attrs);
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
