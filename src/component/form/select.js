import {
  html, component, bindClickoutside, unbindClickoutside,
} from '../../core';
import { Base } from './base';

function onShow() {
  this.$visible = !this.$visible;
  if (this.$visible) {
    bindClickoutside(this, onShow.bind(this));
  } else {
    unbindClickoutside(this);
  }
  this.update();
}

function onChange(...args) {
  this.change(...args);
  onShow.call(this);
}

function vText(items, v) {
  const item = items.find(it => it[0] === v);
  return '' || (item && item[1]);
}

export default @component('lutra-select')
class Select extends Base {
  $visible = false;

  onclick = onShow.bind(this);

  render() {
    const { $visible } = this;
    const { value, items, width } = this.$props;
    // console.log('$visible:', $visible);
    return html`
    <div class="only-text">${vText(items, value)}</div>
    <ul class="content lutra-list" .show="${$visible}" style="${{ width: width || 'auto' }}">
      ${items.map(it => html`<li @click.stop="${onChange.bind(this, it[0])}">${it[1]}</li>`)}
    </ul>
    `;
  }
}
