import {
  html, component,
} from '../core';
import { onChange, Dropdown } from './dropdown';

const lineTypes = [
  ['thin', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>'],
  ['medium', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>'],
  ['thick', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>'],
  ['dashed', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>'],
  ['dotted', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>'],
];

function buildItems() {
  const { value } = this.$props;
  return lineTypes.map(([type, svg]) => {
    const stateChecked = type === value ? 'checked' : '';
    return html`
      <li class="state ${stateChecked}"
        @click.stop="${onChange.bind(this, type)}"
        .html="${svg}">
      </li>`;
  });
}

export default @component('lutra-line-type-picker')
class LineTypePicker extends Dropdown {
  render() {
    const { $visible } = this;
    return html`
    <lutra-icon .type="line-type"></lutra-icon>
    <ul class="content lutra-list" .show="${$visible}">
      ${buildItems.call(this)}
    </ul>
    `;
  }
}
