import {
  html, BaseElement, component, toggle,
} from './core';

export default @component('lutra-form-checkbox')
class FormCheckbox extends BaseElement {
  onclick = () => {
    const nval = !this.$props.value;
    this.change(nval);
  };

  render() {
    const { value } = this.$props;
    toggle.call(this, value);
    return html`
    <label></label>
    `;
  }
}
