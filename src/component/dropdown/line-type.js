import Base from './base';
import Icon from '../../dom/icon';
import { cssPrefix } from '../../config';
import h from '../../dom/create-element';

const lineTypes = [
  ['thin', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>'],
  ['medium', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>'],
  ['thick', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>'],
  ['dashed', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>'],
  ['dotted', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>'],
  // ['double', '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line><line x1="0" y1="2.5" x2="50" y2="2.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>'],
];

export default class LineType extends Base {
  constructor(type) {
    super(type, new Icon('line-type'));
  }

  showArrow() {
    return false;
  }

  content() {
    let beforeIndex = 0;
    const listEls = lineTypes.map(([type, svg], index) => {
      if (this.value === type) beforeIndex = index;
      return h(`.${cssPrefix}-item.state${this.value === type ? '.checked' : ''}`,
        h(`.${cssPrefix}-line-type`).html(svg))
        .on('click', () => {
          listEls[beforeIndex].toggle('checked');
          listEls[index].toggle('checked');
          beforeIndex = index;
          this.update(type);
          this.change(type);
        });
    });

    return listEls;
  }

  updateTitle() {}
}
