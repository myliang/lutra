import { html, BaseElement, component } from './core';

export default @component('x-form-input')
class FormInput extends BaseElement {
  render() {
    const { width, value, type } = this.$props;
    return html`
    <input style="width: ${width || 'auto'};"
      type="${type || 'text'}" value="${value}"></input>
    `;
  }
}
