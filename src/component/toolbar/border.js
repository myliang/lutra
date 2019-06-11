import DropdownItem from './dropdown-item';
import DropdownBorder from '../dropdown/border';

export default class Border extends DropdownItem {
  constructor() {
    super('border', {});
  }

  dropdown() {
    return new DropdownBorder();
  }
}
