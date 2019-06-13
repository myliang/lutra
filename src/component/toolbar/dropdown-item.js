import Item from './item';

export default class DropdownItem extends Item {
  dropdown() {}

  getValue(v) {
    return v;
  }

  render() {
    const { tag } = this;
    this.dd = this.dropdown();
    this.dd.change = it => this.change(tag, this.getValue(it));
    return super.render().child(this.dd.el);
  }

  update(v) {
    super.update(v);
    this.dd.update(v);
  }
}
