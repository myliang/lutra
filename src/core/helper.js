/* global window */
// event methods
export function bind(target, name, fn) {
  target.addEventListener(name, fn);
}

export function unbind(target, name, fn) {
  target.removeEventListener(name, fn);
}

export function unbindClickoutside(el) {
  if (el.onClickoutside) {
    unbind(window, 'click', el.onClickoutside);
    delete el.onClickoutside;
  }
}

// the left mouse button: mousedown → mouseup → click
// the right mouse button: mousedown → contenxtmenu → mouseup
// the right mouse button in firefox(>65.0): mousedown → contenxtmenu → mouseup → click on window
export function bindClickoutside(el, cb) {
  el.onClickoutside = (evt) => {
    // ignore double click
    // console.log('evt:', evt);
    if (evt.detail === 2 || el.contains(evt.target)) return;
    if (cb) cb(el);
    else {
      el.hide();
      unbindClickoutside(el);
    }
  };
  bind(window, 'click', el.onClickoutside);
}

export function mouseMoveUp(target, movefunc, upfunc) {
  bind(target, 'mousemove', movefunc);
  const t = target;
  t.xEvtUp = (evt) => {
    // console.log('mouseup>>>');
    unbind(target, 'mousemove', movefunc);
    unbind(target, 'mouseup', target.xEvtUp);
    upfunc(evt);
  };
  bind(target, 'mouseup', target.xEvtUp);
}

export function loop() {}

export function offset(v) {
  ['left', 'top', 'width', 'height'].forEach((key) => {
    if (v[key] !== undefined) this.style[key] = `${v[key]}px`;
  });
}

export function toggle(flag, cls = 'active') {
  if (flag) this.classList.add(cls);
  else this.classList.remove(cls);
}

export function equals(obj1, obj2) {
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    if (obj1 === obj2) return true;
    const keys = Object.keys(obj1);
    if (keys.length !== Object.keys(obj2).length) return false;
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const v1 = obj1[k];
      const v2 = obj2[k];
      if (v2 === undefined) return false;
      if (typeof v1 === 'string' || typeof v1 === 'number' || typeof v1 === 'boolean') {
        if (v1 !== v2) return false;
      } else if (Array.isArray(v1)) {
        if (v1.length !== v2.length) return false;
        for (let ai = 0; ai < v1.length; ai += 1) {
          if (!equals(v1[ai], v2[ai])) return false;
        }
      } else if (typeof v1 !== 'function' && !Array.isArray(v1) && v1 instanceof Object) {
        if (!equals(v1, v2)) return false;
      }
    }
    return true;
  }
  return obj1 === obj2;
}
