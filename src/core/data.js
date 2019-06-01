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
import { baseFonts } from './font';
import row from './row';
import col from './col';
import CellRange from './cell-range';

const defaultSettings = {
  mode: 'designer', // design, write, read
  fonts: baseFonts,
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

const toolbarHeight = 41;

export default class Data {
  constructor(settings = {}) {
    this.settings = helper.merge(defaultSettings, settings);
    // the origin data object for save
    this._ = {};
  }

  load(data) {
    this._ = data || {};
  }

  defaultStyle() {
    return this.settings.style;
  }

  canvas() {
    const { view } = this.settings;
    console.log(':', this.settings);
    return {
      width: view.width(),
      height: view.height() - toolbarHeight,
    };
  }

  viewRange() {
    const { ri, ci } = this.scroll;
    const { width, height } = this.canvas;
    const eri = helper.rangeIf(0, row.len(this), i => row.height(this, i), total => total > height);
    const eci = helper.rangeIf(0, col.len(this), i => col.width(this, i), total => total > width);
    return new CellRange(ri, ci, eri, eci);
  }

  rowHeightsEach(cb) {
    helper.rangeEach(0, row.len(this), i => row.height(this, i), cb);
  }

  colWidthsEach(cb) {
    helper.rangeEach(0, col.len(this), i => col.width(this, i), cb);
  }
}
