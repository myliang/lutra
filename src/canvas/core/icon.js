const defaultStyle = '#e6e6e6';

const draw = {
  bool(canvas, { width }) {
    canvas.attr({
      strokeStyle: '#999999',
      lineWidth: 2,
    }).roundRect((-width / 2) + 8, 2, 12, 12, 2).stroke();
  },
  select(canvas) {
    canvas.attr({ fillStyle: defaultStyle })
      .moveTo(2, 4)
      .lineTo(12, 4)
      .lineTo(7, 12)
      .closePath()
      .fill();
  },
  date(canvas) {
    canvas.attr({
      strokeStyle: defaultStyle,
      lineWidth: 1,
    })
      .line([5, 2], [5, 5])
      .line([11, 2], [11, 5])
      .line([2, 7], [14, 7])
      .rect(2, 4, 12, 10)
      .stroke();
  },
};

export default function icon(canvas, type, box) {
  const {
    x, y, width, height,
  } = box;
  const sx = x + width - 20;
  const sy = y + height - 20;
  // console.log('type:', type);
  canvas.saveRestore(() => {
    canvas.translate(sx, sy);
    // console.log('sx:', sx, ', sy:', sy, draw[type]);
    if (draw[type]) draw[type](canvas, box);
    /*
    else {
      canvas.attr({ fillStyle: defaultStyle })
        .fillRect(2, 4, 10, 10);
    }
    */
  });
}
