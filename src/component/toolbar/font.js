import DropdownItem from './dropdown-item';
import DropdownFont from '../dropdown/font';

export default class Font extends DropdownItem {
  constructor() {
    super('font-name');
  }

  getValue(it) {
    return it.key;
  }

  dropdown() {
    return new DropdownFont();
  }
}
