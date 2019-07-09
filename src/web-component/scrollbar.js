import { html, BaseElement, component } from './core';

export default @component('xfd-scrollbar')
class Scrollbar extends BaseElement {
  onscroll = (evt) => {
    evt.stopPropagation();
    // console.log('::::::::', evt);
    const { scrollTop, scrollLeft } = evt.target;
    this.change(this.isVertical() ? scrollTop : scrollLeft, evt);
  };

  onmousemove = evt => evt.stopPropagation();

  isVertical() {
    return this.$props.type === 'vertical';
  }

  render() {
    // console.log('this:', this);
    const { type } = this.$props;
    const cssKey = this.isVertical() ? 'height' : 'width';
    const [contentLength, viewLength] = this.$props.value;
    // const vstyle = { [cssKey]: `${this.viewLength - 16}px` };
    const cstyle = { [cssKey]: contentLength };
    this.style[cssKey] = `${viewLength - 16}px`;
    // console.log('type:', type);
    if (!this.classList.contains(type)) this.classList.add(type);
    return html`
    <div class="content ${this.className}" style="${cstyle}"></div>
    `;
  }

  updateScroll(value) {
    const scrollKey = this.isVertical() ? 'scrollTop' : 'scrollLeft';
    this[scrollKey] = value;
  }
}
