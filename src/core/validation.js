import helper from './helper';
import Base from './base';
import { xy2expr } from './alphabet';

class Validation {
  // ref: A1...
  // rule: { type, required, min, max, prescision, options, patttern }
  constructor(ref, key, rule) {
    this.refs = [ref];
    this.keys = [key];
    this.rule = rule;
  }

  includes(ref) {
    return this.refs.includes(ref);
  }

  findIndex(ref) {
    return this.refs.findIndex(it => it === ref);
  }

  findKey(ref) {
    const index = this.findIndex(ref);
    return index >= 0 ? this.key[index] : ref;
  }

  add(ref, key) {
    const { refs, keys } = this;
    if (!refs.includes(ref)) {
      refs.push(ref);
      keys.push(key);
    }
  }

  remove(ref) {
    const index = this.findIndex(ref);
    if (index >= 0) {
      this.refs.splice(index, 1);
      this.keys.splice(index, 1);
    }
  }
}


function findByRule(rule) {
  return this.$.find(it => helper.equals(it.rule, rule));
}

function add(ref, key, rule) {
  const item = findByRule.call(this, rule);
  if (item !== undefined) {
    item.add(ref, key);
  } else {
    this.$.push(new Validation(ref, key, rule));
  }
}

function remove() {
  const index = this.$.find(it => it.refs.length === 0);
  if (index > 0) this.$.splice(index, 1);
}

export default class Validations extends Base {
  constructor() {
    super([]);
  }

  get(ri, ci) {
    const ref = xy2expr(ci, ri);
    return this.$.find(it => it.includes(ref));
  }

  find(ri, ci, type) {
    const ref = xy2expr(ci, ri);
    const v = this.$.find(it => it.includes(ref));
    if (v !== undefined) {
      return { ref, key: v.findKey(ref), rule: v.rule };
    }
    return { ref, key: ref, rule: { type } };
  }

  update({ ref, key, rule }, isRemove = false) {
    if (isRemove) remove.call(this, ref);
    else add.call(this, ref, key, rule);
  }
}
