/* global window */
export function dpr() {
  return window.devicePixelRatio || 1;
}

export function npx(px) {
  return parseInt(px * dpr(), 10);
}

export function thinLineWidth() {
  return dpr() - 0.5;
}

export default {};
