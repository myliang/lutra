import {
  html, BaseElement, component,
} from './core';

function loop() {}

function inputHandler({ target }) {
  this.change(target.value, 'changed');
}

export default @component('xfd-editor')
class Editor extends BaseElement {
  render() {
    const { offset, content } = this.$props;
    const {
      left, top, width, height,
    } = offset;
    this.setOffset({ left, top });
    return html`
      <textarea
        style="${{ width: width - 9, height: height - 3 }}"
        @input="${inputHandler.bind(this)}"
        .value="${content}"
        @mousedown.stop="${loop}"
        @mousemove.stop="${loop}"></textarea>
      <div class="textline"></div>
    `;
  }
}
