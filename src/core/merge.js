function deleteWithin({ _ }, cellRange) {
  _.merges.filter(it => !it.within(cellRange));
}

function add(data, cellRange) {
  deleteWithin(data, cellRange);
  data.merges.push(cellRange);
}

function intersects({ _ }, cellRange) {
  for (let i = 0; i < _.merges.length; i += 1) {
    const it = _.merges[i];
    if (it.intersects(cellRange)) return true;
  }
  return false;
}

function union({ _ }, cellRange) {
  let ncr = cellRange;
  _.merges.forEach((it) => {
    if (it.intersects(ncr)) {
      ncr = it.union(ncr);
    }
  });
  return ncr;
}

export default {
  deleteWithin,
  add,
  intersects,
  union,
};
