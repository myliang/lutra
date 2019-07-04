import Expr from './expr';

export default class PropExpr extends Expr {
  constructor(element, name) {
    super();
    this.el = element;
    this.name = name;
  }

  update(value) {
    const { v, el, name } = this;
    if (name === 'show') {
      el.style.display = value === true ? 'block' : 'none';
    }
    if (v !== value) {
      el.$props[name.replace(/-[a-z]/g, c => c[1].toUpperCase())] = value;
      super.update(value);
    }
  }
}
