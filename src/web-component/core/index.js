/* global window, HTMLElement, CustomEvent */
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

// event methods
export function bind(target, name, fn) {
  target.addEventListener(name, fn);
}
export function unbind(target, name, fn) {
  target.removeEventListener(name, fn);
}
export function unbindClickoutside(el) {
  if (el.onClickoutside) {
    unbind(window, 'click', el.onClickoutside);
    delete el.onClickoutside;
  }
}
// the left mouse button: mousedown → mouseup → click
// the right mouse button: mousedown → contenxtmenu → mouseup
// the right mouse button in firefox(>65.0): mousedown → contenxtmenu → mouseup → click on window
export function bindClickoutside(el, cb) {
  el.onClickoutside = (evt) => {
    // ignore double click
    // console.log('evt:', evt);
    if (evt.detail === 2 || el.contains(evt.target)) return;
    if (cb) cb(el);
    else {
      el.hide();
      unbindClickoutside(el);
    }
  };
  bind(window, 'click', el.onClickoutside);
}

export function mouseMoveUp(target, movefunc, upfunc) {
  bind(target, 'mousemove', movefunc);
  const t = target;
  t.xEvtUp = (evt) => {
    // console.log('mouseup>>>');
    unbind(target, 'mousemove', movefunc);
    unbind(target, 'mouseup', target.xEvtUp);
    upfunc(evt);
  };
  bind(target, 'mouseup', target.xEvtUp);
}


// decorators
// customElements.define('xfd-color-palette', ColorPalette);
export function component(name, style) {
  return (target) => {
    target.$style = style;
    // target.$attrs = attrs;
    // console.log('target::::::', target.$attrs);
    /*
    attrs.forEach((attr) => {
      // console.log('::::', target.prototype);
      Object.defineProperty(target.prototype, attr.replace(/-[a-z]/g, c => c[1].toUpperCase()), {
        get() {
          // console.log('name.value:', this.getAttribute(attr));
          return this.getAttribute(attr);
        },
        configurable: true,
        enumerable: true,
      });
    });
    */
    // in last line
    window.customElements.define(name, target);
  };
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

  setOffset(offset) {
    ['left', 'top', 'width', 'height'].forEach((key) => {
      if (offset[key]) {
        this.style[key] = `${offset[key]}px`;
      }
    });
  }

  render() {}

  // connectedCallback
  connectedCallback() {
    this.update();
  }
  // disconnectedCallback
  // adoptedCallback

  // name, oldValue, newValue
  attributeChangedCallback(name, oval, nval) {
    // console.log(this, 'attributeChangedCallback:', oval, nval);
    if (nval !== null && nval !== '{}') {
      this.update();
    }
  }

  // static get observedAttributes() {
  //   console.log(':attrs:', this, this.$attrs);
  //   return this.$attrs || [];
  // }

  /*
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
  */
}
