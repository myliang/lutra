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
    if (value !== v) {
      // console.log('el:', el, ',value:', value);
      el.setAttribute(name, vPattern.replace('{}', value));
      super.update(value);
    }
  }
}
