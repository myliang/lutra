function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function mergeDeep(object = {}, ...sources) {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const v = source[key];
      // console.log('k:', key, ', v:', source[key], typeof v, v instanceof Object);
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        object[key] = v;
      } else if (typeof v !== 'function' && !Array.isArray(v) && v instanceof Object) {
        object[key] = object[key] || {};
        mergeDeep(object[key], v);
      } else {
        object[key] = v;
      }
    });
  });
  return object;
}

function rangeSum(min, max, getv) {
  let total = 0;
  for (let i = min; i < max; i += 1) total += getv(i);
  return total;
}

function rangeEach(min, max, getv, cb) {
  let total = 0;
  for (let i = min; i < max; i += 1) {
    const v = getv(i);
    cb(i, v, total);
    total += v;
  }
}

function rangeIf(min, max, getv, cb) {
  let total = 0;
  let lasti = 0;
  for (let i = min; i < max; i += 1) {
    total += getv(i);
    lasti = i;
    if (cb(total)) break;
  }
  return lasti;
}

export default {
  clone,
  merge: (...sources) => mergeDeep({}, ...sources),
  rangeSum,
  rangeEach,
  rangeIf,
};
