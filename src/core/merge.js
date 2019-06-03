import CellRange from './cell-range';

export default class Merges {
  constructor({ merges }) {
    this._ = merges;
  }

  deleteWithin(merge) {
    return this._.filter(it => !CellRange.valueOf(it).within(merge));
  }

  add(merge) {
    this.deleteWithin(merge);
    this._.push(merge);
  }

  intersects(merge) {
    return this._.some(it => CellRange.valueOf(it).intersects(merge));
  }

  includes(ri, ci) {
    return this._.some(it => CellRange.valueOf(it).includes(ri, ci));
  }

  union(merge) {
    let ncr = merge;
    this._.forEach((m) => {
      const it = CellRange.valueOf(m);
      if (it.intersects(ncr)) {
        ncr = it.union(ncr);
      }
    });
    return ncr;
  }

  each(viewRange, cb) {
    this._.forEach((it) => {
      const merge = CellRange.valueOf(it);
      if (CellRange.valueOf(it).intersects(viewRange)) {
        cb(merge);
      }
    });
  }
}
