import CellRange from './cell-range';

export default class Select {
  constructor({ select }, merges) {
    this.$ = select;
    this.ri = 0;
    this.ci = 0;
    this.merges = merges;
  }

  get range() {
    return CellRange.create(this.$);
  }

  get multiple() {
    return this.range.multiple();
  }

  get merged() {
    const {
      range, merges, ri, ci,
    } = this;
    if (range.multiple()) {
      const merge = merges.find(ri, ci);
      if (merge) return merge.equals(range);
    }
    return false;
  }

  get single() {
    return this.merged || !this.multiple;
  }

  each(cb) {
    const {
      sri, sci, eri, eci,
    } = this.$;
    const nmerges = this.merges.filter(this.range);
    for (let i = sri; i <= eri; i += 1) {
      for (let j = sci; j <= eci; j += 1) {
        const merge = nmerges.find(it => it.includes(i, j));
        if (merge) {
          if (merge.sri === i && merge.sci === j) {
            cb(i, j);
          }
          const [, cn] = merge.size();
          j += cn - 1;
        } else {
          cb(i, j);
        }
      }
    }
  }

  // set sri, sci
  s(ri, ci) {
    this.ri = ri;
    this.ci = ci;
    this.$.sri = ri;
    this.$.sci = ci;
    this.e(ri, ci);
  }

  // set eri, eci, sri, sci
  e(ri, ci) {
    const { $, merges } = this;
    if (ri >= this.ri) {
      $.sri = this.ri;
      $.eri = ri;
    } else {
      $.sri = ri;
      $.eri = this.ri;
    }
    if (ci >= this.ci) {
      $.sci = this.ci;
      $.eci = ci;
    } else {
      $.sci = ci;
      $.eci = this.ci;
    }
    const {
      sri, sci, eri, eci,
    } = merges.union(this.range);
    Object.assign($, {
      sri, sci, eri, eci,
    });
  }
}
