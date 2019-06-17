export default class Base {
  constructor($) {
    this.$ = $;
  }

  load($) {
    if ($) this.$ = $;
  }
}
