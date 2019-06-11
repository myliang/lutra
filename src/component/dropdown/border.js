import Base from './base';
import BorderPalette from '../border-palette';
import Icon from '../../dom/icon';

export default class Border extends Base {
  constructor() {
    super({}, new Icon('border-all'));
    this.palette = new BorderPalette();
    this.palette.change = (v) => {
      this.change(v);
    };
  }

  showArrow() {
    return false;
  }

  content() {
    return [this.palette.el];
  }

  updateTitle() {}
}
