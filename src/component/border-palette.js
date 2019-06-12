import BaseComponent from './base-component';
import { cssPrefix } from '../config';
import h from '../dom/create-element';
import Icon from '../dom/icon';
import DropdownColor from './dropdown/color';
import DropdownLineType from './dropdown/line-type';

const modes1 = ['all', 'inside', 'horizontal', 'vertical', 'outside'];
const modes2 = ['left', 'top', 'right', 'bottom', 'none'];

function buildTd(iconName) {
  return h('td',
    h(`.${cssPrefix}-border-palette-cell`,
      new Icon(`border-${iconName}`))
      .on('click', () => {
        this.value.mode = iconName;
        this.change(this.value);
      }));
}

export default class BorderPalette extends BaseComponent {
  constructor() {
    super({ color: '#000', style: 'thin', mode: 'all' });
    this.lineColor = new DropdownColor('line-color', '#000');
    this.lineType = new DropdownLineType('thin');

    this.lineColor.change = (v) => {
      this.value.color = v;
    };
    this.lineType.change = (v) => {
      this.value.style = v;
    };
  }

  render() {
    return h(`.${cssPrefix}-border-palette`,
      h('table',
        h('tbody',
          h('tr',
            h(`td.${cssPrefix}-border-palette-left`,
              h('table',
                h('tbody',
                  h('tr', ...modes1.map(it => buildTd.call(this, it))),
                  h('tr', ...modes2.map(it => buildTd.call(this, it)))))),
            h(`td.${cssPrefix}-border-palette-right`,
              h(`.${cssPrefix}-toolbar-item`, this.lineColor.el),
              h(`.${cssPrefix}-toolbar-item`, this.lineType.el))))));
  }
}
