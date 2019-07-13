export default {
  integer: {
    name: 'integer',
    icon: '',
    props: ['required', 'min', 'max'],
    validator(rules, v) {
    },
  },
  number: {
    name: 'number',
    icon: '',
    props: ['required', 'min', 'max', 'precision'],
    validator(rules, v) {},
  },
  email: {
    name: 'email',
    icon: '@',
    props: ['required'],
    validator(rules, v) {},
  },
  phone: {
    name: 'phone',
    icon: '',
    props: ['required'],
    validator(rules, v) {},
  },
  radio: {
    name: 'radio',
    icon: '',
    props: ['required'],
    validator(rules, v) {},
  },
  checkbox: {
    name: 'checkbox',
    icon: '',
    props: ['required'],
    validator(rules, v) {},
  },
  select: {
    name: 'select',
    icon: '',
    props: ['required', 'options'],
    validator(rules, v) {},
  },
  date: {
    name: 'date',
    icon: '',
    props: ['required'],
    validator(rules, v) {},
  },
};
