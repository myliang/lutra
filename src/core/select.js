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
