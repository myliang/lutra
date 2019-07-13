import { html, BaseElement, component } from './core';
import { t } from '../locale/locale';

function buildItems() {
  const { items } = this.$props;
  return Object.entries(items).map(([k, v]) => {
    const name = v.name || t(`form.${k}`);
    return html`<li>${name}</li>`;
  });
}

export default @component('x-form-palette')
class FormPicker extends BaseElement {
  render() {
    return html`
    <div class="header">${t('form.palette')}</div> 
    <ul class="x-list">
      ${buildItems.call(this)}
    </ul>
    `;
  }
}
