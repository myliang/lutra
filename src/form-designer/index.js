/* global window */
import {
  html, component, BaseElement, element, mouseMoveUp, bind,
} from '../core';
import '../component';
import './type-palette';
import './property-palette';
import Table from '../canvas/table';
import Data from '../data';
import form from '../data/form';

function setFormProperty(ri, ci, type) {
  const { $data } = this;
  const { formProperty } = this.$state;
  if (type) {
    Object.assign(formProperty, {
      fields: form.types[type].fields,
      value: $data.validation(ri, ci, type),
      show: true,
    });
  } else {
    formProperty.show = false;
  }
}
function overlayerMousemove(evt) {
  const { buttons, offsetX, offsetY } = evt;
  // console.log('buttons:', buttons);
  if (buttons !== 0) return;
  const { indexWidth, indexHeight, canvas } = this.$data;
  const { rResizer, cResizer } = this.$state;
  // console.log('offsetX:', offsetX, ', offsetY:', offsetY);
  if (offsetX > indexWidth && offsetY > indexHeight) {
    // console.log('rResizer.show:', rResizer.show);
    if (rResizer.show || cResizer.show) {
      rResizer.show = false;
      cResizer.show = false;
      this.update(false);
    }
  } else {
    const {
      ri, ci, left, top, width, height,
    } = this.$data.cellBoxAndIndex(offsetX, offsetY);
    if (ri >= 0 && ci === -1) {
      rResizer.show = true;
      rResizer.value = [ri, top, height, width, canvas.width];
    } else {
      rResizer.show = false;
    }
    if (ri === -1 && ci >= 0) {
      cResizer.show = true;
      cResizer.value = [ci, left, width, height, canvas.height];
    } else {
      cResizer.show = false;
    }
    // console.log('rResizer:', rResizer, ', cResizer:', cResizer);
    this.update(false);
  }
}

function overlayerClickLeftMouseButton(evt) {
  const {
    shiftKey, offsetX, offsetY, buttons,
  } = evt;
  const { $data } = this;
  let { ri, ci } = $data.cellBoxAndIndex(offsetX, offsetY);
  const last = { ri, ci };
  // console.log('ri:', ri, ', ci:', ci);
  if (ri === -1 || ci === -1) return;

  if (!shiftKey) {
    $data.select.s(ri, ci);
    const { type } = $data.selectedCell;
    setFormProperty.call(this, ri, ci, type);
    this.update();
    mouseMoveUp(window, (e) => {
      if (e.buttons === 1 && !e.shiftKey) {
        ({ ri, ci } = $data.cellBoxAndIndex(e.offsetX, e.offsetY));
        if (last.ri !== ri || last.ci !== ci) {
          $data.select.e(ri, ci);
          this.update();
          last.ri = ri;
          last.ci = ci;
        }
      }
    }, () => {});
  } else if (buttons === 1) {
    $data.select.e(ri, ci);
    this.update();
  }
}

function editorShow() {
  const { selectedCell, selectedCellBox } = this.$data;
  this.$state.editor = {
    show: true,
    offset: selectedCellBox,
    content: selectedCell.text || '',
    style: selectedCell.css,
  };
  this.update();
}

function overlayerMousedown(evt) {
  const { buttons, detail } = evt;
  const { editor } = this.$state;
  // the left mouse button: mousedown → mouseup → click
  // the right mouse button: mousedown → contenxtmenu → mouseup
  if (buttons === 2) {
    // click the right mouse button
  } else if (detail === 2) {
    // double click the left mouse button
    editorShow.call(this);
  } else {
    editor.show = false;
    // click the left mouse button
    overlayerClickLeftMouseButton.call(this, evt);
  }
}

function overlayerDragover() {
  // do nothing
}
function overlayerDrop(evt) {
  const { offsetX, offsetY, dataTransfer } = evt;
  const { $data } = this;
  const { ri, ci } = $data.cellBoxAndIndex(offsetX, offsetY);
  if (ri === -1 || ci === -1) return;
  $data.select.s(ri, ci);
  const type = dataTransfer.getData('type');
  setFormProperty.call(this, ri, ci, type);
  this.update();
}

function vScrollbarChange(v) {
  this.$data.scroll.movey(v);
  this.update();
}

function hScrollbarChange(v) {
  this.$data.scroll.movex(v);
  this.update();
}

function rResizerChange([ri, v]) {
  this.$data.rows.height(ri, v);
  this.$state.rResizer.show = false;
  this.update();
}

function cResizerChange([ci, v]) {
  this.$data.cols.width(ci, v);
  this.$state.cResizer.show = false;
  this.update();
}

function toolbarChange([name, value]) {
  this.$data.update(name, value);
  this.update();
}

function editorChange(v) {
  // console.log(':::editor.change:', v);
  this.$data.update('text', v);
}

function formPropertyChange() {
  const { formProperty } = this.$state;
  formProperty.show = false;
  this.$data.updateValidation(formProperty.value, formProperty.show);
  this.update();
}

function moveSelector(direction, multiple) {
  const { $data, $state } = this;
  $state.editor.show = false;
  $data.select.move(direction, multiple);
  $data.scrollMove(direction);
  this.update();
}

