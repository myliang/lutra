import BaseComponent from '../base-component';
import tooltip from '../../dom/tooltip';
import { cssPrefix } from '../../config';
import { t } from '../../locale/locale';
import h from '../../dom/create-element';

export default class Item extends BaseComponent {
  constructor(tag, value, shortcut) {
    super(value);
    this.tag = tag;
    this.shortcut = shortcut;
  }

  get tipInfo() {
    const { tag, shortcut } = this;
    let msg = t(`toolbar.${tag.replace(/-[a-z]/g, c => c[1].toUpperCase())}`);
    if (shortcut) {
      msg = `${msg} (${shortcut})`;
    }
    return msg;
  }

  render() {
    const { tipInfo } = this;
    return h(`.${cssPrefix}-toolbar-item`)
      .on('mouseenter', evt => tooltip(tipInfo, evt.target))
      .attr('data-tooltip', tipInfo);
  }
}
