/* global window */
import BaseComponent from './base-component';
import h from '../dom/create-element';
import { mouseMoveUp } from '../dom/event';
import { cssPrefix } from '../config';

function mousedownHandler() {
  // let sEvt = evt;
  const {
    el, type, value,
  } = this;
  const [, lineEl] = el.children;
  let distance = 0;
  lineEl.show();
  mouseMoveUp(window, (e) => {
    this.moving = true;
    const { buttons, movementX, movementY } = e;
    if (buttons === 1) {
      if (type === 'row') {
        distance += movementY;
      } else if (type === 'col') {
        distance += movementX;
      }
      this.update(value + distance);
      // sEvt = e;
    }
  }, () => {
    this.moving = false;
    this.hide();
    this.change(distance);
  });
}

export default class Resizer extends BaseComponent {
  moving = false;

  // type: row | col
  // value: resize value
  constructor(type, minValue) {
    super(0);
    this.type = type;
    this.minValue = minValue;
  }

  render() {
    const { type } = this;
    return h(`.${cssPrefix}-resizer ${type}`,
      h(`.${cssPrefix}-resizer-hover`)
        .on('mousedown.stop', evt => mousedownHandler.call(this, evt)),
      h(`.${cssPrefix}-resizer-line`).hide()).hide();
  }

  hide() {
    this.el.hide();
  }

  // value: the top or left of value
  // hv: the width or height of hovering element
  update(value, hv) {
    const { el, minValue, type } = this;
    if (value < minValue) return;
    super.update(value);
    const [hoverEl] = el.children;
    if (type === 'row') {
      el.css('top', value);
      if (hv) hoverEl.css('width', hv);
    } else if (type === 'col') {
      el.css('left', value);
      if (hv) hoverEl.css('height', hv);
    }
    el.show();
  }
}
