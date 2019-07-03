import {
  html, BaseElement, component,
} from '../web-components';
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
  ['color', 'icon'],
)
class ColorPicker extends BaseElement {
  visible = false;

  showHandler = () => {
    // console.log('evt:', evt, this.visible);
    this.visible = !this.visible;
    this.update();
  };

  changeHandler = (evt, v) => {
    // console.log('evt:', evt, v);
    this.onChange(evt, v);
    this.showHandler();
  };

  render() {
    // console.log('icon:', this.icon);
    return html`
    <div class="header" @click.stop="${this.showHandler}" style="border-bottom: 3px solid ${this.color};">
      <xfd-icon type="${this.icon}"></xfd-icon>
    </div>
    <xfd-color-palette class="content" show="${this.visible}"
      @clickoutside="${this.showHandler}"
      @change="${this.changeHandler}"></xfd-color-palette>
    `;
  }
}
