import BaseComponent from './base-component';
import hh from '../dom/create-element';
import { cssPrefix } from '../config';

function inputHandler(evt) {
  const { value } = evt.target;
  this.inputText = value;
}

function setTextareaRange(position) {
  const { el } = this.el.children[0].children[0];
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(position, position);
  }, 0);
}

export default class Editor extends BaseComponent {
  constructor() {
    super({});
    this.inputText = '';
    this.initText = '';
  }

  render() {
    return hh(`.${cssPrefix}-editor`,
      hh(`.${cssPrefix}-editor-area`,
        hh('textarea').on('input', evt => inputHandler.call(this, evt))
          .on('mousemove.stop', () => {})
          .on('mousedown.stop', () => {}),
        hh('.textline'))).hide();
  }

  finished() {
    const { inputText, initText } = this;
    if (inputText !== initText) {
      this.change(inputText);
    }
    this.inputText = '';
    this.el.hide();
  }

  update({
    x, y, w, h,
  }, { text }) {
    this.initText = text;
    this.inputText = text;
    // 6 is padding
    super.update({
      left: x - 1, top: y - 1, width: w - 3 - 6, height: h - 3,
    });
    const { el } = this;
    const [area] = el.children;
    const {
      left, top, width, height,
    } = this.value;
    el.show();
    area.offset({ left, top }).show();
    const [textarea] = area.children;
    textarea.val(text).offset({ width, height });
    setTextareaRange.call(this, text.length);
  }
}
