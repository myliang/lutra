import {
  html, component,
} from './core';
import { onShow, onChange, Dropdown } from './dropdown';
import './color-palette';
import './icon';

export default @component('xfd-color-picker')
class ColorPicker extends Dropdown {
  render() {
    const { icon, color } = this.$props;
    const { $visible } = this;
    // console.log('icon:', icon, ', color:', color);
    return html`
    <xfd-icon .type="${icon}" @click="${onShow.call(this)}"
      style="border-bottom: 3px solid ${color}; height: 16px;">
    </xfd-icon>
    <xfd-color-palette class="content" .show="${$visible}"
      @change="${onChange.call(this)}"></xfd-color-palette>
    `;
  }
}
