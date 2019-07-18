import { html, component, loop } from '../../core';
import { Base, validate, updateClassList } from './base';

function updateTip(show) {
  this.$state.tipShow = show && this.$errors.length > 0;
  this.update();
}

export default @component('lutra-input')
class Input extends Base {
  $state = {
    tipShow: false,
  };

  render() {
    const {
      width, value, hint,
    } = this.$props;
    const { $errors, $state } = this;
    updateClassList.call(this);
    return html`
    <input style="width: ${width || 'auto'};"
      placeholder="${hint}"
      @input="${evt => validate.call(this, evt.target.value)}"
      @change.stop="${loop}"
      @focus="${updateTip.bind(this, true)}"
      @blur="${updateTip.bind(this, false)}"
      type="text" .value="${value || ''}"></input>
    <div class="tip" .show="${$state.tipShow}">${$errors[0]}</div>
    `;
  }
}
