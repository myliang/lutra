import Canvas from '../canvas/index';

function renderGrid(vw, vh, tx, ty) {
  const { canvas, data } = this;
  const style = data.defaultStyle();
  canvas.saveRestore(() => {
    canvas.attr({
      fillStyle: style.bgcolor,
      lineWidth: Canvas.thinLineWidth(),
      strokeStyle: '#e6e6e6',
    }).translate(tx, ty);
    data.rowHeightsEach((i, h, total) => {
      canvas.line([0, total], [vw, total]);
    });
    data.colWidthsEach((i, w, total) => {
      canvas.line([total, 0], [total, vh]);
    });
  });
}

function renderContent(viewRange, tx, ty) {
  const { canvas } = this;
  canvas.saveRestore(() => {
    canvas.translate(tx, ty);
    // 1 render cell
    // 2 render merge
  });
}

function renderHeader() {
}

export default class TableCanvas {
  constructor(el, data) {
    this.canvas = Canvas.create(el);
    this.data = data;
  }

  render() {
    const { canvas, data } = this;
    const { width, height } = data.canvas();
    const { viewRange } = data;
    canvas.clear(width, height);
    canvas.resize(width, height);
    const tx = 0;
    const ty = 0;

    renderGrid.call(this, width, height, tx, ty);
    renderContent.call(this, viewRange, tx, ty);
    renderHeader.call(this);
  }
}
