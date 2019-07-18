import {
  html, component,
} from '../core';
import './icon';
import './line-type-picker';
import './color-picker';
import { onChange, Dropdown } from './dropdown';

const modes1 = ['all', 'inside', 'horizontal', 'vertical', 'outside'];
const modes2 = ['left', 'top', 'right', 'bottom', 'none'];

function modeChange(mode, evt) {
  const { color, style } = this.$state;
  onChange.call(this, { mode, color, style }, evt);
}

function colorChange(v) {
  this.$state.color = v;
  this.update();
}

function lineTypeChange(v) {
  this.$state.style = v;
  this.update();
}

function buildItems(items) {
  return items.map(it => html`
    <div class="item">
      <lutra-icon .type="${`border-${it}`}"
        @click.stop="${modeChange.bind(this, it)}"></lutra-icon>
    </div>
    `);
}

const loop = () => {};

export default @component('lutra-border-picker')
class BorderPicker extends Dropdown {
  $state = {
    color: '#000000',
    style: 'thin',
  }

  render() {
    const { color, style } = this.$state;
    const { $visible } = this;
    return html`
    <lutra-icon .type="border-all"></lutra-icon>
    <div class="content bottom left" .show="${$visible}" @click.stop="${loop}">
      <table>
        <tbody>
          <tr>
            <td class="left">
              <div class="lutra-menu horizontal">
                ${buildItems.call(this, modes1)}
              </div>
              <div class="lutra-menu horizontal">
                ${buildItems.call(this, modes2)}
              </div>
            </td>
            <td class="right">
              <div class="lutra-menu">
                <lutra-color-picker class="item bottom left" 
                  .icon="line-color"
                  .value="${color}"
                  @change="${colorChange.bind(this)}"
                  ></lutra-color-picker>
                <lutra-line-type-picker class="item"
                  .value="${style}"
                  @change="${lineTypeChange.bind(this)}"
                  ></lutra-line-type-picker>
              </div>
            </td>
          </tr>
        <tbody>
      </table>
    </div>
    `;
  }
}
