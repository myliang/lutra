import {
  html, component,
} from './core';
import { onChange, Dropdown } from './dropdown';
import './icon';

export default @component('lutra-align-picker')
class AlignPicker extends Dropdown {
  render() {
    const { items, value } = this.$props;
    const { $visible } = this;
    return html`
    <lutra-icon .type="${`align-${value}`}"></lutra-icon>
    <ul class="content lutra-list" .show="${$visible}">
      ${items.map(it => html`<li @click.stop="${onChange.bind(this, it)}"><lutra-icon .type="${`align-${it}`}"></lutra-icon></li>`)}
    </ul>
    `;
  }
}
