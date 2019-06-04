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
    return h(`.${cssPrefix}-resizer.${type}`,
      h(`.${cssPrefix}-resizer-hover`)
        .on('mousedown.stop', evt => mousedownHandler.call(this, evt)),
      h(`.${cssPrefix}-resizer-line`).hide()).hide();
  }

  hide() {
    this.el.hide();
  }

  // value: the top or left of value
  // hv: the width or height of hovering element
  // lv: the width or height of line element
  update(value, hv, lv) {
    const { el, minValue, type } = this;
    // console.log('value:', value, minValue);
    if (value < minValue) return;
    super.update(value);
    const [hoverEl, lineEl] = el.children;
    if (type === 'row') {
      el.offset({ top: value - 5 });
      if (hv) hoverEl.offset({ width: hv });
      if (lv) lineEl.offset({ width: lv });
    } else if (type === 'col') {
      el.offset({ left: value - 5 });
      if (hv) hoverEl.offset({ height: hv });
      if (lv) lineEl.offset({ height: lv });
    }
    el.show();
  }
}
