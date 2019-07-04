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
  $props = new Proxy({}, {
    set(obj, prop, value) {
      obj[prop] = value;
      return true;
    },
  });

  $state = new Proxy({}, {
    get(obj, prop) {
      // console.log('getter->obj:', obj, prop, obj[prop]);
      if (prop.startsWith('set') && obj[prop] === undefined) {
        return (v) => {
          const p = prop.slice(3).replace(/^[A-Z]/, c => c[0].toLowerCase());
          obj[p] = v;
        };
      }
      return obj[prop];
    },
  });

  change = (e, v) => {
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
  }

  update() {
    const r = this.render();
    render(r, this.shadowRoot);
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
