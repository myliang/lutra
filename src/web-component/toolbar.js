import {
  html, BaseElement, component,
} from './core';
import { t } from '../locale/locale';
import { fonts, fontSizePts } from '../core/font';
import tooltip from './tooltip';
import './icon';
import './dropdown';
import './color-picker';
import './border-picker';
import './align-picker';

const aligns = ['left', 'center', 'right'];
const valigns = ['top', 'middle', 'bottom'];

function bindTooltip(tip) {
  return (evt) => {
    tooltip(t(`toolbar.${tip}`), evt.target);
  };
}

function change(name, value) {
  // console.log('name:', name, ', value:', value);
  this.change([name, value]);
}

export default @component('xfd-toolbar')
class Toolbar extends BaseElement {
  render() {
    const { style, merge } = this.$props.value;
    const {
      font, underline, color, bgcolor, align, valign, textwrap,
    } = style;

    const active = v => (v ? 'active' : '');
    // merge: [merged, single]
    const merged = merge[1] ? 'disabled' : active(merge[0]);

    return html`
    <div class="xfd-menu horizontal">
      <xfd-dropdown class="item bottom left"
        .value="${font.name}" .items="${fonts}" .width="160px"
        @change="${change.bind(this, 'font-name')}"
        @mouseenter="${bindTooltip('fontName')}"></xfd-dropdown>
      <xfd-dropdown class="item bottom left"
        .value="${font.size}" .items="${fontSizePts}" .width="60px"
        @change="${change.bind(this, 'font-size')}"
        @mouseenter="${bindTooltip('fontSize')}"></xfd-dropdown>
      <div class="divider"></div>
      <div class="item ${active(font.bold)}"
        @click="${change.bind(this, 'font-bold', !font.bold)}"
        @mouseenter="${bindTooltip('fontBold')}">
        <xfd-icon .type="font-bold"></xfd-icon>
      </div>
      <div class="item ${active(font.italic)}"
        @click="${change.bind(this, 'font-italic', !font.italic)}"
        @mouseenter="${bindTooltip('fontItalic')}">
        <xfd-icon .type="font-italic"></xfd-icon>
      </div>
      <div class="item ${active(underline)}"
        @click="${change.bind(this, 'underline', !underline)}"
        @mouseenter="${bindTooltip('underline')}">
        <xfd-icon .type="underline"></xfd-icon>
      </div>
      <xfd-color-picker class="item bottom left"
        @change="${change.bind(this, 'color')}"
        @mouseenter="${bindTooltip('textColor')}"
        .icon="text-color" .value="${color}"></xfd-color-picker>
      <div class="divider"></div>
      <xfd-color-picker class="item bottom left"
        @change="${change.bind(this, 'bgcolor')}"
        @mouseenter="${bindTooltip('fillColor')}"
        .icon="fill-color" .value="${bgcolor}"></xfd-color-picker>
      <xfd-border-picker class="item bottom left"
        @change="${change.bind(this, 'border')}"
        @mouseenter="${bindTooltip('border')}">
      </xfd-border-picker>
      <div class="item ${merged}"
        @click="${change.bind(this, 'merge', !merge[0])}"
        @mouseenter="${bindTooltip('merge')}">
        <xfd-icon .type="merge"></xfd-icon>
      </div>
      <div class="divider"></div>
      <xfd-align-picker class="item bottom left"
        .value="${align}" .items="${aligns}"
        @change="${change.bind(this, 'align')}"
        @mouseenter="${bindTooltip('align')}"></xfd-align-picker>
      <xfd-align-picker class="item bottom left"
        .value="${valign}" .items="${valigns}"
        @change="${change.bind(this, 'valign')}"
        @mouseenter="${bindTooltip('valign')}"></xfd-align-picker>
      <div class="item ${active(textwrap)}"
        @click="${change.bind(this, 'textwrap', !textwrap)}"
        @mouseenter="${bindTooltip('textwrap')}">
        <xfd-icon .type="textwrap"></xfd-icon>
      </div>
    </div>
    `;
  }
}
