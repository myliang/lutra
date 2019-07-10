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

function renderContent() {
  const { $visible } = this;
  const { value, items, width } = this.$props;
  // console.log('$visible:', $visible);
  return html`
  <div class="only-text">${value}</div>
  <ul class="content x-list" .show="${$visible}" style="${{ width: width || 'auto' }}">
    ${items.map(it => html`<li @click.stop="${onChange.bind(this, it)}">${it}</li>`)}
  </ul>
  `;
}

@component('x-dropdown')
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
