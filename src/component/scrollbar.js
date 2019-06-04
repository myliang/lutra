import BaseComponent from './base-component';
import h from '../dom/create-element';
import { cssPrefix } from '../config';

export default class Scrollbar extends BaseComponent {
  // type: vertical | horizontal
  // value: scroll distance
  constructor(type, value) {
    super(value);
    this.type = type;
  }

  distances([contentd, viewd]) {
    const d = viewd - 1;
    const { type, el } = this;
    if (contentd > d) {
      const cssKey = type === 'veritcal' ? 'height' : 'width';
      el.css(cssKey, `${d - 15}`).show();
      el.child().css(cssKey, `${contentd}px`);
    } else {
      el.hide();
    }
    return this;
  }

  render() {
    const { type } = this;
    return h(`.${cssPrefix}-scrollbar ${type}`, h('div'))
      .on('mousemove.stop', () => {})
      .on('scroll.top', (evt) => {
        const { scrollTop, scrollLeft } = evt.target;
        this.change(type === 'vertical' ? scrollTop : scrollLeft, evt);
      });
  }

  update(value) {
    super.update(value);
    const { type, el } = this;
    const scrollKey = type === 'vertical' ? 'top' : 'left';
    el.scroll(scrollKey, value);
  }
}
