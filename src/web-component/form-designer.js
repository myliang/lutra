/* global window */
import {
  html, component, BaseElement, element, mouseMoveUp, bind,
} from './core';
import './toolbar';
import './selector';
import './editor';
import './scrollbar';
import './resizer';
import Table from '../canvas/table';
import Data from '../core/data';

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
      this.update();
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
    this.update();
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

  if (!shiftKey) {
    $data.select.s(ri, ci);
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

export default @component('x-form-designer')
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
    const { rResizer, cResizer, editor } = $state;
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
    return html`
    <x-toolbar .value="${toolbarValue}" @change="${toolbarChange.bind(this)}"></x-toolbar>
    <div class="content">
      <canvas></canvas>
      <div class="overlayer" style="${{ width, height }}"
        @mousemove="${overlayerMousemove.bind(this)}"
        @mousedown="${overlayerMousedown.bind(this)}">
        <div class="content" style="${olcstyle}">
          <x-selector .show="${true}"
            .offset="${selectedCellBox}"></x-selector>
          <x-editor .show="${editor.show}"
            .offset="${editor.offset}"
            .content="${editor.content}"
            .style="${editor.style}"
            @change="${editorChange.bind(this)}"></x-editor>
        </div>
      </div>
      <x-resizer .type="row"
        .show="${rResizer.show}"
        .value="${rResizer.value}"
        .min-value="${indexHeight}"
        @change="${rResizerChange.bind(this)}"></x-resizer>
      <x-resizer .type="col"
        .show="${cResizer.show}"
        .value="${cResizer.value}"
        .min-value="${indexWidth}"
        @change="${cResizerChange.bind(this)}"></x-resizer>
      <x-scrollbar .type="vertical"
        .value="${vScrollbar.value}"
        .scroll="${vScrollbar.scroll}"
        @change="${vScrollbarChange.bind(this)}"></x-scrollbar>
      <x-scrollbar .type="horizontal"
        .value="${hScrollbar.value}"
        .scroll="${hScrollbar.scroll}"
        @change="${hScrollbarChange.bind(this)}"></x-scrollbar>
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
