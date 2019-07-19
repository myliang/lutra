import { html, component, loop } from '../../core';
import { Base, validate, updateClassList } from './base';

function updateTip(show) {
  const { $state } = this;
  $state.tipShow = this.$errors.length > 0;
  if (!show) $state.tipShow = false;
  this.update();
}

function inputHandler(evt) {
  const { value } = evt.target;
  this.$state.tipShow = !validate.call(this, value);
  this.change(value);
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
      @input="${inputHandler.bind(this)}"
      @change.stop="${loop}"
      @focus.stop="${updateTip.bind(this, true)}"
      @blur.stop="${updateTip.bind(this, false)}"
      type="text" .value="${value || ''}"></input>
    <div class="tip" .show="${$state.tipShow}">${$errors[0]}</div>
    `;
  }
}
