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

export default @component('xfd-toolbar')
class Toolbar extends BaseElement {
  render() {
    const textColor = '#7030a0';
    const fillColor = '#000000';
    const align = 'left';
    const valign = 'middle';
    const fontName = 'Lato';
    const fontSize = 10.5;

    return html`
    <div class="xfd-menu horizontal">
      <xfd-dropdown class="item bottom left"
        .value="${fontName}" .items="${fonts}" .width="160px"
        @mouseenter="${bindTooltip('fontName')}"></xfd-dropdown>
      <xfd-dropdown class="item bottom left"
        .value="${fontSize}" .items="${fontSizePts}" .width="60px"
        @mouseenter="${bindTooltip('fontSize')}"></xfd-dropdown>
      <div class="divider"></div>
      <div class="item" @mouseenter="${bindTooltip('fontBold')}">
        <xfd-icon .type="font-bold"></xfd-icon>
      </div>
      <div class="item" @mouseenter="${bindTooltip('fontItalic')}">
        <xfd-icon .type="font-italic"></xfd-icon>
      </div>
      <div class="item" @mouseenter="${bindTooltip('underline')}">
        <xfd-icon .type="underline"></xfd-icon>
      </div>
      <xfd-color-picker class="item bottom left"
         @mouseenter="${bindTooltip('textColor')}"
        .icon="text-color" .value="${textColor}"></xfd-color-picker>
      <div class="divider"></div>
      <xfd-color-picker class="item bottom left"
         @mouseenter="${bindTooltip('fillColor')}"
        .icon="fill-color" .value="${fillColor}"></xfd-color-picker>
      <xfd-border-picker class="item bottom left"
        @mouseenter="${bindTooltip('border')}">
      </xfd-border-picker>
      <div class="item" @mouseenter="${bindTooltip('merge')}">
        <xfd-icon .type="merge"></xfd-icon>
      </div>
      <div class="divider"></div>
      <xfd-align-picker class="item bottom left"
        .value="${align}" .items="${aligns}"
        @mouseenter="${bindTooltip('align')}"></xfd-align-picker>
      <xfd-align-picker class="item bottom left"
        .value="${valign}" .items="${valigns}"
        @mouseenter="${bindTooltip('valign')}"></xfd-align-picker>
      <div class="item" @mouseenter="${bindTooltip('textwrap')}">
        <xfd-icon .type="textwrap"></xfd-icon>
      </div>
    </div>
    `;
  }
}
