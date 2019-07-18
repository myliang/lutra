// mode: all | inside | horizontal | vertical | outside
//       left | top | right | bottom | none
// style: thin | medium | thick | dashed | dotted
// select: core.Select
function parse({ select, merges }, { mode, style, color }, cb) {
  const { single, range } = select;
  const {
    sri, sci, eri, eci,
  } = range;
  const nmerges = merges.filter(range);
  const mergeMap = new Map();
  nmerges.forEach((m) => {
    mergeMap.set(`${m.sri}-${m.sci}`, m.size());
  });

  const getMergeSize = (ri, ci) => mergeMap.get(`${ri}-${ci}`) || [1, 1];

  if (single && ['inside', 'horizontal', 'vertical'].includes(mode)) {
    return;
  }

  if (mode === 'none') {
    range.each((ri, ci) => cb(ri, ci));
  } else if (['top', 'bottom'].includes(mode)) {
    for (let ci = sci; ci <= eci; ci += 1) {
      const ri = mode === 'top' ? sri : eri;
      cb(ri, ci, { [`${mode}`]: [style, color] });
      ci += getMergeSize(ri, ci)[1] - 1;
    }
  } else if (['left', 'right'].includes(mode)) {
    for (let ri = sri; ri <= eri; ri += 1) {
      const ci = mode === 'left' ? sci : eci;
      cb(ri, ci, { [`${mode}`]: [style, color] });
      ri += getMergeSize(ri, ci)[0] - 1;
    }
  } else if (['all', 'inside', 'outside', 'horizontal', 'vertical'].includes(mode)) {
    select.each((ri, ci) => {
      let v = {};
      if (mode === 'all') {
        v = {
          top: [style, color],
          bottom: [style, color],
          left: [style, color],
          right: [style, color],
        };
      }
      if (['horizontal', 'inside'].includes(mode)) {
        if (ri < eri) v.bottom = [style, color];
      }
      if (['vertical', 'inside'].includes(mode)) {
        if (ci < eci) v.right = [style, color];
      }
      if (mode === 'outside') {
        if (ri === sri) v.top = [style, color];
        if (ci === sci) v.left = [style, color];
        if (ri === eri || single) v.bottom = [style, color];
        if (ci === eci || single) v.right = [style, color];
      }
      if (Object.keys(v).length > 0) {
        cb(ri, ci, v);
      }
    });
  }
}

export default {
  parse,
};
