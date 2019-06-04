/* global document */
// o:
/*
 * {
 *  styles: [
 *    {
 *      bgcolor: '',
 *      align: '',
 *      valign: '',
 *      textwrap: false,
 *      underline: false,
 *      color: '',
 *      border: {
 *        left: [style, color],
 *        right: [style, color],
 *        top: [style, color],
 *        bottom: [style, color],
 *      },
 *      font: {
 *        name: 'Helvetica',
 *        size: 10,
 *        bold: false,
 *        italic: false,
 *      }
 *    }
 *  ],
 *  merges: [
 *    'A1:F11',
 *    ...
 *  ],
 *  rows: {
 *    1: {
 *      height: 50,
 *      style: 1,
 *      cells: {
 *        1: {
 *          style: 2,
 *          type: 'string',
 *          text: '',
 *          value: '', // cal result
 *        }
 *      }
 *    },
 *    ...
 *  },
 *  cols: {
 *    2: { width: 100, style: 1 }
 *  }
 * }
 */
import helper from './helper';
import Rows from './row';
import Cols from './col';
import Cell from './cell';
import CellRange from './cell-range';
import Merges from './merge';
import Scroll from './scroll';

const defaultSettings = {
  mode: 'design', // design, write, read
  scroll: {
    ri: 0,
    ci: 0,
    x: 0,
    y: 0,
  },
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 100,
    indexHeight: 25,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: true,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'Arial',
      size: 10,
      bold: false,
      italic: false,
    },
  },
};

const defaultData = {
  styles: [],
  merges: [],
  rows: {},
  cols: {},
  scroll: {
    ri: 0, ci: 0, x: 0, y: 100,
  },
  selector: {
    sri: 0, sci: 0, eri: 0, eci: 0,
  },
};

const toolbarHeight = 41;

export default class Data {
  constructor(settings = {}) {
    this.settings = helper.merge(defaultSettings, settings);
    this.load({});
  }

  load(data) {
    this._ = helper.merge(defaultData, data);
    const { _, settings } = this;
    this.merges = new Merges(_);
    this.rows = new Rows(_, settings);
    this.cols = new Cols(_, settings);
    this.scroll = new Scroll(_);
  }

  get design() {
    return this.settings.mode === 'design';
  }

  get indexHeight() {
    return this.settings.row.indexHeight;
  }

  get indexWidth() {
    return this.settings.col.indexWidth;
  }

  get defaultStyle() {
    return this.settings.style;
  }

  get selector() {
    return this._.selector;
  }

  get canvas() {
    const { view } = this.settings;
    return {
      width: view.width(),
      height: view.height() - toolbarHeight,
    };
  }

  get viewRange() {
    const { ri, ci } = this.scroll;
    const { width, height } = this.canvas;
    const {
      indexWidth, indexHeight, rows, cols,
    } = this;
    const [eri] = rows.end(ri, height + indexHeight);
    const [eci] = cols.end(ci, width + indexWidth);
    // console.log('eri>>>:', eci, eri, width, this.scroll);
    return new CellRange(ri, ci, eri, eci, width, height);
  }

  scrollx(x) {
    this.scroll.x(x, this.cols);
  }

  scrolly(y) {
    this.scroll.y(y, this.rows);
  }

  cell(ri, ci) {
    return new Cell(this._, this.settings, ri, ci);
  }

  // cellBox(ri, ci)
  // cellBox(sri, sci, eri, eci);
  cellBox(ri, ci, ...args) {
    const { scroll, cols, rows } = this;
    const x = cols.sumWidth(scroll.ci, ci);
    const y = rows.sumHeight(scroll.ri, ri);
    let w = cols.width(ci);
    let h = rows.height(ri);
    if (arguments.length === 4) {
      const [eri, eci] = args;
      w = cols.sumWidth(ci, eci + 1);
      h = rows.sumHeight(ri, eri + 1);
    }
    return {
      x, y, w, h,
    };
  }

  cellBoxAndIndex(x1, y1) {
    const {
      scroll, cols, rows, indexWidth, indexHeight,
    } = this;
    const [ri, top, height] = rows.end(scroll.ri, y1 - indexHeight);
    const [ci, left, width] = cols.end(scroll.ci, x1 - indexWidth);
    let x = left;
    let y = top;
    let w = width;
    let h = height;
    // console.log('ri:', ri, ':ci:', ci);
    if (ri === -1) {
      y = 0;
      h = indexHeight;
      x += indexWidth;
    }
    if (ci === -1) {
      x = 0;
      w = indexWidth;
      y += indexHeight;
    }
    return {
      ri, ci, x, y, w, h,
    };
  }
}
