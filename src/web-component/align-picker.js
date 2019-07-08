import {
  html, component,
} from './core';
import { onShow, onChange, Dropdown } from './dropdown';
import './icon';

export default @component('xfd-align-picker')
class AlignPicker extends Dropdown {
  render() {
    const { items, value } = this.$props;
    const { $visible } = this;
    return html`
    <xfd-icon .type="${`align-${value}`}" @click="${onShow.bind(this)}"></xfd-icon>
    </xfd-icon>
    <ul class="content xfd-list" .show="${$visible}">
      ${items.map(it => html`<li @click="${onChange.call(this, it)}"><xfd-icon .type="${`align-${it}`}"></xfd-icon></li>`)}
    </ul>
    `;
  }
}
