import DropdownItem from './dropdown-item';
import DropdownFontSize from '../dropdown/font-size';

export default class FontSize extends DropdownItem {
  constructor() {
    super('font-size');
  }

  getValue(it) {
    return it.pt;
  }

  dropdown() {
    return new DropdownFontSize();
  }
}
