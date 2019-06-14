import helper from './helper';

export default class Styles {
  constructor({ styles }, { style }) {
    this.$ = styles;
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
    for (let i = 0; i < $.length; i += 1) {
      const s = $[i];
      if (helper.equals(style, s)) return i;
    }
    $.push(style);
    return $.length - 1;
  }
}
