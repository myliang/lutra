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
  if (required !== undefined && (v === undefined || /^\s*$/.test(v))) {
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
  if (errors.length > 0) {
    return false;
  }
  return true;
}

export function updateClassList() {
  const { $props, $errors, classList } = this;
  if ($props.required !== undefined) {
    classList.add('required');
  }
  if ($errors.length > 0) {
    classList.add('error');
  } else {
    classList.remove('error');
  }
}

export class Base extends BaseElement {
  $errors = [];

  validate() {
    const ret = validate.call(this, this.$props.value);
    if (!ret) this.update();
    return ret;
  }
}
