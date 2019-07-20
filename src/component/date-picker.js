import { html, component } from '../core';
import { onChange, Dropdown } from './dropdown';
import './calendar';

function cellRender(type, v) {
  return type === 'day' ? v.getDate() : v;
}

export default @component('lutra-date-picker')
class DatePicker extends Dropdown {
  render() {
    return html`
    <lutra-calendar .cell-render="${cellRender.bind(this)}"
      @change="${onChange.bind(this)}"
      ></lutra-calendar>
    `;
  }
}
