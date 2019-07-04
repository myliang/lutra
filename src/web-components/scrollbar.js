// import BaseComponent from './base-component';
// import h from '../dom/create-element';
// import { cssPrefix } from '../config';
import { html, BaseElement, component } from './core';

export default @component(
  'xfd-scrollbar',
  `
  :host {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #f4f5f8;
    opacity: 0.9;
    z-index: 12;
  }
  :host(.horizontal) {
    right: 16px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .content.horizontal {
    height: 1px;
    background: #ddd;
  }
  :host(.vertical) {
    bottom: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .content.vertical {
    width: 1px;
    background: #ddd;
  }`,
)
class Scrollbar extends BaseElement {
  onscroll = (evt) => {
    evt.stopPropagation();
    // console.log('::::::::', evt);
    const { scrollTop, scrollLeft } = evt.target;
    this.change(evt, this.isVertical ? scrollTop : scrollLeft);
  };

  onmousemove = evt => evt.stopPropagation();

  get isVertical() {
    return this.$props.type === 'vertical';
  }

  render() {
    // console.log('this:', this);
    const { type } = this.$props;
    const cssKey = this.isVertical ? 'height' : 'width';
    const { contentLength, viewLength } = this.$props;
    // const vstyle = { [cssKey]: `${this.viewLength - 16}px` };
    const cstyle = { [cssKey]: `${contentLength}px` };
    this.style[cssKey] = `${viewLength - 16}px`;
    // console.log('type:', type);
    if (!this.classList.contains(type)) this.classList.add(type);
    return html`
    <div class="content ${this.className}" style="${cstyle}"></div>
    `;
  }

  updateScroll(value) {
    const scrollKey = this.isVertical ? 'scrollTop' : 'scrollLeft';
    this[scrollKey] = value;
  }
}
