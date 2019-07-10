/* global document */

export default function tooltip(html, target) {
  if (target.classList.contains('active')) {
    return;
  }
  const {
    left, top, width, height,
  } = target.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'x-tooltip';
  el.innerHTML = html;
  document.body.appendChild(el);
  const elBox = el.getBoundingClientRect();
  // console.log('elBox:', elBox);
  el.style.left = `${left + (width / 2) - (elBox.width / 2)}px`;
  el.style.top = `${top + height + 2}px`;

  target.addEventListener('mouseleave', () => {
    if (document.body.contains(el)) {
      document.body.removeChild(el);
    }
  });

  target.addEventListener('click', () => {
    if (document.body.contains(el)) {
      document.body.removeChild(el);
    }
  });
}
