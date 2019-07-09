/* global window */
import Expr from './expr';

function eventCallback(e, cb) {
  // console.log('e:', e);
  const { v } = e.detail || {};
  if (v !== undefined) cb(v, e);
  else cb(e);
}

export default class EventExpr extends Expr {
  bindHandler = (e) => {
    const { v, actions, el } = this;
    // console.log('>>>evt:', e, v, this.isClickoutside, this);
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
        eventCallback(e, v);
      }
    } else {
      eventCallback(e, v);
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
    if (v && v !== value) {
      target.removeEventListener(evtName, this.bindHandler);
    }
    if (v === undefined || value !== v) {
      // console.log('value:', value, ', v:', v);
      target.addEventListener(evtName, this.bindHandler);
      if (this.isClickoutside) {
        el.addEventListener('click', e => e.stopPropagation());
      }
      super.update(value);
    }
    return false;
  }
}
