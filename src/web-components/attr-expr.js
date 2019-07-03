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
      if (name === 'show') {
        el.style.display = value === true ? 'block' : 'none';
      } else {
        el.setAttribute(name, vPattern.replace('{}', value));
      }
      super.update(value);
    }
  }
}
