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
      } else if (Array.isArray(v)) {
        object[key] = object[key] || [];
        object[key].push(...v);
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

function equals(obj1, obj2) {
  const keys = Object.keys(obj1);
  if (keys.length !== Object.keys(obj2).length) return false;
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i];
    const v1 = obj1[k];
    const v2 = obj2[k];
    if (v2 === undefined) return false;
    if (typeof v1 === 'string' || typeof v1 === 'number' || typeof v1 === 'boolean') {
      if (v1 !== v2) return false;
    } else if (Array.isArray(v1)) {
      if (v1.length !== v2.length) return false;
      for (let ai = 0; ai < v1.length; ai += 1) {
        if (!equals(v1[ai], v2[ai])) return false;
      }
    } else if (typeof v1 !== 'function' && !Array.isArray(v1) && v1 instanceof Object) {
      if (!equals(v1, v2)) return false;
    }
  }
  return true;
}

function rangeSum(min, max, getv) {
  let total = 0;
  if (max >= min) {
    for (let i = min; i < max; i += 1) total += getv(i);
  } else {
    for (let i = max; i < min; i += 1) total -= getv(i);
  }
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
  let lastv = 0;
  for (let i = min; i < max; i += 1) {
    lasti = i;
    lastv = getv(i);
    total += lastv;
    if (cb(total)) break;
  }
  // console.log(lasti, total, lastv);
  return [lasti, total - lastv, lastv];
}

export default {
  clone,
  mergeDeep,
  merge: (...sources) => mergeDeep({}, ...sources),
  rangeSum,
  rangeEach,
  rangeIf,
  equals,
};
