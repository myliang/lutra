import cellEval from './cell-evaluation';
import formula from './formula';
import helper from './helper';

function getCell(ri, ci) {
  const { rows } = this;
  return undefined || (rows[ri] && rows[ri].cells && rows[ri].cells[ci]);
}

export default class Cell {
  constructor({ rows, styles }, { style }, ri, ci) {
    this.styles = styles;
    this.dstyle = style;
    this.rows = rows;
    this._ = getCell.call(this, ri, ci);
  }

  get value() {
    let { text } = this._;
    if (text) {
      text = cellEval(text, formula.map, (x, y) => {
        const c = getCell.call(this, y, x);
        return '' || (c && c.text);
      });
      this._.value = text;
    }
    return text;
  }

  get() {
    return this._;
  }

  get style() {
    const { _, dstyle, styles } = this;
    let s = {};
    if (_ && _.style !== undefined) {
      s = styles[_.style];
    }
    return helper.merge(dstyle, s);
  }

  get text() {
    return this._.text;
  }
}
