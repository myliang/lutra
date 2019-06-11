import DropdownItem from './dropdown-item';
import DropdownAlign from '../dropdown/align';

export default class Valign extends DropdownItem {
  constructor(value) {
    super('valign', value);
  }

  dropdown() {
    return new DropdownAlign(this.value, true);
  }
}
