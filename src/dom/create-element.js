/* global document */
/* global window */

function getOrSetProperty(target, property, value) {
  if (value) {
    target[property] = value;
    return this;
  }
  return target[property];
}

class CreateElement {
  constructor(cssSelector, ...children) {
    this.tag = 'div';
    this.children = children;
    const [tag, ...classes] = cssSelector.split('.');
    if (!/^\s*$/.test(tag)) this.tag = tag;
    this.d = {};
    this.el = document.createElement(this.tag);
    this.addClass(...classes);
    children.forEach(ele => this.child(ele));
  }

  get classList() {
    return this.el.classList;
  }

  get style() {
    return window.getComputedStyle(this.el, null);
  }

  child(t) {
    if (t) {
      let el = t;
      if (typeof t === 'string') {
        el = document.createTextNode(t);
      } else {
        ({ el } = t);
      }
      this.el.appendChild(el);
      return this;
    }
    return this.children[0];
  }

  on(eventNames, handler) {
    const [first, ...keys] = eventNames.split('.');
    let eventName = first;
    if (eventName === 'mousewheel' && /Firefox/i.test(window.navigator.userAgent)) {
      eventName = 'DOMMouseScroll';
    }
    this.el.addEventListener(eventName, (evt) => {
      handler(evt);
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        if (k === 'left' && evt.button !== 0) {
          return;
        }
        if (k === 'right' && evt.button !== 2) {
          return;
        }
        if (k === 'stop') {
          evt.stopPropagation();
        }
      }
    });
    return this;
  }

  box() {
    return this.el.getBoundingClientRect();
  }

  attr(name, value) {
    const { el } = this;
    if (value) {
      el.setAttribute(name, value);
    } else {
      if (typeof name === 'string') {
        return el.getAttribute(name);
      }
      Object.keys(name).forEach(key => el.setAttribute(key, name[key]));
    }
    return this;
  }

  // css(name)
  // css(name, value)
  // css(names)
  css(name, value) {
    const { el } = this;
    if (value) {
      el.style[name] = value;
    } else {
      if (typeof name === 'string') {
        return el.style[name];
      }
      Object.keys(name).forEach((key) => {
        el.style[key] = name[key];
      });
    }
    return this;
  }

  offset(v) {
    if (v) {
      Object.keys(v).forEach((k) => {
        this.css(k, `${v[k]}px`);
      });
      return this;
    }
    const {
      offsetTop, offsetLeft, offsetHeight, offsetWidth,
    } = this.el;
    return {
      top: offsetTop,
      left: offsetLeft,
      height: offsetHeight,
      width: offsetWidth,
    };
  }

  // get scroll()
  // set scroll({left, top})
  scroll(v) {
    const { el } = this;
    if (v !== undefined) {
      const { left, top } = this;
      if (left !== undefined) el.scrollLeft = left;
      if (top !== undefined) el.scrollTop = top;
      return this;
    }
    return { left: el.scrollLeft, top: el.scrollTop };
  }

  data(key, value) {
    return getOrSetProperty.call(this, this.d, key, value);
  }

  html(html) {
    return getOrSetProperty.call(this, this.el, 'innerHTML', html);
  }

  val(v) {
    return this.property('value', v);
  }

  addClass(...names) {
    names.forEach(name => this.classList.add(name));
    return this;
  }

  hasClass(name) {
    return this.classList.contains(name);
  }

  removeClass(name) {
    return this.classList.remove(name);
  }

  toggleClass(name) {
    return this.classList.toggle(name);
  }

  show() {
    return this.css('display', 'block');
  }

  hide() {
    return this.css('display', 'none');
  }
}

function h(cssSelector, properties, children) {
  return new CreateElement(cssSelector, properties, children);
}

export default h;
