import { html, component, BaseElement } from '../core';
import { t } from '../locale/locale';
import './icon';

function weekday(date, index) {
  const d = new Date(date);
  d.setDate(index - date.getDay() + 1);
  return d;
}

const typeFuncs = {
  day(year, month) {
    // the first day of month
    const startDate = new Date(year, month, 1, 23, 59, 59);
    const datess = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < 7; j += 1) {
        //  Sun -> Sat => Mon -> Sun
        //  +1 => Mon -> Sun
        const index = i * 7 + j + 1;
        const d = weekday(startDate, index);
        datess[i][j] = d; // { d, disabled, active };
      }
    }
    return datess;
  },
  month() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
    ];
  },
  year(year) {
    return [
      [year - 10, year - 9, year - 8, year - 7],
      [year - 6, year - 5, year - 4, year - 3],
      [year - 2, year - 1, year - 0, year + 1],
      [year + 2, year + 3, year + 4, year + 5],
      [year + 6, year + 7, year + 8, year + 9],
    ];
  },
};


// private methods --- start ----

// type is day, v: Date
// type is month, v: Date.getMonth()
// type is year, v: Date.getFullYear()
function cellRender(type, v) {
  const cr = this.$props.cellRender;
  const ccr = this.$props.cellContentRender;
  if (cr) return cr(type, v);
  let title = v;
  if (type === 'day') title = v.getDate();
  if (type === 'month') title = t('calendar.months')[v];
  return html`
  <div class="cell-title">${title}</div>
  <div class="cell-content">${ccr ? ccr(type, v) : ''}</div>
  `;
}

// type: year, month, day
function showView(type) {
  this.$state.type = type;
  this.update();
}

function clickHandler(v) {
  const { $state } = this;
  const { type } = $state;
  this.change([type, v]);
  if (type === 'year') {
    $state.date.setYear(v);
  } else if (type === 'month') {
    $state.date.setMonth(v);
  }
  $state.type = 'day';
  this.update();
}

function cellClass(it) {
  const { type, date } = this.$state;
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let cls = 'cell';
  if (type === 'day') {
    if (it.getMonth() !== month) cls += ' disabled';
    if (it.getMonth() === month && it.getDate() === day) cls += ' active';
  } else if (type === 'month' && it === month) {
    cls += ' active';
  } else if (type === 'year' && it === year) {
    cls += ' active';
  }
  return cls;
}

function buildBodyTrs() {
  const { type, date } = this.$state;
  const year = date.getFullYear();
  const month = date.getMonth();
  const arys = typeFuncs[type](year, month);
  // const dayss = monthDays(date.getFullYear(), date.getMonth(), v);
  return arys.map(ary => html`
    <tr>
      ${ary.map(it => html`
        <td>
          <div class="${cellClass.call(this, it)}"
            @click.stop="${clickHandler.bind(this, it)}">
            ${cellRender.call(this, type, it)}
          </div>
        </td>
        `)}
    </tr>
    `);
}
// private methods --- end ----

export default @component('lutra-calendar')
class Calendar extends BaseElement {
  $state = {
    date: new Date(),
    type: 'day',
  };

  render() {
    const { type, date } = this.$state;
    const monthText = t('calendar.months')[date.getMonth()];
    const yearText = date.getFullYear();
    return html`
    <div class="header">
      <div @click.stop="${showView.bind(this, 'year')}">${yearText}</div>
      <div @click.stop="${showView.bind(this, 'month')}">${monthText}</div>
    </div>
    <table class="body">
      <thead .show="${type === 'day'}">
        <tr>${t('calendar.weeks').map(week => html`<th>${week}</th>`)}</tr>
      </thead>
      <tbody>
        ${buildBodyTrs.call(this)}
      </body>
    </table>
    `;
  }
}
