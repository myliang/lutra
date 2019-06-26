/* global document */
import Template from './template';

const cache = new Map();

function parse(content) {
  const exprs = [];
  // 133: SHOW_ELEMENT | SHOW_COMMENT | SHOW_TEXT
  const walker = document.createTreeWalker(content, 133, null, false);
  // console.log('content:', element);
  let index = -1;
  while (walker.nextNode()) {
    index += 1;
    const node = walker.currentNode;
    const { nodeType } = node;
    // console.log('node:', node);
    if (nodeType === 1) {
      // Node.ELEMENT_NODE
      if (node.hasAttributes()) {
        // const attrs = [];
        // console.log('attributes:', node.attributes);
        const { attributes } = node;
        for (let i = 0; i < attributes.length; i += 1) {
          const { name, value } = attributes[i];
          // console.log('name:', name, value);
          if (value.indexOf(Template.marker) > -1) {
            // const values = value.split(Template.marker);
            if (name.startsWith('@')) {
              exprs.push(['event', index, name.slice(1)]);
              // exprs.push(new EventExpr(node, name.slice(1)));
            } else {
              exprs.push(['attr', index, name, value]);
              // exprs.push(new AttrExpr(node, name, value));
            }
            node.removeAttribute(name);
            i -= 1;
          }
        }
      }
    } else if (nodeType === 3) {
      // Node.TEXT_NODE
      const { nodeValue } = node;
      // console.log('text_node.value:', nodeValue);
      if (nodeValue.indexOf(Template.marker) < 0) continue;
    } else if (nodeType === 8) {
      // Node.COMMENT_NODE
      const { nodeValue } = node;
      // console.log('comment_node.value:', nodeValue);
      if (nodeValue === '') {
        exprs.push(['node', index]);
        // exprs.push(NodeExpr.current(node));
      }
    }
  }
  return exprs;
}

export default class TemplateCache {
  constructor(template) {
    const { content } = template.element;
    this.content = content;
    // [type, index, ...args]
    // type: node | attr
    this.exprs = parse(content);
  }

  static get(template) {
    const { strings } = template;
    let o = cache.get(strings);
    if (o === undefined) {
      cache.set(strings, o = new TemplateCache(template));
    }
    return o;
  }
}
