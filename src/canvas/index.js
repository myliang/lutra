import CanvasBase from './base';
import Box from './box';
import text from './text';
import border from './border';
import clip from './clip';

export default class Canvas extends CanvasBase {
  border(box) {
    border(this, box);
  }

  text(box, attr = {}, textwrap = true) {
    text(this, box, attr, textwrap);
  }

  clip(box, contentcb) {
    clip(this, box, contentcb);
  }

  static create(el) {
    return new Canvas(el);
  }

  static box(options) {
    return Box.create(options);
  }
}
