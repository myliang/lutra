import { cssPrefix } from '../../config';
import h from '../../dom/create-element';

import BaseComponent from '../base-component';
import ToggleItem from './toggle-item';
import Font from './font';
import FontSize from './font-size';
import FillColor from './fill-color';
import TextColor from './text-color';
import Valign from './valign';
import Align from './align';
import Border from './border';

class Merge extends ToggleItem {
  constructor() {
    super('merge');
  }

  update(active, disabled) {
    super.update(active);
    this.el.disabled(disabled);
  }
}

function buildDivider() {
  return h(`.${cssPrefix}-toolbar-divider`);
}

export default class Toolbar extends BaseComponent {
  constructor(data) {
    super(data);
    const style = data.defaultStyle;
    [
      this.font = new Font(),
      this.fontSize = new FontSize(),
      this.bold = new ToggleItem('font-bold', 'Ctrl+B'),
      this.italic = new ToggleItem('font-italic', 'Ctrl+I'),
      this.underline = new ToggleItem('underline', 'Ctrl+U'),
      this.textColor = new TextColor(style.color),
      this.fillColor = new FillColor(style.bgcolor),
      this.border = new Border(),
      this.merge = new Merge(),
      this.align = new Align(style.align),
      this.valign = new Valign(style.valign),
      this.textwrap = new ToggleItem('textwrap'),
    ].forEach((it) => {
      it.change = (...args) => this.change(...args);
    });
  }

  render() {
    return h(`.${cssPrefix}-toolbar`,
      h(`.${cssPrefix}-toolbar-menu`,
        this.font.el,
        this.fontSize.el,
        buildDivider(),
        this.bold.el,
        this.italic.el,
        this.underline.el,
        this.textColor.el,
        buildDivider(),
        this.fillColor.el,
        this.border.el,
        this.merge.el,
        buildDivider(),
        this.align.el,
        this.valign.el,
        this.textwrap.el));
  }

  update() {
    const { selectedCell, select } = this.value;
    const { style } = selectedCell;
    const {
      font, underline, color, bgcolor, align, valign, textwrap,
    } = style;
    this.font.update(font.name);
    this.fontSize.update(font.size);
    this.bold.update(font.bold);
    this.italic.update(font.italic);
    this.underline.update(underline);
    this.textColor.update(color);
    this.fillColor.update(bgcolor);
    this.merge.update(select.merged, !select.multiple);
    this.align.update(align);
    this.valign.update(valign);
    this.textwrap.update(textwrap);
  }
}
