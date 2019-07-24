import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: "sp-tooltip-toggle",
  styleUrl: "./tooltip-toggle.css",
  shadow: true
})
export class TooltipToggle {
  @Prop({reflectToAttr: true}) tooltip: string;
  @Prop({reflectToAttr: true, mutable: true}) opened: boolean;

  toggleTooltip() {
    console.log("ok");
  }

  render() {
    return (
      <div>
        <slot />
        <span class="icon" onClick={this.toggleTooltip.bind(this)}>?</span>
      </div>
    );
  }
}