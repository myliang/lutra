import CanvasBase from './base';
import Box from './box';
import text from './text';
import border from './border';
import clipRect from './clip';

export default class Canvas extends CanvasBase {
  border(box) {
    border(this, box);
  }

  text(txt, box, attr = {}, textwrap = true) {
    text(this, txt, box, attr, textwrap);
  }

  clipRect(box, contentcb) {
    clipRect(this, box, contentcb);
  }

  static create(el) {
    return new Canvas(el);
  }

  static box(options) {
    return Box.create(options);
  }
}
