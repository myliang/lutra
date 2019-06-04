import helper from './helper';

export default class Cols {
  constructor({ cols }, { col }) {
    this.$ = cols;
    this.settings = col;
  }

  get(i) {
    return this.$[i];
  }

  width(i, v) {
    const { $, settings } = this;
    const c = $[i];
    if (v) {
      if (c) {
        c.width = v;
      } else {
        $[i] = { width: v };
      }
      return v;
    }
    return (c && c.width) || settings.width;
  }

  len(v) {
    const { $, settings } = this;
    if (v) {
      $.len = this.len() + v;
      return $.len;
    }
    return $.len || settings.len;
  }

  // si: start-index
  // threshold
  // return: [index, total]
  end(si, threshold) {
    return helper.rangeIf(si, this.len(), i => this.width(i), total => total > threshold);
  }

  sumWidth(min, max) {
    return helper.rangeSum(min, max, i => this.width(i));
  }

  totalWidth() {
    return this.sumWidth(0, this.len());
  }

  widths(min, max, cb) {
    helper.rangeEach(min, max, i => this.width(i), cb);
  }
}
