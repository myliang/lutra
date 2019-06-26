import Expr from './expr';

export default class EventExpr extends Expr {
  // name: eventName.stop | prevent
  constructor(element, name) {
    super();
    const { ename, ...actions } = name.split('.');
    this.el = element;
    this.name = ename;
    this.actions = actions;
  }

  update(value) {
    const { v, el, name } = this;
    if (v && v !== value) {
      el.removeEventListener(name, this.bindHandler);
    }
    if (v === undefined || v !== value) {
      el.addEventListener(name, this.bindHandler);
      super.update(value);
    }
  }

  bindHandler(e) {
    const { v, actions } = this;
    actions.forEach((action) => {
      if (action === 'stop') {
        e.stopPropagation();
      } else if (action === 'prevent') {
        e.preventDefault();
      }
    });
    v(e);
  }
}
