/* global window, document */
import h from './dom/create-element';
import Data from './core/data';
import TableCanvas from './component/table-canvas';
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
    // console.log('data:', this.data);

    const tableEl = h('canvas', `${cssPrefix}-table`);
    this.tableCanvas = new TableCanvas(tableEl.el, this.data);

    const rootEl = h('div', `${cssPrefix}`, tableEl)
      .on('contextmenu.prevent', () => {});

    // create canvas element
    targetEl.appendChild(rootEl.el);

    this.tableCanvas.render();
  }

  loadData(data) {
    this.data.load(data);
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
