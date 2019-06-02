import Canvas from '../canvas/index';
import { npx, thinLineWidth } from '../canvas/helper';
import { stringAt } from '../core/alphabet';
import { pt2px } from '../core/font';

function renderGrid(viewRange) {
  const { canvas, data } = this;
  const style = data.defaultStyle;
  const { indexWidth, indexHeight } = data;
  const {
    sri, sci, eri, eci, w, h,
  } = viewRange;
  canvas.saveRestore(() => {
    canvas.attr({
      fillStyle: style.bgcolor,
      lineWidth: thinLineWidth(),
      strokeStyle: '#e6e6e6',
    }).translate(indexWidth, indexHeight);
    data.rowHeightsEach(sri, eri, (i, hh, total) => {
      canvas.line([0, total], [w, total]);
    });
    data.colWidthsEach(sci, eci, (i, ww, total) => {
      canvas.line([total, 0], [total, h]);
    });
  });
}

function renderHeader(viewRange) {
  const { canvas, data } = this;
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
      font: `500 ${npx(12)}px Source Sans Pro`,
      fillStyle: '#585757',
      lineWidth: thinLineWidth(),
      strokeStyle: '#e6e6e6',
    });
    data.rowHeightsEach(sri, eri, (i, hh, total) => {
      const y = total + indexHeight;
      canvas.line([0, y], [indexWidth, y])
        .fillText(i + 1, indexWidth / 2, y + (h / 2));
    });
    canvas.line([indexWidth, indexHeight], [indexWidth, h]);
    data.colWidthsEach(sci, eci, (i, ww, total) => {
      const x = total + indexWidth;
      canvas.line([x, 0], [x, indexHeight])
        .fillText(stringAt(i), x + (w / 2), indexHeight / 2);
    });
    canvas.line([indexWidth, indexHeight], [w, indexHeight]);
  });
}

function createBox(ri, ci) {
  return Canvas.box(this.data.cellBox(ri, ci));
}

function renderCell(ri, ci) {
  const { canvas, data } = this;
  const cell = data.cell(ri, ci);
  if (!cell) return;

  const {
    bgcolor, border, font,
  } = data.cellStyle(ri, ci);
  const box = createBox(ri, ci);
  box.bgcolor = bgcolor;
  if (border) {
    box.border = border;
    canvas.border(box);
  }
  canvas.clip(box, () => {
    // const cellText = '';
    const nfont = Object.assign({}, font);
    nfont.size = pt2px(font.size);
  });
}

function renderContent(viewRange, tx, ty) {
  const { canvas, data } = this;
  const { indexWidth, indexHeight } = data;
  canvas.saveRestore(() => {
    canvas.translate(indexWidth, indexHeight);
    // 1 render cell
    viewRange.each((ri, ci) => renderCell.call(this, ri, ci));
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
      // canvas.translate(indexWidth, indexHeight);
      renderGrid.call(this, viewRange);
      renderHeader.call(this, viewRange);
      renderContent.call(this, viewRange, -x + indexWidth, -y + indexHeight);
    }
  }
}
