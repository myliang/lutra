import {
  html, BaseElement, component,
} from './core';

export default @component('xfd-selector')
class Selector extends BaseElement {
  render() {
    const { offset } = this.$props;
    let { width, height } = offset;
    // console.log('selector.offset:', offset);
    // const { visible } = this.$state;
    // this.style.display = visible ? 'block' : 'none';
    width -= 3;
    height -= 3;
    this.setOffset(offset);
    return html`
    <div class="area" style="${{ width, height }}"></div>
    <div class="corner"></div>
    `;
  }
}
