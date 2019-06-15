/* global window, document */
import hh from './dom/create-element';
import Data from './core/data';
import TableCanvas from './component/table-canvas';
import ScrollBar from './component/scrollbar';
import Resizer from './component/resizer';
import Toolbar from './component/toolbar/index';
import Selector from './component/selector';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import { bind, mouseMoveUp } from './dom/event';
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
    ri, ci, x, y, w, h,
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

function updateSelector() {
  const {
    data, selector, toolbar, tableCanvas,
  } = this;
  selector.update(data.selectedCellBox);
  toolbar.update();
  tableCanvas.render();
}

function overlayerClickLeftMouseButton(evt) {
  const {
    shiftKey, offsetX, offsetY, buttons,
  } = evt;
  const { data } = this;
  let { ri, ci } = data.cellBoxAndIndex(offsetX, offsetY);
  const last = { ri, ci };

  if (!shiftKey) {
    data.select.s(ri, ci);
    updateSelector.call(this);
    mouseMoveUp(window, (e) => {
      if (e.buttons === 1 && !e.shiftKey) {
        ({ ri, ci } = data.cellBoxAndIndex(e.offsetX, e.offsetY));
        if (last.ri !== ri || last.ci !== ci) {
          data.select.e(ri, ci);
          updateSelector.call(this);
          last.ri = ri;
          last.ci = ci;
        }
      }
    }, () => {});
  } else if (buttons === 1) {
    data.select.e(ri, ci);
    updateSelector.call(this);
  }
}

function reset() {
  const {
    tableCanvas,
    overlayerEl,
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

function initEvents() {
  const {
    overlayerEl,
    rResizer,
    cResizer,
    vScrollbar,
    hScrollbar,
    data,
    tableCanvas,
    toolbar,
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
      overlayerClickLeftMouseButton.call(this, evt);
    }
  }).on('mousewheel.stop', () => {});

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
    data.scroll.y(v);
    updateSelector.call(this);
  };
  hScrollbar.change = (v) => {
    data.scroll.x(v);
    updateSelector.call(this);
  };

  toolbar.change = (attr, value) => {
    data.update(attr, value);
    tableCanvas.render();
  };

  // bind window
  bind(window, 'resize', () => reset.call(this));
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
    const tableEl = hh(`canvas.${cssPrefix}-table`);
    this.tableCanvas = new TableCanvas(tableEl.el, this.data);

    // scrollbar
    this.vScrollbar = new ScrollBar('vertical');
    this.hScrollbar = new ScrollBar('horizontal');

    // resizer
    this.rResizer = new Resizer('row', indexHeight);
    this.cResizer = new Resizer('col', indexWidth);

    // selector
    this.selector = new Selector();

    // overlayer
    this.overlayerEl = hh(`.${cssPrefix}-overlayer`,
      hh(`.${cssPrefix}-overlayer-content`,
        this.selector.el));

    // toolbar
    this.toolbar = new Toolbar(this.data);

    // console.log(':::::', this.overlayerEl, this.rResizer.el);
    const rootEl = hh(`.${cssPrefix}`,
      this.toolbar.el,
      hh(`.${cssPrefix}-content`,
        tableEl,
        this.overlayerEl,
        this.rResizer.el,
        this.cResizer.el,
        this.vScrollbar.el,
        this.hScrollbar.el).on('contextmenu.prevent', () => {}));

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
