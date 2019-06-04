/* global window, document */
import h from './dom/create-element';
import Data from './core/data';
import TableCanvas from './component/table-canvas';
import ScrollBar from './component/scrollbar';
import Resizer from './component/resizer';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import './index.less';


class FormDesigner {
  constructor(selectors, settings = {}) {
    let targetEl = selectors;
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }
    this.data = new Data(settings);
    const { indexWidth, indexHeight } = this.data;

    // table
    const tableEl = h('canvas', `${cssPrefix}-table`);
    this.tableCanvas = new TableCanvas(tableEl.el, this.data);

    // scrollbar
    this.vScrollbar = new ScrollBar('vertical');
    this.hScrollbar = new ScrollBar('horizontal');

    // resizer
    this.rResizer = new Resizer('row', indexWidth);
    this.cResizer = new Resizer('col', indexHeight);

    const rootEl = h(`.${cssPrefix}`,
      tableEl,
      this.rResizer.el,
      this.cResizer.el,
      this.vScrollbar.el,
      this.hScrollbar.el)
      .on('contextmenu.prevent', () => {});

    // create canvas element
    targetEl.appendChild(rootEl.el);

    this.tableCanvas.render();
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
