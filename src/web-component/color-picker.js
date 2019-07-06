import {
  html, component,
} from './core';
import { onShow, onChange, Dropdown } from './dropdown';
import './color-palette';
import './icon';

export default @component('xfd-color-picker')
class ColorPicker extends Dropdown {
  render() {
    const { icon, value } = this.$props;
    const { $visible } = this;
    return html`
    <xfd-icon .type="${icon}" @click="${onShow.bind(this)}"
      style="border-bottom: 3px solid ${value}; height: 16px;">
    </xfd-icon>
    <xfd-color-palette class="content" .show="${$visible}"
      @change="${onChange.bind(this)}"></xfd-color-palette>
    `;
  }
}
