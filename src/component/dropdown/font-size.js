import Base from './base';
import { fontSizes } from '../../core/font';
import { cssPrefix } from '../../config';
import h from '../../dom/create-element';

export default class FontSize extends Base {
  constructor() {
    super(10, '10');
  }

  width() {
    return '60px';
  }

  content() {
    return fontSizes.map(it => h(`.${cssPrefix}-item`, `${it.pt}`)
      .on('click', () => {
        this.update(it.pt);
        this.change(it);
      }));
  }
}
