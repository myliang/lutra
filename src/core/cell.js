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
    this.$ = getCell.call(this, ri, ci);
  }

  get value() {
    let { text } = this.$;
    if (text) {
      text = cellEval(text, formula.map, (x, y) => {
        const c = getCell.call(this, y, x);
        return '' || (c && c.text);
      });
      this.$.value = text;
    }
    return text;
  }

  get() {
    return this.$;
  }

  get style() {
    const { $, dstyle, styles } = this;
    let s = {};
    if ($ && $.style !== undefined) {
      s = styles[$.style];
    }
    return helper.merge(dstyle, s);
  }

  get text() {
    return this.$.text;
  }
}
