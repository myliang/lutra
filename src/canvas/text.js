/*
 * canvas: Canvas2d
 * box: box(x, y, width, height...)
 * attr: {
 *  align: left | center | right
 *  valign: top | middle | bottom
 *  color: text color
 *  underline,
 *  font: {
 *    name: font-family,
 *    size,
 *    bold,
 *    italic,
 *  }
 * }
 */
import { npx } from './helper';

function drawFontLine(canvas, type, tx, ty, align, valign, blheight, blwidth) {
  const floffset = { x: 0, y: 0 };
  if (type === 'underline') {
    if (valign === 'bottom') {
      floffset.y = 0;
    } else if (valign === 'top') {
      floffset.y = -(blheight + 2);
    } else {
      floffset.y = -blheight / 2;
    }
  } else if (type === 'strike') {
    if (valign === 'bottom') {
      floffset.y = blheight / 2;
    } else if (valign === 'top') {
      floffset.y = -((blheight / 2) + 2);
    }
  }

  if (align === 'center') {
    floffset.x = blwidth / 2;
  } else if (align === 'right') {
    floffset.x = blwidth;
  }
  canvas.line(
    [tx - floffset.x, ty - floffset.y],
    [tx - floffset.x + blwidth, ty - floffset.y],
  );
}

export default function text(canvas, txt, box, attr = {}, textwrap = true) {
  const {
    align, valign, font, color, underline,
  } = attr;
  const {
    italic, bold, size, name,
  } = font;
  canvas.saveRestore(() => {
    canvas.attr({
      textAlign: align,
      textBaseline: valign,
      font: `${italic ? 'italic' : ''} ${bold ? 'bold' : ''} ${npx(size)}px ${name}`,
      fillStyle: color,
      strokeStyle: color,
    });

    const txtWidth = canvas.textWidth(txt);
    let hoffset = 0;
    if (textwrap) {
      const n = Math.ceil(txtWidth / box.innerWidth);
      hoffset = ((n - 1) * font.size) / 2;
    }
    const tx = box.textx(align);
    let ty = box.texty(valign, hoffset);
    // console.log('tx: ', tx, ', ty:', ty, ', hoffset:', hoffset);
    if (textwrap && txtWidth > box.innerWidth) {
      const textLine = { len: 0, start: 0 };
      for (let i = 0; i < txt.length; i += 1) {
        if (textLine.len >= box.innerWidth) {
          canvas.fillText(txt.substring(textLine.start, i), tx, ty);
          if (underline) {
            drawFontLine(canvas, 'underline', tx, ty, align, valign, font.size, textLine.len);
          }
          ty += font.size + 2;
          textLine.len = 0;
          textLine.start = i;
        }
        textLine.len += canvas.textWidth(txt[i]);
      }
      if (textLine.len > 0) {
        canvas.fillText(txt.substring(textLine.start), tx, ty);
        if (underline) {
          drawFontLine(canvas, 'underline', tx, ty, align, valign, font.size, textLine.len);
        }
      }
    } else {
      // console.log(':::::', txt, tx, ty);
      canvas.fillText(txt, tx, ty);
      if (underline) {
        drawFontLine(canvas, 'underline', tx, ty, align, valign, font.size, txtWidth);
      }
    }
  });
}
