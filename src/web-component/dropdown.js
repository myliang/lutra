import {
  BaseElement, bindClickoutside, unbindClickoutside,
} from './core';

export function onShow() {
  this.$visible = !this.$visible;
  if (this.$visible) {
    bindClickoutside(this, onShow.bind(this));
    this.classList.add('active');
  } else {
    unbindClickoutside(this);
    this.classList.remove('active');
  }
  this.update();
}

export function onChange(...args) {
  this.change(...args);
  onShow.call(this);
}

export class Dropdown extends BaseElement {
  $visible = false;
}
