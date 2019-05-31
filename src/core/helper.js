function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function merge(...sources) {
  const object = {};
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const v = source[key];
      // console.log('k:', key, ', v:', source[key], typeof v, v instanceof Object);
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        object[key] = v;
      } else if (typeof v !== 'function' && !Array.isArray(v) && v instanceof Object) {
        object[key] = object[key] || {};
        merge(object[key], v);
      } else {
        object[key] = v;
      }
    });
  });
  return object;
}

function rangeSum(min, max, v) {
  let total = 0;
  for (let i = min; i < max; i += 1) total += v(i);
  return total;
}

export default {
  clone,
  merge,
  rangeSum,
};
