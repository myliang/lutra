import CellRange from './cell-range';
import Base from './base';

function find(cb) {
  const ref = this.$.find(it => cb(CellRange.valueOf(it)));
  return undefined || (ref && CellRange.valueOf(ref));
}

export default class Merges extends Base {
  constructor() {
    super([]);
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
    return find.call(this, it => it.includes(ri, ci));
  }

  findInRow(ri) {
    return find.call(this, it => it.inRow(ri));
  }

  findInCol(ci) {
    return find.call(this, it => it.inCol(ci));
  }

  nInRow(ri) {
    const m = this.findInRow(ri);
    return m ? m.rn : 1;
  }

  nInCol(ci) {
    const m = this.findInCol(ci);
    return m ? m.cn : 1;
  }

  filter(merge) {
    const ret = [];
    this.$.forEach((m) => {
      const it = CellRange.valueOf(m);
      if (it.intersects(merge)) {
        ret.push(it);
      }
    });
    return ret;
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
