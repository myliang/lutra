export default class Scroll {
  constructor({ scroll }, rows, cols) {
    this.$ = scroll;
    this.rows = rows;
    this.cols = cols;
  }

  get ri() {
    return this.$.ri;
  }

  get ci() {
    return this.$.ci;
  }

  x(v) {
    const { $, cols } = this;
    const { ci, x } = $;
    const [eci, left] = cols.end(0, v);
    if (x !== left && ci !== eci) {
      $.ci = eci;
      $.x = left;
    }
  }

  y(v) {
    const { $, rows } = this;
    const { ri, y } = $;
    const [eri, top] = rows.end(0, v);
    if (y !== top && ri !== eri) {
      $.ri = eri;
      $.y = top;
    }
  }
}
