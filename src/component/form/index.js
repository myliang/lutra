import './input';
import './checkbox';
import './select';

export function validate() {
  const elements = this.querySelectorAll('lutra-input, lutra-checkbox, lutra-select');
  return Array.from(elements).every(it => it.validate());
}

export default {};
