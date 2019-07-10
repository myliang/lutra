import {
  html, BaseElement, component,
} from './core';

export default @component('x-icon')
class Icon extends BaseElement {
  render() {
    const { type } = this.$props;
    return html`
    <div class="icon-img ${type}"></div>
    `;
  }
}
// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
