import {
  html, BaseElement, component,
} from './core';
import './color-palette';
import './icon';

export default @component('xfd-color-picker')
class ColorPicker extends BaseElement {
  $state = {
    visible: false,
  };

  showHandler = () => {
    const { $state } = this;
    $state.visible = !$state.visible;
    this.update();
  };

  changeHandler = (evt, v) => {
    // console.log('evt:', evt, v);
    this.change(evt, v);
    this.showHandler();
  };

  render() {
    const { icon, color } = this.$props;
    const { visible } = this.$state;
    // console.log('icon:', icon, ', color:', color);
    return html`
    <xfd-icon .type="${icon}" @click.stop="${this.showHandler}"
      style="border-bottom: 3px solid ${color}; height: 16px;">
    </xfd-icon>
    <xfd-color-palette class="content" .show="${visible}"
      @clickoutside="${this.showHandler}"
      @change="${this.changeHandler}"></xfd-color-palette>
    `;
  }
}
