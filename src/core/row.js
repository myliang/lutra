import helper from './helper';

function update(n, cb) {
  const { $ } = this;
  this.each((ri, r) => {
    const nri = cb(ri, r);
    if (nri > 0) {
      if (nri !== ri) {
        $[nri] = r;
        delete $[ri];
      }
    }
  });
  this.len(n);
}

function updateColumn(n, cb) {
  this.each((ri, { cells }) => {
    if (cells) {
      Object.entries(cells).forEach(([ci, c]) => {
        const nci = cb(ci, c, ri);
        if (nci > 0) {
          cells[nci] = c;
          delete cells[ci];
        }
      });
    }
  });
}

function add(si, n = 1, updateFunc) {
  updateFunc.call(this, n, (i) => {
    let ni = parseInt(i, 10);
    if (ni >= si) ni += n;
    return ni;
  });
}

function remove(si, ei, updateFunc) {
  const n = ei - si + 1;
  updateFunc.call(this, -n, (i) => {
    const ni = parseInt(i, 10);
    if (ni < si) return ni;
    if (ni > ei) return ni - n;
    return -1;
  });
}

export default class Rows {
  constructor({ rows }, { row }) {
    this.$ = rows;
    this.settings = row;
  }

  get(i) {
    return this.$[i];
  }

  height(i, v) {
    const { $, settings } = this;
    const r = $[i];
    if (v !== undefined) {
      if (r) {
        r.height = v;
      } else {
        $[i] = { height: v };
      }
      return v;
    }
    return (r && r.height) || settings.height;
  }

  heights(min, max, cb) {
    helper.rangeEach(min, max, i => this.height(i), cb);
  }

  len(v) {
    const { $, settings } = this;
    if (v) {
      $.len = this.len() + v;
      return $.len;
    }
    return $.len || settings.len;
  }

  each(cb) {
    Object.entries(this.$).forEach(([i, r]) => cb(i, r));
  }

  // si: start-index
  // threshold
  // return [index, total]
  end(si, threshold) {
    return helper.rangeIf(si, this.len(), i => this.height(i), total => total > threshold);
  }

  sumHeight(min, max) {
    return helper.rangeSum(min, max, i => this.height(i));
  }

  totalHeight() {
    return this.sumHeight(0, this.len());
  }

  // type: row | col
  add(si, n = 1, type = 'row') {
    add.call(this, si, n, type === 'row' ? update : updateColumn);
  }

  remove(si, ei, type = 'col') {
    remove.call(this, si, ei, type === 'row' ? update : updateColumn);
  }
}
