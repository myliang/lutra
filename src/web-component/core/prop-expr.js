import Expr from './expr';

function setElementProp(el, name, value) {
  if (el.$props === undefined) el.$props = {};
  el.$props[name.replace(/-[a-z]/g, c => c[1].toUpperCase())] = value;
}

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
    } else if (name === 'value' && el.nodeName.toUpperCase() === 'TEXTAREA') {
      if (value) el.value = value;
    } else if (v !== value) {
      setElementProp(el, name, value);
      super.update(value);
    }
  }

  static setElementProp(el, name, value) {
    setElementProp(el, name, value);
  }
}
