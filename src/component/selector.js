import {
  html, BaseElement, component,
} from '../core';

export default @component('lutra-selector')
class Selector extends BaseElement {
  render() {
    let {
      left, top, width, height,
    } = this.$props.offset;
    // const { visible } = this.$state;
    // this.style.display = visible ? 'block' : 'none';
    left -= 1;
    top -= 1;
    width -= 3;
    height -= 3;
    this.setOffset({
      left, top, width, height,
    });
    return html`
    <div class="area" style="${{ width, height }}"></div>
    <div class="corner"></div>
    `;
  }
}
