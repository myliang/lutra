export default class BaseComponent {
  construtor(value) {
    this.value = value;
    this.change = () => {};
    this.el = this.render();
  }

  render() {}

  update(value) {
    this.value = value;
  }
}
