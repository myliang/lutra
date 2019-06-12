import Base from './base';
import Icon from '../../dom/icon';
import h from '../../dom/create-element';
import { cssPrefix } from '../../config';

const verticalAligns = ['top', 'middle', 'bottom'];
const horizontalAligns = ['left', 'center', 'right'];

export default class Align extends Base {
  constructor(value, vertical = false) {
    super(value, new Icon(`align-${value}`));
    this.vertical = vertical;
  }

  content() {
    const values = this.vertical ? verticalAligns : horizontalAligns;
    return values.map(it => h(`.${cssPrefix}-item`, new Icon(`align-${it}`))
      .on('click', () => {
        this.update(it);
        this.change(it);
      }));
  }

  updateTitle(value) {
    this.title.update(`aling-${value}`);
  }
}
