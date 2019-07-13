import { html, BaseElement, component } from './core';
import './form-input';
import './form-checkbox';
import './form-select';

function valueChange(prop, v) {
  const { value } = this.$props;
  value[prop] = v;
  this.update();
}

export default @component('x-form-property-palette')
class FormPropertyPalette extends BaseElement {
  render() {
    const { value } = this.$props;
    return html`
    <div class="header">Property</div>
    <div class="x-form">
      <div class="field">
        <label style="width: 60px;">Required</label>
        <x-form-checkbox .value="${value.required}"
          @change="${valueChange.bind(this, 'required')}"></x-form-checkbox>
      </div>
      <div class="field">
        <label style="width: 60px;">Min </label>
        <x-form-input .type="int" max-length="6"
          .value="${value.min}" .width="80px"></x-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">Max </label>
        <x-form-input .type="int" .max-length="6"
          .value="${value.max}" .width="80px"></x-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">Precision </label>
        <x-form-select .value="${value.precision || 6}"
          .width="40px" .items="${[1, 2, 3, 4, 5, 6]}"></x-form-select>
      </div>
      <div class="field">
        <label style="width: 60px;">Options </label>
        <x-form-input .value="${value.options}" .width="80px"></x-form-input>
      </div>
    </div>
    `;
  }
}
