/* global document */
import Expr from './expr';
import Template from './template';
import TemplateCache from './template-cache';
import TemplateExprs from './template-exprs';

function cc() {
  return document.createComment('');
}

function insert(node) {
  this.e.parentNode.insertBefore(node, this.e);
}

function updateText(value) {
  const { s, e } = this;
  const node = e.previousSibling;
  if (node !== s) {
    node.textContent = value;
  } else {
    insert.call(this, document.createTextNode(value));
  }
  this.v = value;
}

function updateNode(value) {
  if (this.v !== value) {
    insert.call(this, value);
    this.v = value;
  }
}

// value: Template
function updateTemplate(value) {
  // console.log('value:', value, this.v);
  const tcache = TemplateCache.get(value);
  // console.log('tcache:', tcache, this.v);
  if (this.v && this.v.tcache === tcache) {
    this.v.update(value.values);
  } else {
    const templateExprs = new TemplateExprs(tcache);
    const content = templateExprs.clone();
    templateExprs.update(value.values);
    this.v = templateExprs;
    // console.log('templateExprs:', templateExprs);
    insert.call(this, content);
  }
}

function updateArray(value) {
  // console.log('this:', this);
  this.v = this.v || [];
  // console.log('v:', this.v);
  // const root = NodeExpr.insertAfter(this.e);

  let lastIndex = 0;
  let expr;
  // console.log('value:', value);
  value.forEach((item, index) => {
    expr = this.v[index];
    // console.log('index:', expr,  index, item);
    if (expr === undefined) {
      if (index === 0) {
        expr = NodeExpr.insertAfter(this.e);
      } else {
        // console.log('v.last:', this.v[this.v.length - 1]);
        expr = NodeExpr.insertAfter(this.v[this.v.length - 1].e);
      }
      this.v.push(expr);
    }
    expr.update(item);
    lastIndex = index;
  });
  lastIndex += 1;
  // console.log('v:', this.v, lastIndex);
  if (lastIndex < this.v.length) {
    const { s } = this.v[lastIndex];
    this.v.length = lastIndex;
    // console.log('expr:', expr);
    let node = s.nextSibling;
    while (node) {
      const n = node.nextSibling;
      s.parentNode.removeChild(node);
      node = n;
    }
  }
}

function updatePromise(value) {
  this.v = value;
  value.then((v) => {
    if (this.v === value) {
      this.update(v);
    }
  });
}


export default class NodeExpr extends Expr {
  constructor(snode, enode) {
    super();
    this.s = snode;
    this.e = enode;
  }

  update(value) {
    const { v } = this;
    const vtype = typeof value;
    // console.log('vtype:', vtype, value instanceof Template);
    if (vtype !== 'function' && vtype !== 'object') {
      if (value !== v) {
        updateText.call(this, value);
      }
    } else if (value instanceof Template) {
      updateTemplate.call(this, value);
    } else if (value instanceof Node) {
      updateNode.call(this, value);
    } else if (Array.isArray(value)) {
      updateArray.call(this, value);
    } else if (value.then !== undefined) {
      updatePromise.call(this, value);
    }
  }

  static root(container) {
    return new NodeExpr(...['', ''].map(() => container.appendChild(cc())));
  }

  static current(node) {
    return new NodeExpr(node.previousSibling, node);
  }

  static insertAfter(node) {
    const n = node.parentNode.appendChild(cc());
    // console.log('parentNode:', node.parentNode, n.parentNode);
    return new NodeExpr(node, n);
  }
}
