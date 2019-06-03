export default function clipRect(canvas, box, contentcb) {
  const {
    x, y, width, height, bgcolor,
  } = box;
  canvas.saveRestore(() => {
    canvas.attr({ fillStyle: bgcolor || '#fff' })
      .rect(x, y, width - 1, height - 1)
      .clip()
      .fill();
    contentcb();
    /*
    canvas.saveRestore(() => {
      canvas.rect(x + 5, y + 5, width - 2, height - 2).clip();
      contentcb();
    });
    */
  });
}
