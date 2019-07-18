import helper from './helper';
import Base from './base';

export default class Styles extends Base {
  constructor({ style }) {
    super([]);
    this.settings = style;
  }

  get(i) {
    return this.$[i];
  }

  getOrDefault(i) {
    const { $, settings } = this;
    const s = i !== undefined ? $[i] : {};
    return helper.merge(settings, s);
  }

  add(style) {
    const { $ } = this;
    const i = $.findIndex(it => helper.equals(style, it));
    if (i >= 0) return i;
    $.push(style);
    return $.length - 1;
  }
}
