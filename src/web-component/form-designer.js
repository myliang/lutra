import {
  html, component, BaseElement, element,
} from './core';
import './toolbar';
import './selector';
import './editor';
import './scrollbar';
import './resizer';
import Table from '../canvas/table';
import Data from '../core/data';

export default @component('x-form-designer')
class FormDesigner extends BaseElement {
  $state = {
    selectorOffset: {
      left: 0, top: 0, width: 0, height: 0,
    },
    editorOffset: {
      left: 0, top: 0, width: 0, height: 0,
    },
    rResizerValue: [0, 0, 0, 0, 0],
    rResizerMinValue: 25,
    cResizerValue: [0, 0, 0, 0, 0],
    cResizerMinValue: 25,
    vScrollbarVHeight: 500,
    vScrollbarCHeight: 1000,
    hScrollbarVWidth: 500,
    hScrollbarCWidth: 1000,
  };

  constructor() {
    super();
    const { settings } = this.$props;
    this.$data = new Data(settings || {});
  }

  render() {
    const { $state, $data } = this;
    const { indexWidth, indexHeight, selectedCellBox } = $data;
    // console.log(':::selectedCellbox:', selectedCellBox);
    const {
      width, height, cwidth, cheight,
    } = $data.canvas;
    const olcstyle = {
      left: indexWidth,
      top: indexHeight,
      width: cwidth,
      height: cheight,
    };
    return html`
    <xfd-toolbar></xfd-toolbar>
    <div class="content">
      <canvas></canvas>
      <div class="overlayer" style="${{ width, height }}">
        <div class="content" style="${olcstyle}">
          <xfd-selector .show="${true}"
            .offset="${selectedCellBox}"></xfd-selector>
          <xfd-editor .show="${false}"
            .offset="${$state.editorOffset}" .content="hello"></xfd-editor>
        </div>
      </div>
      <xfd-resizer .type="row"
        .value="${$state.rResizerValue}"
        .min-value="${$state.rResizerMinValue}"></xfd-resizer>
      <xfd-resizer .type="col"
        .value="${$state.cResizerValue}"
        .min-value="${$state.cResizerMinValue}"></xfd-resizer>
      <xfd-scrollbar .type="vertical"
        .view-length="${$state.vScrollbarVHeight}"
        .content-length="${$state.vScrollbarCHeight}"></xfd-scrollbar>
      <xfd-scrollbar .type="horizontal"
        .view-length="${$state.hScrollbarVWidth}"
        .content-length="${$state.hScrollbarCWidth}"></xfd-scrollbar>
    </div>
    `;
  }

  update() {
    super.update();
    if (this.$table === undefined) {
      this.$table = new Table(element.call(this, 'canvas'), this.$data);
    }
    this.$table.render(this);
  }
}
