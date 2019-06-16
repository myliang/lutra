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
import Styles from './style';
import border from './border';
import Rows from './row';
import Cols from './col';
import Cell from './cell';
import CellRange from './cell-range';
import Merges from './merge';
import Scroll from './scroll';
import Select from './select';

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
    ri: 0, ci: 0, x: 0, y: 0,
  },
  select: {
    sri: 0, sci: 0, eri: 0, eci: 0,
  },
};

const toolbarHeight = 41;

export default class Data {
  constructor(settings = {}) {
    this.settings = helper.merge(defaultSettings, settings);
    this.$ = defaultData;
    this.merges = new Merges(this.$);
    this.styles = new Styles(this.$, this.settings);
    this.rows = new Rows(this.$, this.settings);
    this.cols = new Cols(this.$, this.settings);
    this.scroll = new Scroll(this.$, this.rows, this.cols);
    this.select = new Select(this.$, this.merges);
  }

  load(data) {
    helper.mergeDeep(this.$, data);
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

  get canvas() {
    const { view } = this.settings;
    const { indexWidth, indexHeight } = this;
    const width = view.width();
    const height = view.height() - toolbarHeight;
    return {
      width,
      height,
      cwidth: width - indexWidth,
      cheight: height - indexHeight,
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
    return new CellRange(ri, ci, eri, eci, width, height);
  }

  get selectedCell() {
    const { ri, ci } = this.select;
    return this.cell(ri, ci);
  }

  get selectedCellBox() {
    return this.cellBox(this.select.range);
  }

  // attr: merge | border | style...
  update(attr, value) {
    const {
      select, $, styles, merges,
    } = this;
    if (attr === 'merge') {
      merges.update(select.range, value ? 'add' : 'remove');
    } else if (attr === 'border') {
      border.parse(this, value, (
        ri, ci, v,
      ) => {
        Cell.write($, styles, ri, ci).update(attr, v);
      });
    } else {
      select.each((ri, ci) => {
        Cell.write($, styles, ri, ci).update(attr, value);
      });
    }
  }

  cell(ri, ci) {
    return Cell.read(this.$, this.styles, ri, ci);
  }

  // cellBox(range)
  // cellBox(ri, ci)
  cellBox(...args) {
    const { scroll, cols, rows } = this;
    let [sri, sci] = args;
    if (args.length === 1) {
      ([{ sri, sci }] = args);
    }
    const x = cols.sumWidth(scroll.ci, sci);
    const y = rows.sumHeight(scroll.ri, sri);
    let w = cols.width(sci);
    let h = rows.height(sri);
    if (arguments.length === 1) {
      const { eri, eci } = args[0];
      w = cols.sumWidth(sci, eci + 1);
      h = rows.sumHeight(sri, eri + 1);
    }
    return {
      x, y, w, h,
    };
  }

  cellBoxAndIndex(x1, y1) {
    const {
      scroll, cols, rows, indexWidth, indexHeight, merges,
    } = this;
    let [ri, y, h] = [0, 0, 0];
    let [ci, x, w] = [0, 0, 0];
    if (y1 <= indexHeight) {
      [ri, y] = [-1, 0];
    } else {
      [ri, y, h] = rows.end(scroll.ri, y1 - indexHeight);
    }
    if (x1 <= indexWidth) {
      [ci, x] = [-1, 0];
    } else {
      [ci, x, w] = cols.end(scroll.ci, x1 - indexWidth);
    }
    const merge = merges.find(ri, ci);
    if (merge) {
      ({
        x, y, w, h,
      } = this.cellBox(merge));
    }
    if (ri === -1) {
      h = indexHeight;
      x += indexWidth;
    }
    if (ci === -1) {
      w = indexWidth;
      y += indexHeight;
    }
    return {
      ri, ci, x, y, w, h,
    };
  }
}
