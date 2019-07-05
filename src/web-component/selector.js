import {
  html, BaseElement, component,
} from './core';

export default @component('xfd-selector')
class Selector extends BaseElement {
  render() {
    const { offset } = this.$props;
    let { width, height } = offset;
    // const { visible } = this.$state;
    // this.style.display = visible ? 'block' : 'none';
    width = `${width - 3}px`;
    height = `${height - 3}px`;
    this.setOffset(offset);
    return html`
    <div class="area" style="${{ width, height }}"></div>
    <div class="corner"></div>
    `;
  }
}
