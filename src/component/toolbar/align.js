import DropdownItem from './dropdown-item';
import DropdownAlign from '../dropdown/align';

export default class Align extends DropdownItem {
  constructor(value) {
    super('align', value);
  }

  dropdown() {
    return new DropdownAlign(this.value);
  }
}
