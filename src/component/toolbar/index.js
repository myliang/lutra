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

function buildDivider() {
  return h(`.${cssPrefix}-toolbar-divider`);
}

export default class Toolbar extends BaseComponent {
  constructor(data) {
    super(data);
    const style = data.defaultStyle;
    this.font = new Font();
    this.fontSize = new FontSize();
    this.bold = new ToggleItem('font-bold', 'Ctrl+B');
    this.italic = new ToggleItem('font-italic', 'Ctrl+I');
    this.underline = new ToggleItem('underline', 'Ctrl+U');
    this.textColor = new TextColor(style.color);
    this.fillColor = new FillColor(style.bgcolor);
    this.border = new Border();
    this.align = new Align(style.align);
    this.valign = new Valign(style.valign);
    this.textwrap = new ToggleItem('textwrap');
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
        buildDivider(),
        this.align.el,
        this.valign.el,
        this.textwrap.el));
  }

  update() {
  }
}
