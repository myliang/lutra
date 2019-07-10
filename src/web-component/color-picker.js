import {
  html, component,
} from './core';
import { onChange, Dropdown } from './dropdown';
import './color-palette';
import './icon';

export default @component('x-color-picker')
class ColorPicker extends Dropdown {
  render() {
    const { icon, value } = this.$props;
    const { $visible } = this;
    return html`
    <x-icon .type="${icon}"
      style="border-bottom: 3px solid ${value}; height: 16px;">
    </x-icon>
    <x-color-palette class="content" .show="${$visible}"
      @change="${onChange.bind(this)}"></x-color-palette>
    `;
  }
}
