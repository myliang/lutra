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
      if (name === 'style' && typeof value === 'object') {
        // console.log('el:', el, name, ',value:', value);
        Object.keys(value).forEach((key) => {
          if (el.style[key] !== value[key]) {
            const v1 = value[key];
            el.style[key] = typeof v1 === 'string' ? v1 : `${v1}px`;
          }
        });
      } else {
        el.setAttribute(name, vPattern.replace('{}', value));
      }
      super.update(value);
      return true;
    }
    return false;
  }
}
