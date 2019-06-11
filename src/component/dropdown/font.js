import Base from './base';
import { fonts } from '../../core/font';
import { cssPrefix } from '../../config';
import h from '../../dom/create-element';

export default class Font extends Base {
  constructor() {
    const f = fonts[0];
    super(f.key, f.title);
  }

  width() {
    return '160px';
  }

  content() {
    return fonts.map(it => h(`.${cssPrefix}-item`, it.title)
      .on('click', () => {
        this.update(it.title);
        this.change(it);
      }));
  }
}
