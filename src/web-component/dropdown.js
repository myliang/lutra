/* eslint guard-for-in: 2 */
import {
  component, html, BaseElement, bindClickoutside, unbindClickoutside,
} from './core';

function onShow() {
  this.$visible = !this.$visible;
  if (this.$visible) {
    bindClickoutside(this, onShow.bind(this));
    this.classList.add('active');
  } else {
    unbindClickoutside(this);
    this.classList.remove('active');
  }
  this.update();
}

function onChange(...args) {
  this.change(...args);
  onShow.call(this);
}

function itValue(it) {
  return Array.isArray(it) ? it[0] : it;
}

function itText(it) {
  return Array.isArray(it) ? it[1] : it;
}

function vText(items, v) {
  if (Array.isArray(items[0])) {
    const item = items.find(it => it[0] === v);
    if (item) return item[1];
  }
  return v;
}

function renderContent() {
  const { $visible } = this;
  const { value, items, width } = this.$props;
  // console.log('$visible:', $visible);
  return html`
  <div class="only-text">${vText(items, value)}</div>
  <ul class="content lutra-list" .show="${$visible}" style="${{ width: width || 'auto' }}">
    ${items.map(it => html`<li @click.stop="${onChange.bind(this, itValue(it))}">${itText(it)}</li>`)}
  </ul>
  `;
}

@component('lutra-dropdown')
class Dropdown extends BaseElement {
  $visible = false;

  onclick = onShow.bind(this);

  render() {
    return renderContent.call(this);
  }
}

export {
  onShow,
  onChange,
  Dropdown,
};
export default Dropdown;
