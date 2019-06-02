import row from './row';
import helper from './helper';

function styles({ _ }) {
  return _.styles;
}

function dstyle({ settings }) {
  return settings.style;
}

function cell(data, ri, ci) {
  const r = row(data, ri);
  return undefined || (r && r.cells && r.cells[ci]);
}

function style(data, ri, ci) {
  // console.log('data:', data);
  const c = cell(data, ri, ci);
  let s = {};
  if (c) {
    if (c.style) {
      s = styles(data)[c.style];
    }
  }
  return helper.merge(dstyle(data), s);
}

cell.style = style;
export default cell;
