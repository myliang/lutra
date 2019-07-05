import {
  html, BaseElement, component,
} from './core';
import { t } from '../locale/locale';
import tooltip from './tooltip';
import './color-picker';
import './icon';
import { fonts, fontSizes } from '../core/font';

const aligns = ['left', 'center', 'right'];
const valigns = ['top', 'middle', 'bottom'];

function bindTooltip(tip) {
  return (evt) => {
    tooltip(t(`toolbar.${tip}`), evt.target);
  };
}

export default @component('xfd-toolbar')
class Toolbar extends BaseElement {
  $state = {
    fontShow: false,
    fontSizeShow: false,
    alignShow: false,
    valignShow: false,
  };

  render() {
    const {
      fontShow, fontSizeShow, alignShow, valignShow,
    } = this.$state;
    const textColor = '#7030a0';
    const fillColor = '#000000';
    const align = 'left';
    const valign = 'middle';

    return html`
    <div class="xfd-menu">
      <div class="item only-text" @mouseenter="${bindTooltip('font')}">
        ${fonts[0].title}
        <ul .show="${fontShow}">
          ${fonts.map(it => html`<li>${it.title}</li>`)}
        </ul>
      </div>
      <div class="item only-text" @mouseenter="${bindTooltip('fontSize')}">
        ${fontSizes[0].pt}
        <ul .show="${fontSizeShow}">
          ${fontSizes.map(it => html`<li>${it.pt}</li>`)}
        </ul>
      </div>
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
        .icon="text-color" .color="${textColor}"></xfd-color-picker>
      <div class="divider"></div>
      <xfd-color-picker class="item bottom left"
         @mouseenter="${bindTooltip('fillColor')}"
        .icon="fill-color" .color="${fillColor}"></xfd-color-picker>
      <div class="item" @mouseenter="${bindTooltip('border')}">
        <xfd-icon .type="border-all"></xfd-icon>
      </div>
      <div class="item" @mouseenter="${bindTooltip('merge')}">
        <xfd-icon .type="merge"></xfd-icon>
      </div>
      <div class="divider"></div>
      <div class="item" @mouseenter="${bindTooltip('align')}">
        <xfd-icon .type="${`align-${align}`}"></xfd-icon>
        <ul class="xfd-list" .show="${alignShow}">
          ${aligns.map(it => html`<li><xfd-icon .type="${it}"></xfd-icon></li>`)}
        </ul>
      </div>
      <div class="item" @mouseenter="${bindTooltip('valign')}">
        <xfd-icon .type="${`align-${valign}`}"></xfd-icon>
        <ul class="xfd-list" .show="${valignShow}">
          ${valigns.map(it => html`<li><xfd-icon .type="${it}"></xfd-icon></li>`)}
        </ul>
      </div>
      <div class="item" @mouseenter="${bindTooltip('textwrap')}">
        <xfd-icon .type="textwrap"></xfd-icon>
      </div>
    </div>
    `;
  }
}