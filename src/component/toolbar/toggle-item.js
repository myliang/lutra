import Item from './item';
import Icon from '../../dom/icon';

export default class ToggleItem extends Item {
  render() {
    return super.render()
      .child(new Icon(this.tag))
      .on('click', () => this.click());
  }

  click() {
    this.change(this.tag, this.toggle());
  }

  update(active) {
    super.update(active);
    this.el.active(active);
  }

  toggle() {
    return this.el.toggle();
  }

  active() {
    return this.el.hasClass('active');
  }
}
