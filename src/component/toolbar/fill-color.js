import DropdownItem from './dropdown-item';
import DropdownColor from '../dropdown/color';

export default class FillColor extends DropdownItem {
  constructor(color) {
    super('bgcolor', color);
  }

  dropdown() {
    return new DropdownColor(this.tag, this.value);
  }
}
