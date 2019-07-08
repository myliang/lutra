/* global window, HTMLElement, CustomEvent */
import Template from './template';
import NodeExpr from './node-expr';
import TemplateExpr from './template-expr';
import {
  bind,
  unbind,
  bindClickoutside,
  unbindClickoutside,
  mouseMoveUp,
  offset,
} from './helper';

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
export function component(name) {
  return (target) => {
    // in last line
    window.customElements.define(name, target);
  };
}

export function element(cssSelector) {
  if (this.$refs === undefined) {
    this.$refs = {};
  }
  if (this.$refs[cssSelector] === undefined) {
    this.$refs[cssSelector] = this.querySelector(cssSelector);
  }
  return this.$refs[cssSelector];
}

export class BaseElement extends HTMLElement {
  $props = {};

  change = (v) => {
    this.dispatchEvent(new CustomEvent('change', { detail: { v } }));
  };

  update() {
    const r = this.render();
    render(r, this);
  }

  setOffset(v) {
    offset.call(this, v);
  }

  render() {}

  // connectedCallback
  connectedCallback() {
    this.update();
  }
  // disconnectedCallback
  // adoptedCallback() { }

  // name, oldValue, newValue
  // attributeChangedCallback(name, oval, nval) {}
}

export {
  bind,
  unbind,
  bindClickoutside,
  unbindClickoutside,
  mouseMoveUp,
};
