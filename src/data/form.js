/*
 * name, icon, fields, validator
 */
const types = {
  text: {
    fields: ['required', 'pattern'],
  },
  integer: {
    fields: ['required', 'min', 'max'],
    validator() {},
  },
  number: {
    fields: ['required', 'min', 'max', 'precision'],
    validator() {},
  },
  /*
  email: {
    name: 'email',
    icon: '@',
    fields: ['required'],
    validator() {},
  },
  phone: {
    name: 'phone',
    icon: '',
    fields: ['required'],
    validator() {},
  },
  */
  bool: {
    fields: [],
  },
  radio: {
    fields: ['required', 'options'],
    validator() {},
  },
  checkbox: {
    fields: ['required', 'options'],
    validator() {},
  },
  select: {
    fields: ['required', 'options'],
    validator() {},
  },
  date: {
    fields: ['required'],
    validator() {},
  },
};

export default {
  types,
};
