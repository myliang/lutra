import DropdownItem from './dropdown-item';
import DropdownColor from '../dropdown/color';

export default class TextColor extends DropdownItem {
  constructor(color) {
    super('color', color);
  }

  dropdown() {
    return new DropdownColor(this.tag, this.value);
  }
}
