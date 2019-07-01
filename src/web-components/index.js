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
    customElements.define(name, target);
    target.style = style;
  };
}

// export function css(strings, ...vs) {
  // const cssText = vs.reduce((prev, v, i) => `${prev}${v}${strings[i + 1]}`, strings[0]);
  // return new CSSResult(cssText, 
// }

export class BaseElement extends HTMLElement{
  constructor() {
    super();
    this.change = () => {};
    // console.log('constructor:', this.constructor.style);
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = this.constructor.getStyleSheets();
    render(this.render(), shadow);
  }

  render() {}

  static getStyleSheets() {
    const { style } = this;
    if (style) {
      // console.log('style:', style);
      const cssStyle = new CSSStyleSheet();
      cssStyle.replaceSync(style);
      console.log('css:style', cssStyle);
      return [cssStyle];
    } else {
      return [];
    }
  }
}
