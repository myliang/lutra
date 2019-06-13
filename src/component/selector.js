import BaseComponent from './base-component';
import h from '../dom/create-element';
import { cssPrefix } from '../config';

export default class Selector extends BaseComponent {
  constructor() {
    super({});
  }

  render() {
    return h(`.${cssPrefix}-selector`,
      h(`.${cssPrefix}-selector-area`,
        h(`.${cssPrefix}-selector-corner`).hide()).hide());
  }

  update(x, y, w, h1) {
    const [area] = this.el.children;
    area.offset({
      left: x - 1, top: y - 1, width: w - 3, height: h1 - 3,
    }).show();
  }
}
