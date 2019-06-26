/* global document */
const marker = '{}';
const nodeMarker = '<!---->';

export default class Template {
  constructor(strings, ...values) {
    this.strings = strings;
    this.values = values;
  }

  get html() {
    let html = '';
    const { strings } = this;
    const lastIndex = strings.length - 1;
    for (let i = 0; i < lastIndex; i += 1) {
      const str = strings[i];
      html += str;
      const closei = str.lastIndexOf('>');
      html += (closei > -1 && str.indexOf('<', closei + 1) === -1)
        ? nodeMarker : marker;
    }
    html += strings[lastIndex];
    return html;
  }

  get element() {
    const el = document.createElement('template');
    el.innerHTML = this.html;
    // console.log('el:', el, this.html, el.innerHTML, this.values);
    return el;
  }
}

Template.marker = marker;
Template.nodeMarker = nodeMarker;
