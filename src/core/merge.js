import CellRange from './cell-range';

export default class Merges {
  constructor({ merges }) {
    this.$ = merges;
  }

  deleteWithin(merge) {
    return this.$.filter(it => !CellRange.valueOf(it).within(merge));
  }

  add(merge) {
    this.deleteWithin(merge);
    this.$.push(merge);
  }

  intersects(merge) {
    return this.$.some(it => CellRange.valueOf(it).intersects(merge));
  }

  includes(ri, ci) {
    return this.$.some(it => CellRange.valueOf(it).includes(ri, ci));
  }

  find(ri, ci) {
    return this.$.find(it => CellRange.valueOf(it).includes(ri, ci));
  }

  union(merge) {
    let ncr = merge;
    this.$.forEach((m) => {
      const it = CellRange.valueOf(m);
      if (it.intersects(ncr)) {
        ncr = it.union(ncr);
      }
    });
    return ncr;
  }

  each(viewRange, cb) {
    this.$.forEach((it) => {
      const merge = CellRange.valueOf(it);
      if (CellRange.valueOf(it).intersects(viewRange)) {
        cb(merge);
      }
    });
  }
}
