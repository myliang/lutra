import {
  html, BaseElement, component,
} from './core';
import './color-palette';
import './icon';

export default @component(
  'xfd-color-picker',
  `
  :host {
    position: relative;
  }
  .content {
    position: absolute;
    z-index: 200;
    background: #fff;
    box-shadow: 1px 2px 5px 2px rgba(51,51,51,.15);
  }
  :host.bottom .content{
    top: calc(~'100% + 5px');
  }
  :host.left .content{
    left: 0;
  }
  :host.right .content{
    right: 0;
  }
  `,
)
class ColorPicker extends BaseElement {
  showHandler = () => {
    // console.log('evt:', evt, this.visible);
    const { visible, setVisible } = this.$state;
    setVisible(!visible);
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
    <div class="header" @click.stop="${this.showHandler}" style="border-bottom: 3px solid ${color};">
      <xfd-icon .type="${icon}"></xfd-icon>
    </div>
    <xfd-color-palette class="content" .show="${visible}"
      @clickoutside="${this.showHandler}"
      @change="${this.changeHandler}"></xfd-color-palette>
    `;
  }
}
