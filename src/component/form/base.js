import { BaseElement } from '../../core';
import { t } from '../../locale/locale';

const patterns = {
  integer: /^\d+$/,
  key: /^[a-zA-Z0-9\-_]+$/,
  number: /(^\d+$)|(^\d+(\.\d{0,4})?$)/,
};

export function validate(v) {
  // console.log('input.v:', v);
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
    if (pattern !== undefined && !pattern.test(v)) {
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
  this.$errors = errors;
  // this.update();
  if (errors.length > 0) {
    return false;
  }
  this.change(v);
  return true;
}

export class Base extends BaseElement {
  $errors = [];

  validate() {
    return validate.call(this, this.$props.value);
  }
}
