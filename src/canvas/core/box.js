export default class Box {
  constructor(x, y, w, h, bgcolor = '#ffffff', border = {}, padding = 3) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.bgcolor = bgcolor;
    // top right bottom left
    // [style, color]
    this.border = border;
    this.padding = padding;
  }

  get innerWidth() {
    return this.width - this.padding * 2;
  }

  get innerHeight() {
    return this.height - this.padding * 2;
  }

  textx(align) {
    const { width, padding } = this;
    let { x } = this;
    if (align === 'left') {
      x += padding;
    } else if (align === 'center') {
      x += width / 2 - 1;
    } else if (align === 'right') {
      x += width - padding;
    }
    return x;
  }

  texty(align, offset) {
    // console.log('offset:', offset);
    const { height, padding } = this;
    let { y } = this;
    if (align === 'top') {
      y += padding;
    } else if (align === 'middle') {
      y += height / 2 - offset;
    } else if (align === 'bottom') {
      y += height - padding - offset * 2;
    }
    return y;
  }

  top() {
    const { x, y, width } = this;
    return [[x, y], [x + width, y]];
  }

  right() {
    const {
      x, y, width, height,
    } = this;
    return [[x + width, y], [x + width, y + height]];
  }

  bottom() {
    const {
      x, y, width, height,
    } = this;
    return [[x, y + height], [x + width, y + height]];
  }

  left() {
    const {
      x, y, height,
    } = this;
    return [[x, y], [x, y + height]];
  }

  static create({
    left, top, width, height,
  }) {
    return new Box(left, top, width, height);
  }
}
