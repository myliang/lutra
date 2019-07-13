import { html, BaseElement, component } from './core';
import './form-input';
import './form-checkbox';
import './form-select';
import { t } from '../locale/locale';

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
    <div class="header">${t('form.property.title')}</div>
    <div class="x-form">
      <div class="field">
        <label style="width: 60px;">${t('form.property.required')}</label>
        <x-form-checkbox .value="${value.required}"
          @change="${valueChange.bind(this, 'required')}"></x-form-checkbox>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.min')}</label>
        <x-form-input .type="number" .max-length="6"
          .value="${value.min}" .width="80px"></x-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.max')}</label>
        <x-form-input .type="number" .max-length="6"
          .value="${value.max}" .width="80px"></x-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.precision')}</label>
        <x-form-select .value="${value.precision || 6}"
          .width="40px" .items="${[1, 2, 3, 4, 5, 6]}"></x-form-select>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.options')}</label>
        <x-form-input .value="${value.options}" .width="80px"></x-form-input>
      </div>
    </div>
    `;
  }
}