function bindWindowEvents() {
  // bind window event
  bind(window, 'resizer', () => this.update());
  let focusing = false;
  bind(window, 'click', ({ target }) => {
    focusing = element.call(this, '.overlayer').contains(target);
  });

  // bind window.keydown
  bind(window, 'keydown', (evt) => {
    if (!focusing) return;
    const keyCode = evt.keyCode || evt.which;
    const {
      ctrlKey, shiftKey, metaKey, key,
    } = evt;
    if (ctrlKey || metaKey) {
      // nothing
    } else {
      switch (keyCode) {
        case 32: // space
          break;
        case 27: // esc
          // contextMenu.hide();
          break;
        case 37: // left
          moveSelector.call(this, 'left', shiftKey);
          evt.preventDefault();
          break;
        case 38: // up
          moveSelector.call(this, 'up', shiftKey);
          evt.preventDefault();
          break;
        case 39: // right
          moveSelector.call(this, 'right', shiftKey);
          evt.preventDefault();
          break;
        case 40: // down
          moveSelector.call(this, 'down', shiftKey);
          evt.preventDefault();
          break;
        case 9: // tab
          // editor.finished();
          // shift + tab => move left
          // tab => move right
          moveSelector.call(this, shiftKey ? 'left' : 'right', shiftKey);
          evt.preventDefault();
          break;
        case 13: // enter
          // editor.finished();
          // shift + enter => move up
          // enter => move down
          moveSelector.call(this, shiftKey ? 'up' : 'down', shiftKey);
          evt.preventDefault();
          break;
        case 8: // backspace
          break;
        default:
          break;
      }

      if ((keyCode >= 65 && keyCode <= 90)
        || (keyCode >= 48 && keyCode <= 57)
        || (keyCode >= 96 && keyCode <= 105)
        || key === '=') {
        // trigger editor
        editorShow.call(this);
      }
    }
  });
}

export default @component('lutra-form-designer')
class FormDesigner extends BaseElement {
  $state = {
    editor: {
      show: false,
      offset: {
        left: 0, top: 0, width: 0, height: 0,
      },
      content: '',
      style: {},
    },
    rResizer: {
      show: false,
      value: [0, 0, 0, 0, 0],
    },
    cResizer: {
      show: false,
      value: [0, 0, 0, 0, 0],
    },
    formProperty: {
      fields: [],
      show: false,
      value: { rule: {} },
    },
  };

  constructor() {
    super();
    const { settings } = this.$props;
    this.$data = new Data(settings || {});
    bindWindowEvents.call(this);
  }

  render() {
    const { $state, $data } = this;
    const {
      indexWidth, indexHeight, selectedCellBox, selectedCell,
      rows, cols, canvas, scroll, select,
    } = $data;
    const {
      rResizer, cResizer, editor, formProperty,
    } = $state;
    // console.log(':::selectedCellbox:', selectedCellBox);
    // console.log('rResizer:', rResizer, ',cResizer:', cResizer);
    const {
      width, height, cwidth, cheight,
    } = canvas;
    const olcstyle = {
      left: indexWidth,
      top: indexHeight,
      width: cwidth,
      height: cheight,
    };
    // console.log('scroll:', scroll.x);
    const vScrollbar = {
      value: [rows.totalHeight(), cheight],
      scroll: { top: scroll.y },
    };
    const hScrollbar = {
      value: [cols.totalWidth(), cwidth],
      scroll: { left: scroll.x },
    };
    const toolbarValue = {
      style: selectedCell.style,
      merge: [select.merged, !select.multiple],
    };
    // console.log('formProperty:', formProperty);
    return html`
    <lutra-toolbar .value="${toolbarValue}" @change="${toolbarChange.bind(this)}"></lutra-toolbar>
    <div class="content">
      <canvas></canvas>
      <div class="overlayer" style="${{ width, height }}"
        @dragover.prevent="${overlayerDragover.bind(this)}"
        @drop.prevent="${overlayerDrop.bind(this)}"
        @mousemove="${overlayerMousemove.bind(this)}"
        @mousedown="${overlayerMousedown.bind(this)}">
        <div class="content" style="${olcstyle}">
          <lutra-selector .show="${true}"
            .offset="${selectedCellBox}"></lutra-selector>
          <lutra-editor .show="${editor.show}"
            .offset="${editor.offset}"
            .content="${editor.content}"
            .style="${editor.style}"
            @change="${editorChange.bind(this)}"></lutra-editor>
        </div>
      </div>
      <lutra-form-type-palette .items="${form.types}"></lutra-form-type-palette>
      <lutra-form-property-palette
        @change="${formPropertyChange.bind(this)}"
        .fields="${formProperty.fields}"
        .value="${formProperty.value}"
        .show="${formProperty.show}">
      </lutra-form-property-palette>
      <lutra-resizer .type="row"
        .show="${rResizer.show}"
        .value="${rResizer.value}"
        .min-value="${indexHeight}"
        @change="${rResizerChange.bind(this)}"></lutra-resizer>
      <lutra-resizer .type="col"
        .show="${cResizer.show}"
        .value="${cResizer.value}"
        .min-value="${indexWidth}"
        @change="${cResizerChange.bind(this)}"></lutra-resizer>
      <lutra-scrollbar .type="vertical"
        .value="${vScrollbar.value}"
        .scroll="${vScrollbar.scroll}"
        @change="${vScrollbarChange.bind(this)}"></lutra-scrollbar>
      <lutra-scrollbar .type="horizontal"
        .value="${hScrollbar.value}"
        .scroll="${hScrollbar.scroll}"
        @change="${hScrollbarChange.bind(this)}"></lutra-scrollbar>
    </div>
    `;
  }

  update(updateTable = true) {
    super.update();
    if (updateTable) {
      if (this.$table === undefined) {
        this.$table = new Table(element.call(this, 'canvas'), this.$data);
      }
      this.$table.render(this);
    }
  }
}
