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

export default @component('lutra-form-property-palette')
class FormPropertyPalette extends BaseElement {
  render() {
    const { value } = this.$props;
    return html`
    <div class="header">${t('form.property.title')}</div>
    <div class="lutra-form">
      <div class="field">
        <label style="width: 60px;">${t('form.property.required')}</label>
        <lutra-form-checkbox .value="${value.required}"
          @change="${valueChange.bind(this, 'required')}"></lutra-form-checkbox>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.min')}</label>
        <lutra-form-input .type="number" .max-length="6"
          .value="${value.min}" .width="80px"></lutra-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.max')}</label>
        <lutra-form-input .type="number" .max-length="6"
          .value="${value.max}" .width="80px"></lutra-form-input>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.precision')}</label>
        <lutra-form-select class="bottom left" .value="${value.precision || 6}"
          .width="46px" .items="${[1, 2, 3, 4, 5, 6]}"></lutra-form-select>
      </div>
      <div class="field">
        <label style="width: 60px;">${t('form.property.options')}</label>
        <lutra-form-input .value="${value.options}" .width="80px"></lutra-form-input>
      </div>
    </div>
    `;
  }
}
