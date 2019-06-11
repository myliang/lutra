import BaseComponent from '../base-component';
import { cssPrefix } from '../../config';
import { bindClickoutside, unbindClickoutside } from '../../dom/event';
import h from '../../dom/create-element';

export default class Base extends BaseComponent {
  constructor(value, title) {
    super(value);
    this.title = typeof title === 'string' ? h(`.${cssPrefix}-dropdown-title`, title) : title;
  }

  get contentEl() {
    return this.el.children[1];
  }

  width() {
    return 'auto';
  }

  placement() {
    return 'bottom-left';
  }

  showArrow() {
    return true;
  }

  arrowRight() {
    return h(`.${cssPrefix}-icon.arrow-right`,
      h(`.${cssPrefix}-icon-img.arrow-down`));
  }

  content() {}

  render() {
    const headerChildren = [this.title];
    if (this.showArrow()) {
      this.title.addClass('arrow-left');
      headerChildren.push(this.arrowRight());
    }
    return h(`.${cssPrefix}-dropdown.${this.placement()}`,
      h(`.${cssPrefix}-dropdown-header`, ...headerChildren).on('click', () => {
        if (this.contentEl.css('display') !== 'block') {
          this.show();
        } else {
          this.hide();
        }
      }),
      h(`.${cssPrefix}-dropdown-content`, ...this.content())
        .css('width', this.width()).hide());
  }

  updateTitle(v) {
    this.title.html(v);
  }

  update(v) {
    super.update(v);
    this.updateTitle(v);
    this.hide();
  }

  show() {
    const { el } = this;
    el.children[1].show();
    el.active();
    bindClickoutside(el, () => this.hide());
  }

  hide() {
    const { el } = this;
    el.active(false);
    el.children[1].hide();
    unbindClickoutside(el);
  }
}
