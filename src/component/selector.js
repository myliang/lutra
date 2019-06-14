import BaseComponent from './base-component';
import hh from '../dom/create-element';
import { cssPrefix } from '../config';

export default class Selector extends BaseComponent {
  constructor() {
    super({});
  }

  render() {
    return hh(`.${cssPrefix}-selector`,
      hh(`.${cssPrefix}-selector-area`,
        hh(`.${cssPrefix}-selector-corner`).hide()).hide());
  }

  update({
    x, y, w, h,
  }) {
    const [area] = this.el.children;
    area.offset({
      left: x - 1, top: y - 1, width: w - 3, height: h - 3,
    }).show();
  }
}
