export default function border(canvas, box) {
  const {
    top, right, bottom, left,
  } = box.border;
  canvas.saveRestore(() => {
    if (top) {
      canvas.lineStyle(...top)
        .line(...box.top());
    }
    if (right) {
      canvas.lineStyle(...right)
        .line(...box.right());
    }
    if (bottom) {
      canvas.lineStyle(...bottom)
        .line(...box.bottom());
    }
    if (left) {
      canvas.lineStyle(...left)
        .line(...box.left());
    }
  });
}
