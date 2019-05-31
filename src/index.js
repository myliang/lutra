/* global window, document */
import { h } from './component/element';
import DataProxy from './core/data_proxy';
import Sheet from './component/sheet';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import './index.less';


class Spreadsheet {
  constructor(selectors, options = {}) {
    let targetEl = selectors;
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }
    this.data = new DataProxy('sheet1', options);
    const rootEl = h('div', `${cssPrefix}`)
      .on('contextmenu', evt => evt.preventDefault());
    // create canvas element
    targetEl.appendChild(rootEl.el);
    this.sheet = new Sheet(rootEl, this.data);
  }

  loadData(data) {
    this.sheet.loadData(data);
    return this;
  }

  getData() {
    return this.data.getData();
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    this.data.change = cb;
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
