import {
  html, component,
} from './core';
import './icon';
import './line-type-picker';
import './color-picker';
import { onShow, onChange, Dropdown } from './dropdown';

const modes1 = ['all', 'inside', 'horizontal', 'vertical', 'outside'];
const modes2 = ['left', 'top', 'right', 'bottom', 'none'];

function buildItems(items) {
  return items.map(it => html`
    <div class="item">
      <xfd-icon .type="${`border-${it}`}"
        @click="${onChange.call(this, it)}"></xfd-icon>
    </div>
    `);
}

export default @component('xfd-border-picker')
class BorderPicker extends Dropdown {
  $state = {
    lineColor: '#000000',
    lineStyle: 'thin',
  }

  render() {
    const { lineColor, lineStyle } = this.$state;
    const { $visible } = this;
    return html`
    <xfd-icon .type="border-all" @click="${onShow.call(this)}"></xfd-icon>
    <div class="content" .show="${$visible}">
      <table>
        <tbody>
          <tr>
            <td class="left">
              <div class="xfd-menu horizontal">
                ${buildItems.call(this, modes1)}
              </div>
              <div class="xfd-menu horizontal">
                ${buildItems.call(this, modes2)}
              </div>
            </td>
            <td class="right">
              <div class="xfd-menu">
                <xfd-color-picker class="item bottom left" 
                  .icon="line-color"
                  .color="${lineColor}"></xfd-color-picker>
                <xfd-line-type-picker class="item"
                  .checked="${lineStyle}"></xfd-line-type-picker>
              </div>
            </td>
          </tr>
        <tbody>
      </table>
    </div>
    `;
  }
}
