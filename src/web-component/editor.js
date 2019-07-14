import {
  html, BaseElement, component, element,
} from './core';

function loop() {}

function inputHandler({ target }) {
  this.change(target.value, 'changed');
}

function keydownHandler(evt) {
  const { keyCode } = evt;
  if (keyCode !== 13 && keyCode !== 9) evt.stopPropagation();
  if (keyCode === 13) evt.preventDefault();
}

function setSelectionRange(position) {
  setTimeout(() => {
    const el = element.call(this, 'textarea');
    el.focus();
    el.setSelectionRange(position, position);
  }, 0);
}

export default @component('lutra-editor')
class Editor extends BaseElement {
  render() {
    const { offset, content, style } = this.$props;
    const {
      left, top, width, height,
    } = offset;
    this.setOffset({ left: left - 1, top: top - 1 });
    const textStyle = Object.assign(style, { width: width - 9, height: height - 3 });
    setSelectionRange.call(this, content.length);
    return html`
      <textarea
        style="${textStyle}"
        @input="${inputHandler.bind(this)}"
        .value="${content}"
        @change.stop="${loop}"
        @keydown="${keydownHandler.bind(this)}"
        @mousedown.stop="${loop}"
        @mousemove.stop="${loop}"></textarea>
      <div class="textline"></div>
    `;
  }
}
