export default {
  integer: {
    name: 'integer',
    icon: '',
    props: ['required', 'min', 'max'],
    validator() {},
  },
  number: {
    name: 'number',
    icon: '',
    props: ['required', 'min', 'max', 'precision'],
    validator() {},
  },
  email: {
    name: 'email',
    icon: '@',
    props: ['required'],
    validator() {},
  },
  phone: {
    name: 'phone',
    icon: '',
    props: ['required'],
    validator() {},
  },
  radio: {
    name: 'radio',
    icon: '',
    props: ['required'],
    validator() {},
  },
  checkbox: {
    name: 'checkbox',
    icon: '',
    props: ['required'],
    validator() {},
  },
  select: {
    name: 'select',
    icon: '',
    props: ['required', 'options'],
    validator() {},
  },
  date: {
    name: 'date',
    icon: '',
    props: ['required'],
    validator() {},
  },
};
