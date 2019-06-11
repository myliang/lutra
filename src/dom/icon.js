import { cssPrefix } from '../config';
import { CreateElement } from './create-element';

export default class Icon extends CreateElement {
  constructor(iconName) {
    super(`.${cssPrefix}-icon`, new CreateElement(`.${cssPrefix}-icon-img.${iconName}`));
    this.iconName = iconName;
  }

  update(name) {
    const { el, iconName } = this;
    el.child.removeClass(iconName).addClass(name);
    this.iconName = name;
  }
}
