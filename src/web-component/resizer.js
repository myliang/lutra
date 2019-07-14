/* global window */
import {
  html, BaseElement, component, mouseMoveUp,
} from './core';

function initState(state) {
  state.lineVisible = false;
  state.distance = 0;
  return state;
}

function mousedownHandler() {
  return () => {
    const { $state } = this;
    const { type, value, minValue } = this.$props;
    const [,, length] = value;
    let distance = 0;
    const canUpdate = () => length + distance > minValue;
    $state.lineVisible = true;
    this.update();
    // mouseMoveUp
    mouseMoveUp(window, (e) => {
      const { buttons, movementX, movementY } = e;
      if (buttons === 1) {
        distance += type === 'row' ? movementY : movementX;
        // console.log('::::::::>distance:', distance);
        if (canUpdate()) {
          // console.log('>>>>');
          $state.distance = distance;
          this.update();
        }
      }
    }, () => {
      initState($state);
      let v = minValue;
      if (canUpdate()) {
        v = distance + value[2];
      }
      this.change([value[0], v]);
      this.update();
    });
  };
}
export default @component('lutra-resizer')
class Resizer extends BaseElement {
  $state = initState({});

  render() {
    const { classList, $state } = this;
    const { type, value } = this.$props;
    const [, offset, length, hoverLength, lineLength] = value;
    const { distance, lineVisible } = $state;
    // console.log('value:', value);
    const cssKey = type === 'row' ? 'width' : 'height';
    const hostCssKey = type === 'row' ? 'top' : 'left';
    if (!classList.contains(type)) {
      classList.add(type);
    }
    // console.log('distance:', distance, hostCssKey);
    this.style[hostCssKey] = `${offset + length + distance - 5}px`;
    // console.log('style:', this.style);
    // console.log('cssKey:', cssKey);
    const styleFunc = v => ({ [cssKey]: v });
    return html`
    <div class="hover" 
      style="${styleFunc(hoverLength)}"
      @mousedown.stop="${mousedownHandler.call(this)}"></div>
    <div class="line" .show="${lineVisible}"
      style="${styleFunc(lineLength)}"></div>
    `;
  }
}
