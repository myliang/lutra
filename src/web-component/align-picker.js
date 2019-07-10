import {
  html, component,
} from './core';
import { onShow, onChange, Dropdown } from './dropdown';
import './icon';

export default @component('x-align-picker')
class AlignPicker extends Dropdown {
  render() {
    const { items, value } = this.$props;
    const { $visible } = this;
    return html`
    <x-icon .type="${`align-${value}`}" @click="${onShow.bind(this)}"></x-icon>
    </x-icon>
    <ul class="content x-list" .show="${$visible}">
      ${items.map(it => html`<li @click="${onChange.bind(this, it)}"><x-icon .type="${`align-${it}`}"></x-icon></li>`)}
    </ul>
    `;
  }
}
