const padding = 4;

export default function tag(canvas, box, options, key) {
  let { x, y } = box;
  x += padding;
  y += padding;
  options.split(',').forEach((option) => {
    const [k, v] = option.split(':');
    let [bgcolor, color] = ['#e8e8e8', '#000'];
    if (k === key) [bgcolor, color] = ['#4b89ff', '#fff'];
    const w = canvas.textWidth(v) + 16;
    canvas.saveRestore(() => {
      canvas.attr({
        fillStyle: bgcolor,
      }).fillRect(x, y, w, 18);
      // canvas.fillText(v, x, y);
    }).saveRestore(() => {
      canvas.attr({
        textAlign: 'center',
        textBaseline: 'middle',
        fillStyle: color,
        font: '560 8.5pt Source Sans Pro',
      }).fillText(v, x + w / 2, y + 9);
    });

    x += w + padding;
  });
}
