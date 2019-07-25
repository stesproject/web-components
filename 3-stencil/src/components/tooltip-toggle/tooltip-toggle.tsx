import { h, Component, Prop, State } from '@stencil/core';

@Component({
  tag: "sp-tooltip-toggle",
  styleUrl: "./tooltip-toggle.css",
  shadow: true
})
export class TooltipToggle {
  @Prop({reflectToAttr: true}) text: string;
  @State() tooltipVisible = false;

  onToggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  render() {
    let tooltip = null;
    if (this.tooltipVisible) {
      tooltip = <div id="tooltip-text">{this.text}</div>;
    }
    return [
      <slot />,
      <span id="tooltip-icon" onClick={this.onToggleTooltip.bind(this)}>
        ?
      </span>,
      tooltip
    ];
  }
}