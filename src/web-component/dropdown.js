import {
  component, html, BaseElement, bindClickoutside, unbindClickoutside,
} from './core';

export function onShow() {
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

export function onChange(...args) {
  this.change(...args);
  onShow.call(this);
}

export function renderContent() {
  const { $visible } = this;
  const { value, items, width } = this.$props;
  // console.log('$visible:', $visible);
  return html`
  <div @click="${onShow.bind(this)}">${value}</div>
  <ul class="xfd-list" .show="${$visible}" style="${{ width: width || 'auto' }}">
    ${items.map(it => html`<li @click="${onChange.bind(this, it)}">${it}</li>`)}
  </ul>
  `;
}

export @component('xfd-dropdown')
class Dropdown extends BaseElement {
  $visible = false;

  render() {
    return renderContent.call(this);
  }
}

export default Dropdown;
