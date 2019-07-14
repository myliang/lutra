import {
  html, component,
} from './core';
import { onChange, Dropdown } from './dropdown';
import './color-palette';
import './icon';

export default @component('lutra-color-picker')
class ColorPicker extends Dropdown {
  render() {
    const { icon, value } = this.$props;
    const { $visible } = this;
    return html`
    <lutra-icon .type="${icon}"
      style="border-bottom: 3px solid ${value}; height: 16px;">
    </lutra-icon>
    <lutra-color-palette class="content" .show="${$visible}"
      @change="${onChange.bind(this)}"></lutra-color-palette>
    `;
  }
}
