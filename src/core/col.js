import helper from './helper';

function cols({ _ }, v) {
  if (v) _.cols = v;
  return _.cols;
}

function col(data, index) {
  return undefined || cols(data)[index];
}

function ncol({ _ }, index) {
  _.cols[index] = {};
  return _.cols[index];
}

function dcol({ settings }) {
  return settings.col;
}

function width(data, index, w) {
  let c = col(data, index);
  if (w) {
    c = c || ncol(data, index);
    c.width = w;
    return w;
  }
  return (c && c.width) || dcol(data).width;
}

function len(data, v) {
  if (v) {
    cols(data).len = len(data) + v;
    return v;
  }
  return cols(data).len || dcol(data).len;
}

function sumWidth(data, min, max) {
  return helper.rangeSum(min, max, i => width(data, i));
}

function totalWidth(data) {
  return sumWidth(0, len(data));
}

function endIndex(data, si, threshold) {
  return helper.rangeIf(si, len(data), i => width(data, i), total => total > threshold);
}

function update(data, n, cb) {
  const { rows } = data._;
  Object.entries(rows).forEach(([ri, row]) => {
    if (row.cells) {
      const ncells = {};
      Object.entries(row.cells).forEach(([ci, cell]) => {
        const nci = cb(ci, cell, ri, row);
        if (nci > 0) ncells[nci] = cell;
      });
      row.cells = ncells;
    }
  });
  len(data, n);
}

function add(data, sci, n = 1) {
  update(data, n, (ci) => {
    let nci = parseInt(ci, 10);
    if (nci >= sci) nci += n;
    return nci;
  });
}

function remove(data, sci, eci) {
  const n = eci - sci + 1;
  update(data, -n, (ci) => {
    const nci = parseInt(ci, 10);
    if (nci < sci) return nci;
    if (nci > eci) return nci - n;
    return -1;
  });
}

export default {
  width,
  len,
  sumWidth,
  totalWidth,
  endIndex,
  add,
  remove,
};
