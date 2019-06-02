import { dpr, npx, thinLineWidth } from './helper';

function invoke(name, ...args) {
  const { ctx } = this;
  ctx[name](...args);
  return this;
}

class Canvas2d {
  constructor(el) {
    this.el = el;
    this.ctx = el.getContext('2d');
  }

  resize(width, height) {
    const { el, ctx } = this;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    // for Retina display
    el.width = npx(width);
    el.height = npx(height);
    ctx.scale(dpr(), dpr());
    return this;
  }

  clear(width, height) {
    return invoke.call(this, 'clearRect', 0, 0, width, height);
  }

  attr(options) {
    Object.assign(this.ctx, options);
    return this;
  }

  saveRestore(cb) {
    const { ctx } = this;
    ctx.save();
    ctx.beginPath();
    cb(ctx);
    ctx.restore();
    return this;
  }

  fillRect(x, y, w, h) {
    return invoke.call(this, 'fillRect', npx(x), npx(y), npx(w), npx(h));
  }

  fillText(text, x, y) {
    return invoke.call(this, 'fillText', text, npx(x), npx(y));
  }

  translate(x, y) {
    return invoke.call(this, 'translate', npx(x), npx(y));
  }

  scale(x, y) {
    return invoke.call(this, 'scale', x, y);
  }

  moveTo(x, y) {
    return invoke.call(this, 'moveTo', npx(x) - 0.5, npx(y) - 0.5);
  }

  lineTo(x, y) {
    return invoke.call(this, 'lineTo', npx(x) - 0.5, npx(y) - 0.5);
  }

  line(...xys) {
    const { ctx } = this;
    if (xys.length > 1) {
      this.moveTo(...xys[0]);
      for (let i = 1; i < xys.length; i += 1) {
        this.lineTo(...xys[i]);
      }
      ctx.stroke();
    }
    return this;
  }

  // style: thin | medium | thick | dashed | dotted
  // color: the line color
  lineStyle(style, color) {
    const { ctx } = this;
    ctx.lineWidth = thinLineWidth;
    ctx.strokeStyle = color;
    if (style === 'medium') {
      ctx.lineWidth = npx(2) - 0.5;
    } else if (style === 'thick') {
      ctx.lineWidth = npx(3);
    } else if (style === 'dashed') {
      ctx.setLineDash([npx(3), npx(2)]);
    } else if (style === 'dotted') {
      ctx.setLineDash([npx(1), npx(1)]);
    }
    return this;
  }
}

export default function (el, w, h) {
  return new Canvas2d(el, w, h);
}
