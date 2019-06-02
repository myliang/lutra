export default function clip(canvas, box, contentcb) {
  const {
    x, y, width, height,
  } = box;
  canvas.saveRestore(() => {
    canvas.attr({ fillStyle: box.bgcolor || '#fff' })
      .rect(x, y, width, height)
      .clip()
      .fill();
    contentcb();
  });
}
