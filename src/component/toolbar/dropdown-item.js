import Item from './item';

export default class DropdownItem extends Item {
  dropdown() {}

  getValue(v) {
    return v;
  }

  render() {
    const { tag } = this;
    const dd = this.dropdown();
    dd.change = it => this.change(tag, this.getValue(it));
    return super.render().child(dd.el);
  }

  update(v) {
    super.update(v);
    this.el.child.update(v);
  }
}
