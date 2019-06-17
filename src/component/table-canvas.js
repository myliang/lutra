import Canvas from '../canvas/index';
import { npx, thinLineWidth } from '../canvas/helper';
import { stringAt } from '../core/alphabet';
import { pt2px } from '../core/font';

function renderGrid(viewRange) {
  const { canvas, data } = this;
  const style = data.defaultStyle;
  const {
    indexWidth, indexHeight, rows, cols,
  } = data;
  const {
    sri, sci, eri, eci, w, h,
  } = viewRange;
  canvas.saveRestore(() => {
    canvas.attr({
      fillStyle: style.bgcolor,
      lineWidth: thinLineWidth(),
      strokeStyle: '#e6e6e6',
    }).translate(indexWidth, indexHeight);
    // console.log('sri:', sri, ', eri:', eri);
    rows.heights(sri, eri, (i, hh, total) => {
      canvas.line([0, total], [w, total]);
    });
    cols.widths(sci, eci, (i, ww, total) => {
      canvas.line([total, 0], [total, h]);
    });
  });
}

function renderSelectedHeader(x, y, w, h) {
  const { canvas } = this;
  canvas.saveRestore(() => {
    canvas.attr({ fillStyle: 'rgba(75, 137, 255, 0.08)' })
      .fillRect(x, y, w, h);
  });
}

function renderHeader(viewRange) {
  const { canvas, data } = this;
  const {
    indexWidth, indexHeight, rows, cols, select,
  } = data;
  const { range } = select;
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
    // console.log('viewRange:', viewRange);
    // console.log('sri:', sri, ', eri:', eri);
    rows.heights(sri, eri, (i, hh, total) => {
      const y = total + indexHeight;
      if (range.inRow(i)) {
        renderSelectedHeader.call(this, 0, y, indexWidth, hh);
      }
      canvas.line([0, y], [indexWidth, y])
        .fillText(i + 1, indexWidth / 2, y + (hh / 2));
    });
    canvas.line([indexWidth, indexHeight], [indexWidth, h]);
    cols.widths(sci, eci, (i, ww, total) => {
      const x = total + indexWidth;
      if (range.inCol(i)) {
        renderSelectedHeader.call(this, x, 0, ww, indexHeight);
      }
      canvas.line([x, 0], [x, indexHeight])
        .fillText(stringAt(i), x + (ww / 2), indexHeight / 2);
    });
    canvas.line([indexWidth, indexHeight], [w, indexHeight]);
  });
}

function renderCell(ri, ci, cellBox, merge = false) {
  const { canvas, data } = this;
  const cell = data.cell(ri, ci);
  if (!merge && !cell.$) return;
  // if (data.merges.includes(ri, ci)) return;

  const box = Canvas.box(cellBox());
  const {
    bgcolor, border, font, align, valign, color, underline, textwrap,
  } = cell.style;
  // console.log(ri, ci, box);
  box.bgcolor = bgcolor;
  if (border) {
    box.border = border;
    canvas.border(box);
  }
  canvas.clipRect(box, () => {
    // console.log(nfont);
    const { value } = cell;
    if (value) {
      const nfont = Object.assign({}, font);
      nfont.size = pt2px(font.size);
      canvas.text(value, box, {
        align, valign, font: nfont, color, underline,
      }, textwrap);
    }
  });
}

function renderContent(viewRange) {
  const { canvas, data } = this;
  const {
    indexWidth, indexHeight, merges,
  } = data;
  canvas.saveRestore(() => {
    canvas.translate(indexWidth, indexHeight);
    // 1 render cell
    viewRange.each((ri, ci) => {
      renderCell.call(this, ri, ci, () => data.cellBox(ri, ci));
    });
    // 2 render merge
    merges.each(viewRange, (it) => {
      renderCell.call(this, it.sri, it.sci, () => data.cellBox(it), true);
    });
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
      viewRange, design,
    } = data;
    const { w, h } = viewRange;
    canvas.clear(w, h).resize(w, h);

    if (design) {
      // canvas.translate(indexWidth, indexHeight);
      renderGrid.call(this, viewRange);
      renderContent.call(this, viewRange);
      renderHeader.call(this, viewRange);
    }
  }
}
