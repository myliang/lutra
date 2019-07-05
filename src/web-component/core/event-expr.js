/* global window */
import Expr from './expr';

export default class EventExpr extends Expr {
  bindHandler = (e) => {
    const { v, actions, el } = this;
    actions.forEach((action) => {
      if (action === 'stop') {
        e.stopPropagation();
      } else if (action === 'prevent') {
        e.preventDefault();
      }
    });
    if (this.isClickoutside) {
      // console.log('::::::::::el:', el, e);
      if (el.style.display === 'block') {
        v(e, e.detail);
      }
    } else {
      v(e, e.detail);
    }
  };

  // name: eventName.stop | prevent
  constructor(element, name) {
    super();
    const [ename, ...actions] = name.split('.');
    this.el = element;
    this.name = ename;
    this.actions = actions;
  }

  get isClickoutside() {
    return this.name === 'clickoutside';
  }

  get evtName() {
    return this.isClickoutside ? 'click' : this.name;
  }

  update(value) {
    const { v, el, evtName } = this;
    const target = this.isClickoutside ? window : el;
    // console.log('value:', value, ', v:', v);
    if (v && v !== value) {
      target.removeEventListener(evtName, this.bindHandler);
    }
    if (v === undefined || v !== value) {
      target.addEventListener(evtName, this.bindHandler);
      if (this.isClickoutside) {
        el.addEventListener('click', e => e.stopPropagation());
      }
      super.update(value);
    }
  }
}
