import helper from './helper';

export default class Cols {
  constructor({ cols }, { col }) {
    this._ = cols;
    this.settings = col;
  }

  get(i) {
    return this._[i];
  }

  width(i, v) {
    const { _, settings } = this;
    const c = _[i];
    if (v) {
      if (c) {
        c.width = v;
      } else {
        _[i] = { width: v };
      }
      return v;
    }
    return (c && c.width) || settings.width;
  }

  len(v) {
    const { _, settings } = this;
    if (v) {
      _.len = this.len() + v;
      return _.len;
    }
    return _.len || settings.len;
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
