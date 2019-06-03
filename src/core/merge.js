import CellRange from './cell-range';

export default class Merges {
  constructor({ merges }) {
    this._ = merges;
  }

  deleteWithin(merge) {
    return this._.merges.filter(it => !CellRange.valueOf(it).within(merge));
  }

  add(merge) {
    this.deleteWithin(merge);
    this._.push(merge);
  }

  intersects(merge) {
    return this._.merges.some(it => CellRange.valueOf(it).intersects(merge));
  }

  includes(ri, ci) {
    return this._.merges.some(it => CellRange.valueOf(it).includes(ri, ci));
  }

  union(merge) {
    let ncr = merge;
    this._.merges.forEach((m) => {
      const it = CellRange.valueOf(m);
      if (it.intersects(ncr)) {
        ncr = it.union(ncr);
      }
    });
    return ncr;
  }
}
