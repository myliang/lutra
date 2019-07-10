import {
  html, BaseElement, component, element,
} from './core';

function loop() {}

function inputHandler({ target }) {
  this.change(target.value, 'changed');
}

function setSelectionRange(position) {
  setTimeout(() => {
    const el = element.call(this, 'textarea');
    el.focus();
    el.setSelectionRange(position, position);
  }, 0);
}

export default @component('xfd-editor')
class Editor extends BaseElement {
  render() {
    const { offset, content } = this.$props;
    const {
      left, top, width, height,
    } = offset;
    this.setOffset({ left: left - 1, top: top - 1 });
    setSelectionRange.call(this, content.length);
    return html`
      <textarea
        style="${{ width: width - 9, height: height - 3 }}"
        @input="${inputHandler.bind(this)}"
        .value="${content}"
        @change.stop="${loop}"
        @mousedown.stop="${loop}"
        @mousemove.stop="${loop}"></textarea>
      <div class="textline"></div>
    `;
  }
}
