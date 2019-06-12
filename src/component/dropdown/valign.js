import Base from './base';
import Icon from '../../dom/icon';
import h from '../../dom/create-element';
import { cssPrefix } from '../../config';

export default class Valign extends Base {
  constructor(value) {
    super(value, new Icon(`align-${value}`));
  }

  content() {
    return ['left', 'center', 'right'].map(it => h(`.${cssPrefix}-item`, new Icon(`align-${it}`))
      .on('click', () => {
        this.update(it);
        this.change(it);
      }));
  }

  updateTitle(value) {
    this.title.update(`align-${value}`);
  }
}
