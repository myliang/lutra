import Expr from './expr';
import { equals } from './helper';

function setElementProp(el, name, value) {
  if (el.$props === undefined) el.$props = {};
  el.$props[name.replace(/-[a-z]/g, c => c[1].toUpperCase())] = value;
  // if (el.update) el.update();
}

export default class PropExpr extends Expr {
  constructor(element, name) {
    super();
    this.el = element;
    this.name = name;
  }

  update(value) {
    const { v, el, name } = this;
    if (value !== undefined && !equals(v, value)) {
      // console.log('name:', name, value, el);
      if (name === 'show') {
        el.style.display = value === true ? 'block' : 'none';
      } else if (name === 'scroll') {
        const { left, top } = value;
        if (left !== undefined) el.scrollLeft = left;
        if (top !== undefined) el.scrollTop = top;
      } else if (name === 'html') {
        el.innerHTML = value;
      } else if (name === 'value' && el.nodeName.toUpperCase() === 'TEXTAREA') {
        el.value = value;
      } else {
        setElementProp(el, name, value);
      }
      const flag = v !== undefined;
      super.update(value);
      return flag;
    }
    return false;
  }

  static setElementProp(el, name, value) {
    setElementProp(el, name, value);
  }
}
