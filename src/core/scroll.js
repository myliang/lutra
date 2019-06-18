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

  get x() {
    return this.$[1];
  }

  get y() {
    return this.$[2];
  }

  move(rn, cn) {
    let [ri, ci] = this.indexes;
    if (rn !== 0 || cn !== 0) {
      ri += rn;
      ci += cn;
      this.$[0] = xy2expr(ci, ri);
      this.$[1] = this.cols.sumWidth(0, ci);
      this.$[2] = this.rows.sumHeight(0, ri);
    }
  }

  movex(v) {
    const [ri, ci] = this.indexes;
    const [eci, x] = this.cols.end(0, v);
    if (ci !== eci) {
      this.$[0] = xy2expr(eci, ri);
      this.$[1] = x;
    }
  }

  movey(v) {
    const [ri, ci] = this.indexes;
    const [eri, y] = this.rows.end(0, v);
    if (ri !== eri) {
      this.$[0] = xy2expr(ci, eri);
      this.$[2] = y;
    }
  }
}
