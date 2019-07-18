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
    const { el, name } = this;
    let { v } = this;
    const nodeName = el.nodeName.toUpperCase();
    // if (name === 'value') console.log('nodeName:', nodeName);
    const isInputValue = name === 'value' && (nodeName === 'TEXTAREA' || nodeName === 'INPUT');
    if (isInputValue) {
      // console.log('::::', el.value, ':, nodeName:', nodeName);
      v = el.value;
    }
    if (!equals(v, value)) {
      // console.log('name:', name, v, value, el);
      if (name === 'show') {
        el.style.display = value === true ? 'block' : 'none';
      } else if (name === 'scroll') {
        const { left, top } = value;
        if (left !== undefined) el.scrollLeft = left;
        if (top !== undefined) el.scrollTop = top;
      } else if (name === 'html') {
        el.innerHTML = value;
      } else if (isInputValue) {
        el.value = value;
      } else {
        setElementProp(el, name, value);
      }
      super.update(value);
      return true;
    }
    return false;
  }

  static setElementProp(el, name, value) {
    setElementProp(el, name, value);
  }
}
