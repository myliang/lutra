import { html, BaseElement, component } from './core';
import { t } from '../locale/locale';

const patterns = {
  integer: /^\d+$/,
  number: /(^\d+$)|(^\d+(\.\d{0,4})?$)/,
};

function validate(v) {
  const {
    type, required, min, max, maxLength,
  } = this.$props;
  let { pattern } = this.$props;
  const errors = [];
  if (required !== undefined && /^\s*$/.test(v)) {
    errors.push(t('validation.required'));
  }

  if (!/^\s*$/.test(v)) {
    if (type !== undefined) pattern = patterns[type];
    if (!pattern.test(v)) {
      errors.push(t('validation.notMatch'));
    }

    if (min !== undefined && v < min) {
      errors.push(t('validation.greaterThan', min));
    }

    if (max !== undefined && v > max) {
      errors.push(t('validation.lessThan', max));
    }

    if (maxLength !== undefined && v.length > maxLength) {
      errors.push(t('validation.maxLength', maxLength));
    }
  }

  // console.log('errors:', errors);
  this.$state.errors = errors;
  this.update();
  if (errors.length > 0) {
    return false;
  }
  return true;
}

export default @component('lutra-form-input')
class FormInput extends BaseElement {
  $state = {
    errors: [],
  };

  render() {
    const { width, value } = this.$props;
    const { errors } = this.$state;
    // console.log('errors>:', errors);
    if (errors.length > 0) {
      this.classList.add('error');
    } else {
      this.classList.remove('error');
    }
    return html`
    <input style="width: ${width || 'auto'};"
      @input="${evt => validate.call(this, evt.target.value)}"
      type="text" value="${value}"></input>
    <div class="tip">${errors[0]}</div>
    `;
  }
}
