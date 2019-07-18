export default {
  integer: {
    name: 'integer',
    icon: '',
    fields: ['required', 'min', 'max'],
    validator() {},
  },
  number: {
    name: 'number',
    icon: '',
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
  radio: {
    name: 'radio',
    icon: '',
    fields: ['required', 'options'],
    validator() {},
  },
  checkbox: {
    name: 'checkbox',
    icon: '',
    fields: ['required', 'options'],
    validator() {},
  },
  select: {
    name: 'select',
    icon: '',
    fields: ['required', 'options'],
    validator() {},
  },
  date: {
    name: 'date',
    icon: '',
    fields: ['required'],
    validator() {},
  },
};
