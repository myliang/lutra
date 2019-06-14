import CellRange from './cell-range';

export default class Merges {
  constructor({ merges }) {
    this.$ = merges;
  }

  deleteWithin(merge) {
    const { $ } = this;
    for (let i = 0; i < $.length;) {
      const it = CellRange.valueOf($[i]);
      if (it.within(merge)) $.splice(i, 1);
      else i += 1;
    }
  }

  add(merge) {
    this.$.push(merge.toString());
  }

  // type: add | remove
  update(merge, type = 'add') {
    this.deleteWithin(merge);
    if (type === 'add') this.add(merge);
  }

  intersects(merge) {
    return this.$.some(it => CellRange.valueOf(it).intersects(merge));
  }

  includes(ri, ci) {
    return this.$.some(it => CellRange.valueOf(it).includes(ri, ci));
  }

  find(ri, ci) {
    const ref = this.$.find(it => CellRange.valueOf(it).includes(ri, ci));
    return undefined || (ref && CellRange.valueOf(ref));
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
