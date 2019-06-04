export default class Scroll {
  constructor({ scroll }) {
    this._ = scroll;
  }

  get ri() {
    return this._.ri;
  }

  get ci() {
    return this._.ci;
  }

  x(v, cols) {
    const { _ } = this;
    const { ci, x } = _;
    const [eci, left] = cols.end(ci, v);
    if (x !== left && ci !== eci) {
      _.ci = eci;
      _.x = left;
    }
  }

  y(v, rows) {
    const { _ } = this;
    const { ri, y } = _;
    const [eri, top] = rows.end(ri, v);
    if (y !== top && ri !== eri) {
      _.ri = eri;
      _.y = top;
    }
  }
}
