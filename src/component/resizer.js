/* global window */
import BaseComponent from './base-component';
import h from '../dom/create-element';
import { mouseMoveUp } from '../dom/event';
import { cssPrefix } from '../config';

function mousedownHandler() {
  // let sEvt = evt;
  const { el, type, offset, value } = this;
  const [, lineEl] = el.children;
  let distance = 0;
  lineEl.show();
  mouseMoveUp(window, (e) => {
    this.moving = true;
    const { buttons, movementX, movementY } = e;
    // console.log('evt:', e, buttons);
    if (buttons === 1) {
      if (type === 'row') {
        distance += movementY;
      } else if (type === 'col') {
        distance += movementX;
      }
      updateView.call(this, distance);
      // sEvt = e;
    }
  }, () => {
    this.moving = false;
    this.hide();
    this.change(value[0], distance + value[2]);
  });
}

function updateView(distance = 0) {
  const {
    value, el, type, minValue,
  } = this;
  const [
    , offset, length, hoverLength, lineLength,
  ] = value;
  const t = offset + length + distance;
  // console.log(offset, length, distance, minValue);
  if (t < offset + minValue) return;
  const [hoverEl, lineEl] = el.children;
  if (type === 'row') {
    el.offset({ top: t - 5 });
    hoverEl.offset({ width: hoverLength });
    lineEl.offset({ width: lineLength });
  } else if (type === 'col') {
    el.offset({ left: t - 5 });
    hoverEl.offset({ height: hoverLength });
    lineEl.offset({ height: lineLength });
  }
  el.show();
}

export default class Resizer extends BaseComponent {
  moving = false;

  // type: row | col
  // minValue: row-min-height | col-min-width
  constructor(type, minValue) {
    // value: [index, offset, length(width|height), hoverLength, lineLength]
    super([0, 0, 0, 0, 0]);
    this.offset = 0;
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

  update(value) {
    super.update(value);
    updateView.call(this, 0);
  }
}
