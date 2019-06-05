/* global window, document */
import h from './dom/create-element';
import Data from './core/data';
import TableCanvas from './component/table-canvas';
import ScrollBar from './component/scrollbar';
import Resizer from './component/resizer';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import './index.less';

function vScrollbarReset() {
  const { vScrollbar, data } = this;
  const { rows, canvas } = data;
  vScrollbar.distances(rows.totalHeight(), canvas.cheight);
}

function hScrollbarReset() {
  const { hScrollbar, data } = this;
  const { cols, canvas } = data;
  hScrollbar.distances(cols.totalWidth(), canvas.cwidth);
}

function overlayerMousemove(evt) {
  const { buttons, offsetX, offsetY } = evt;
  if (buttons !== 0) return;

  const {
    data, rResizer, cResizer,
  } = this;
  const { indexWidth, indexHeight, canvas } = data;
  if (offsetX > indexWidth && offsetY > indexHeight) {
    rResizer.hide();
    cResizer.hide();
    return;
  }

  const {
    ri, ci, x, y, h, w,
  } = data.cellBoxAndIndex(offsetX, offsetY);
  // console.log('cellBoxAndIndex:', ri, ci, x, y, w, h);
  if (ri >= 0 && ci === -1) {
    rResizer.update([ri, y, h, w, canvas.width]);
  } else {
    rResizer.hide();
  }
  if (ri === -1 && ci >= 0) {
    cResizer.update([ci, x, w, h, canvas.height]);
  } else {
    cResizer.hide();
  }
}

function initEvents() {
  const {
    overlayerEl,
    rResizer,
    cResizer,
    vScrollbar,
    hScrollbar,
    data,
    tableCanvas,
  } = this;
  const { rows, cols } = data;
  // overlayer
  overlayerEl.on('mousemove', (evt) => {
    overlayerMousemove.call(this, evt);
  }).on('mousedown', (evt) => {
    const { buttons, detail } = evt;
    // the left mouse button: mousedown → mouseup → click
    // the right mouse button: mousedown → contenxtmenu → mouseup
    if (buttons === 2) {
      // click the right mouse button
    } else if (detail === 2) {
      // double click the left mouse button
    } else {
      // click the left mouse button
    }
  }).on('mousewheel.stop', (evt) => {
  });

  rResizer.change = (i, v) => {
    rows.height(i, v);
    tableCanvas.render();
    vScrollbarReset.call(this);
  };
  cResizer.change = (i, v) => {
    cols.width(i, v);
    tableCanvas.render();
    hScrollbarReset.call(this);
  };

  vScrollbar.change = (v) => {
    data.scrolly(v);
    tableCanvas.render();
  };
  hScrollbar.change = (v) => {
    data.scrollx(v);
    tableCanvas.render();
  };
}

function reset() {
  const {
    tableCanvas,
    overlayerEl,
    tableEl,
    data,
  } = this;
  const { indexWidth, indexHeight } = data;
  const {
    width, height, cwidth, cheight,
  } = data.canvas;
  overlayerEl.offset({ width, height });
  overlayerEl.children[0].offset({
    left: indexWidth,
    top: indexHeight,
    width: cwidth,
    height: cheight,
  });
  tableCanvas.render();
  vScrollbarReset.call(this);
  hScrollbarReset.call(this);
}

class FormDesigner {
  constructor(selectors, settings = {}) {
    let targetEl = selectors;
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }
    this.data = new Data(settings);
    const { indexWidth, indexHeight } = this.data;

    // table
    const tableEl = h(`canvas.${cssPrefix}-table`);
    this.tableCanvas = new TableCanvas(tableEl.el, this.data);

    // scrollbar
    this.vScrollbar = new ScrollBar('vertical');
    this.hScrollbar = new ScrollBar('horizontal');

    // resizer
    this.rResizer = new Resizer('row', indexHeight);
    this.cResizer = new Resizer('col', indexWidth);

    // overlayer
    this.overlayerEl = h(`.${cssPrefix}-overlayer`,
      h(`.${cssPrefix}-overlayer-content`),
    );

    // console.log(':::::', this.overlayerEl, this.rResizer.el);
    const rootEl = h(`.${cssPrefix}`,
      tableEl,
      this.overlayerEl,
      this.rResizer.el,
      this.cResizer.el,
      this.vScrollbar.el,
      this.hScrollbar.el)
      .on('contextmenu.prevent', () => {});

    // create canvas element
    targetEl.appendChild(rootEl.el);

    initEvents.call(this);
    reset.call(this);
  }

  loadData(d) {
    const { data, tableCanvas } = this;
    data.load(d);
    tableCanvas.render();
    return this;
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const formdesigner = (el, options = {}) => new FormDesigner(el, options);

if (window) {
  window.x = window.x || {};
  window.x.formdesigner = formdesigner;
  window.x.formdesigner.locale = (lang, message) => locale(lang, message);
}

export default FormDesigner;
export {
  formdesigner,
};
