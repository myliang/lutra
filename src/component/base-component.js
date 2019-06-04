export default class BaseComponent {
  constructor(value) {
    this.value = value;
    this.change = () => {};
    this.$el = null;
  }

  get el() {
    if (this.$el === null) this.$el = this.render();
    return this.$el;
  }

  render() {}

  update(value) {
    this.value = value;
  }
}
