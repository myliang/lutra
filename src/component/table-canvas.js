import Canvas from '../canvas/index';
import { stringAt } from '../core/alphabet';

function renderGrid(viewRange, tx, ty) {
  const { canvas, data } = this;
  const style = data.defaultStyle;
  const {
    sri, sci, eri, eci, w, h,
  } = viewRange;
  canvas.saveRestore(() => {
    canvas.attr({
      fillStyle: style.bgcolor,
      lineWidth: Canvas.thinLineWidth(),
      strokeStyle: '#e6e6e6',
    }).translate(tx, ty);
    data.rowHeightsEach(sri, eri, (i, h, total) => {
      canvas.line([0, total], [w, total]);
    });
    data.colWidthsEach(sci, eci, (i, w, total) => {
      canvas.line([total, 0], [total, h]);
    });
  });
}

function renderHeader(viewRange, tx, ty) {
  const { canvas, data } = this;
  const style = data.defaultStyle;
  const font = style;
  const { indexWidth, indexHeight } = data;
  const {
    sri, sci, eri, eci, w, h,
  } = viewRange;
  canvas.saveRestore(() => {
    // 1 draw background
    canvas.attr({ fillStyle: '#f4f5f8' })
      .fillRect(0, 0, w, indexHeight)
      .fillRect(0, 0, indexWidth, h);
    // 2 text, border
    canvas.attr({
      textAlign: 'center',
      textBaseline: 'middle',
      font: `500 ${Canvas.npx(12)}px Source Sans Pro`,
      fillStyle: '#585757',
      lineWidth: Canvas.thinLineWidth(),
      strokeStyle: '#e6e6e6',
    });
    data.rowHeightsEach(sri, eri, (i, h, total) => {
      const y = ty + total + indexHeight;
      canvas.line([0, y], [indexWidth, y])
        .fillText(i + 1, indexWidth / 2, y + (h / 2));
    });
    canvas.line([indexWidth, indexHeight], [indexWidth, h]);
    data.colWidthsEach(sci, eci, (i, w, total) => {
      const x = tx + total + indexWidth;
      canvas.line([x, 0], [x, indexHeight])
        .fillText(stringAt(i), x + (w / 2), indexHeight / 2);
    });
    canvas.line([indexWidth, indexHeight], [w, indexHeight]);
  });
}

function renderContent(viewRange, tx, ty) {
  const { canvas, data } = this;
  const { defaultStyle } = data;
  canvas.saveRestore(() => {
    canvas.translate(tx, ty);
    // 1 render cell
    // 2 render merge
  });
}

export default class TableCanvas {
  constructor(el, data) {
    this.canvas = Canvas.create(el);
    this.data = data;
  }

  render() {
    const { canvas, data } = this;
    const {
      viewRange, design, indexHeight, indexWidth,
    } = data;
    const { w, h } = viewRange;
    const { x, y } = data.scroll;
    canvas.clear(w, h).resize(w, h);

    if (design) {
      // renderGrid.call(this, viewRange, x + indexWidth, y + indexHeight);
      renderHeader.call(this, viewRange, x, y);
      renderContent.call(this, viewRange, -x + indexWidth, -y + indexHeight);
    }
  }
}
