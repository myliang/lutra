import { html, component, loop } from '../../core';
import { Base, validate } from './base';

export default @component('lutra-input')
class Input extends Base {
  render() {
    const { width, value } = this.$props;
    const { $errors } = this;
    // console.log('errors>:', errors, ', value:', value);
    if ($errors.length > 0) {
      this.classList.add('error');
    } else {
      this.classList.remove('error');
    }
    return html`
    <input style="width: ${width || 'auto'};"
      @input="${evt => validate.call(this, evt.target.value)}"
      @change.stop="${loop}"
      type="text" .value="${value || ''}"></input>
    <div class="tip">${$errors[0]}</div>
    `;
  }
}
