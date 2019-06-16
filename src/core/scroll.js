import { expr2xy, xy2expr } from './alphabet';

export default class Scroll {
  // scroll: [ref, x, y]
  constructor({ scroll }, rows, cols) {
    this.$ = scroll;
    this.rows = rows;
    this.cols = cols;
  }

  get indexes() {
    return expr2xy(this.$[0]).reverse();
  }

  x(v) {
    const [ri, ci] = this.indexes;
    const [eci] = this.cols.end(0, v);
    if (ci !== eci) {
      this.$[0] = xy2expr(eci, ri);
    }
  }

  y(v) {
    const [ri, ci] = this.indexes;
    const [eri] = this.rows.end(0, v);
    if (ri !== eri) {
      this.$[0] = xy2expr(ci, eri);
    }
  }
}
