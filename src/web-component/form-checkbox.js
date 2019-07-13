import { html, BaseElement, component } from './core';

export default @component('x-form-checkbox')
class FormCheckbox extends BaseElement {
  onclick = () => {
    const nval = !this.$props.value;
    this.change(nval);
  };

  render() {
    const { value } = this.$props;
    // console.log('value:', value);
    const { classList } = this;
    if (value) classList.add('active');
    else classList.remove('active');
    return html`
    <label></label>
    `;
  }
}
