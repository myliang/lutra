/* global document */
import { html, BaseElement, component } from './core';
import { t } from '../locale/locale';

function dragstart(type, { dataTransfer, target }) {
  // console.log(':::::::>');
  const crt = document.createElement('div');
  crt.className = 'lutra-drag';
  crt.innerHTML = target.innerHTML;
  target.dragEl = crt;
  document.body.appendChild(crt);
  dataTransfer.setDragImage(crt, 20, 10);
  dataTransfer.dropEffect = 'move';
  dataTransfer.setData('type', type);
}

function dragend({ dataTransfer, target }) {
  // console.log('dragend:');
  document.body.removeChild(target.dragEl);
  delete target.dragEl;
  dataTransfer.clearData();
}

function buildItems() {
  const { items } = this.$props;
  return Object.entries(items).map(([k, v]) => {
    const name = v.name || t(`form.${k}`);
    return html`
    <li draggable="true"
      @dragend="${dragend.bind(this)}"
      @dragstart="${dragstart.bind(this, k)}">${name}</li>
    `;
  });
}

export default @component('lutra-form-palette')
class FormPicker extends BaseElement {
  render() {
    return html`
    <div class="header">${t('form.palette')}</div> 
    <ul class="lutra-list">
      ${buildItems.call(this)}
    </ul>
    `;
  }
}
