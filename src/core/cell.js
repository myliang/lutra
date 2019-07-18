import cellEval from './cell-evaluation';
import formula from './formula';
import helper from './helper';
import { pt2px } from './font';

function getCell() {
  const { rows, ri, ci } = this;
  return undefined || (rows[ri] && rows[ri].cells && rows[ri].cells[ci]);
}

function getCellOrNew() {
  const { rows, ri, ci } = this;
  rows[ri] = rows[ri] || { cells: {} };
  rows[ri].cells = rows[ri].cells || {};
  rows[ri].cells[ci] = rows[ri].cells[ci] || {};
  this.$ = rows[ri].cells[ci];
  return this.$;
}

export default class Cell {
  constructor({ rows }, styles, ri, ci, mode = 'read') {
    this.styles = styles;
    this.rows = rows;
    this.ri = ri;
    this.ci = ci;
    if (mode === 'read') {
      this.$ = getCell.call(this);
    } else {
      this.$ = getCellOrNew.call(this);
    }
  }

  get value() {
    const { $ } = this;
    if (!$) return undefined;
    let { text } = $;
    if (text) {
      text = cellEval(text, formula.map, (x, y) => {
        const c = getCell.call(this, y, x);
        return '' || (c && c.text);
      });
      this.$.value = text;
    }
    return text;
  }

  get style() {
    if (!this.$style) {
      const { $ } = this;
      this.$style = this.styles.getOrDefault(undefined || ($ && $.style));
    }
    return this.$style;
  }

  get css() {
    const {
      font, underline, color, bgcolor, align, valign,
    } = this.style;
    return {
      color,
      'background-color': bgcolor,
      'font-family': font.name,
      'font-size': `${pt2px(font.size)}px`,
      'font-style': font.italic ? 'italic' : 'normal',
      'font-weight': font.bold ? 'bold' : 'normal',
      'text-decoration': underline ? 'underline' : 'none',
      'text-align': align,
      'vertical-align': valign,
    };
  }

  get text() {
    const { $ } = this;
    return $ ? $.text : '';
  }

  get type() {
    return undefined || (this.$ && this.$.type);
  }

  // attr: font-name | font-italic | font-bold | font-size
  // textwrap | underline | align | valign | color | bgcolor | border | text | type
  update(attr, value) {
    const { $, styles } = this;
    if (attr === 'text' || attr === 'type') {
      if (value === undefined) delete $[attr];
      else $[attr] = value;
      return;
    }
    let nstyle = {};
    if ($.style !== undefined) {
      nstyle = helper.clone(styles.get($.style));
    }
    if (attr.startsWith('font')) {
      nstyle.font = nstyle.font || {};
      nstyle.font[attr.split('-')[1]] = value;
    } else if (attr === 'border') {
      if (value !== undefined) {
        nstyle[attr] = Object.assign(nstyle[attr] || {}, value);
      } else {
        delete nstyle[attr];
      }
    } else if (value === undefined) delete nstyle[attr];
    else nstyle[attr] = value;
    if (Object.keys(nstyle).length > 0) {
      $.style = styles.add(nstyle);
    } else {
      delete $.style;
    }
  }

  static read(data, styles, ri, ci) {
    return new Cell(data, styles, ri, ci, 'read');
  }

  static write(data, styles, ri, ci) {
    return new Cell(data, styles, ri, ci, 'write');
  }
}
