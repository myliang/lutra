import {
  BaseElement, bindClickoutside, unbindClickoutside,
} from './core';

export function onShow() {
  return () => {
    this.$visible = !this.$visible;
    if (this.$visible) {
      bindClickoutside(this, onShow.call(this));
      this.classList.add('active');
    } else {
      unbindClickoutside(this);
      this.classList.remove('active');
    }
    this.update();
  };
}

export function onChange(v) {
  return (evt) => {
    this.change(evt, v);
    onShow.call(this)();
  };
}

export class Dropdown extends BaseElement {
  $visible = false;
}
