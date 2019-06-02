import helper from './helper';

function rows({ _ }, v) {
  if (v) _.rows = v;
  return _.rows;
}

function row(data, index) {
  return undefined || rows(data)[index];
}

function nrow(data, index) {
  rows(data)[index] = {};
  return rows(data)[index];
}

function drow({ settings }) {
  return settings.row;
}

function height(data, index, h) {
  let r = row(data, index);
  if (h) {
    r = r || nrow(data, index);
    r.height = h;
    return h;
  }
  return (r && r.height) || drow(data).height;
}

function len(data, v) {
  if (v) {
    rows(data).len = len(data) + v;
    return v;
  }
  return rows(data).len || drow(data).len;
}

function sumHeight(data, min, max) {
  return helper.rangeSum(min, max, i => height(data, i));
}

function totalHeight(data) {
  return sumHeight(data, 0, len(data));
}

function endIndex(data, si, threshold) {
  return helper.rangeIf(si, len(data), i => height(data, i), total => total > threshold);
}

function each(data, cb) {
  Object.entries(rows(data)).forEach(([i, r]) => cb(i, r));
}

function update(data, n, cb) {
  const nrows = {};
  each(data, (ri) => {
    const nri = cb(ri, row);
    if (nri > 0) nrows[nri] = row;
  });
  rows(data, nrows);
  len(data, n);
}

function add(data, sri, n = 1) {
  update(data, n, (ri) => {
    let nri = parseInt(ri, 10);
    if (nri >= sri) nri += n;
    return nri;
  });
}

function remove(data, sri, eri) {
  const n = eri - sri + 1;
  update(data, -n, (ri) => {
    const nri = parseInt(ri, 10);
    if (nri < sri) return nri;
    if (nri > eri) return nri - n;
    return -1;
  });
}

Object.assign(row, {
  height,
  len,
  sumHeight,
  totalHeight,
  endIndex,
  add,
  remove,
});
export default row;
