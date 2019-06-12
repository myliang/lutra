import { cssPrefix } from '../config';
import { CreateElement } from './create-element';

export default class Icon extends CreateElement {
  constructor(iconName) {
    super(`.${cssPrefix}-icon`, new CreateElement(`.${cssPrefix}-icon-img.${iconName}`));
    this.iconName = iconName;
  }

  update(name) {
    const { iconName } = this;
    if (name !== iconName) {
      this.child().addClass(name).removeClass(iconName);
      this.iconName = name;
    }
  }
}
