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
    // console.log(name, ' oldValue:', v, ', newValue:', value, v !== value);
    if (value !== undefined && v !== value) {
      if (name === 'show') {
        el.style.display = value === true ? 'block' : 'none';
      } else if (name === 'html') {
        el.innerHTML = value;
      } else if (name === 'value' && el.nodeName.toUpperCase() === 'TEXTAREA') {
        el.value = value;
      } else if (v !== value) {
        setElementProp(el, name, value);
      }
      super.update(value);
    }
  }

  static setElementProp(el, name, value) {
    setElementProp(el, name, value);
  }
}
