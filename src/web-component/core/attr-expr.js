import Expr from './expr';

export default class AttrExpr extends Expr {
  constructor(element, name, vPattern) {
    super();
    this.el = element;
    this.name = name;
    this.vPattern = vPattern;
  }

  update(value) {
    const {
      v, el, name, vPattern,
    } = this;
    // console.log('name:', name, v, value, vPattern);
    if (value !== v) {
      // console.log('el:', el, name, ',value:', value);
      if (name === 'style' && typeof value === 'object') {
        Object.keys(value).forEach((key) => {
          if (el.style[key] !== value[key]) {
            el.style[key] = value[key];
          }
        });
      } else {
        el.setAttribute(name, vPattern.replace('{}', value));
      }
      super.update(value);
    }
  }
}
