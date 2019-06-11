import Base from './base';
import ColorPalette from '../color-palette';
import Icon from '../../dom/icon';

export default class Color extends Base {
  constructor(iconName, color) {
    super(color, new Icon(iconName)
      .css('height', '16px')
      .css('border-bottom', `3px solid ${color}`));
    this.palette = new ColorPalette();
    this.palette.change = (v) => {
      this.update(v);
      this.change(v);
    };
  }

  showArrow() {
    return false;
  }

  content() {
    return [this.palette.el];
  }

  updateTitle(color) {
    this.title.css('border-color', color);
  }
}
