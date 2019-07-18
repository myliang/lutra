/* global document */
import Expr from './expr';
import EventExpr from './event-expr';
import AttrExpr from './attr-expr';
import PropExpr from './prop-expr';
import NodeExpr from './node-expr';

const marker = '{}';
const nodeMarker = '<!---->';

const stringsContentCache = new Map();

function htmlElementContent(strings) {
  let content = stringsContentCache.get(strings);
  if (content === undefined) {
    let html = '';
    const lastIndex = strings.length - 1;
    for (let i = 0; i < lastIndex; i += 1) {
      const str = strings[i];
      html += str;
      const closei = str.lastIndexOf('>');
      html += (closei > -1 && str.indexOf('<', closei + 1) === -1)
        ? nodeMarker : marker;
    }
    html += strings[lastIndex];
    // template
    const el = document.createElement('template');
    el.innerHTML = html;
    ({ content } = el);
    stringsContentCache.set(strings, content);
  }
  return content;
}

export default class TemplateExpr extends Expr {
  constructor(strings) {
    super(htmlElementContent(strings));
    this.exprs = [];
  }

  update(values) {
    const nodeSet = new Set();
    this.exprs.forEach((expr, i) => {
      if (expr.update(values[i])) {
        nodeSet.add(expr.el);
      }
    });
    nodeSet.forEach((node) => {
      if (node.update) {
        node.update();
      }
    });
    return nodeSet.size > 0;
  }

  clone() {
    const content = document.importNode(this.v, true);
    this.content = content;
    const walker = document.createTreeWalker(content, 133, null, false);
    // console.log('content:', element);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const { nodeType } = node;
      // console.log('node:', node, nodeType);
      if (nodeType === 1) {
        // Node.ELEMENT_NODE
        if (node.hasAttributes()) {
          // const attrs = [];
          // console.log('attributes:', node.attributes);
          const { attributes } = node;
          for (let i = 0; i < attributes.length; i += 1) {
            const { name, value } = attributes[i];
            // console.log('name:', name, value, name.startsWith('.'));
            if (value.indexOf(marker) > -1) {
              // const values = value.split(Template.marker);
              if (name.startsWith('@')) {
                // exprs.push(['event', index, name.slice(1)]);
                this.exprs.push(new EventExpr(node, name.slice(1)));
              } else if (name.startsWith('.')) {
                this.exprs.push(new PropExpr(node, name.slice(1)));
              } else {
                // exprs.push(['attr', index, name, value]);
                this.exprs.push(new AttrExpr(node, name, value));
              }
              node.removeAttribute(name);
              i -= 1;
            } else if (name.startsWith('.')) {
              PropExpr.setElementProp(node, name.slice(1), value);
              node.removeAttribute(name);
              i -= 1;
            }
          }
        }
      } else if (nodeType === 3) {
        // Node.TEXT_NODE
      } else if (nodeType === 8) {
        // Node.COMMENT_NODE
        const { nodeValue } = node;
        // console.log('comment_node.value:', nodeValue);
        if (nodeValue === '') {
          // exprs.push(['node', index]);
          this.exprs.push(NodeExpr.current(node));
        }
      }
    }
    // console.log('content:', content, this.exprs);
    return content;
  }
}
