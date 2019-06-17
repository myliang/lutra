import { expr2xy, xy2expr } from './alphabet';
import Base from './base';

export default class Scroll extends Base {
  // scroll: [ref, x, y]
  constructor({ rows, cols }) {
    super(['A1', 0, 0]);
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
