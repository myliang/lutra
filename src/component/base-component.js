export default class BaseComponent {
  constructor(value) {
    this.value = value;
    this.change = () => {};
    this._el = null;
  }

  get el() {
    if (this._el === null) this._el = this.render();
    return this._el;
  }

  render() {}

  update(value) {
    this.value = value;
  }
}
