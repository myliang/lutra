/* global document */
import NodeExpr from './node-expr';
import AttrExpr from './attr-expr';
import EventExpr from './event-expr';

export default class TemplateExprs {
  constructor(templateCache) {
    this.tcache = templateCache;
    this.exprs = [];
  }

  update(values) {
    this.exprs.forEach((expr, i) => expr.update(values[i]));
  }

  clone() {
    const { content, exprs } = this.tcache;
    const cloneContent = document.importNode(content, true);
    // 133: SHOW_ELEMENT | SHOW_COMMENT | SHOW_TEXT
    const walker = document.createTreeWalker(cloneContent, 133, null, false);
    let node = walker.nextNode();
    let nIndex = 0;
    let eIndex = 0;

    while (eIndex < exprs.length) {
      const [type, index, ...args] = exprs[eIndex];
      if (nIndex === index) {
        // console.log('type:', type, index, args);
        if (type === 'node') {
          this.exprs.push(NodeExpr.current(node));
        } else if (type === 'event') {
          this.exprs.push(new EventExpr(node, ...args));
        } else if (type === 'attr') {
          this.exprs.push(new AttrExpr(node, ...args));
        }
        eIndex += 1;
      } else {
        nIndex += 1;
        node = walker.nextNode();
      }
    }
    // console.log('exprs:', this.exprs);
    return cloneContent;
  }
}
