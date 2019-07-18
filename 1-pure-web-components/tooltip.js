class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Some dummy tooltip text.";
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
    <style>
      div {
        font-weight: normal;
        background-color: #000;
        color: #fff;
        position: absolute;
        top: 1.5rem;
        left: 0.75rem;
        z-index: 10;
        padding: 0.15rem;
        border-radius: 3px;
        box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
      }

      :host {
        position: relative;
      }

      :host(.important) {
        background: var(--color-primary, #ccc);
        padding: 0.15rem;
      }

      :host-context(p) {
        font-weight: bold;
      }

      .highlight {
        background-color: red;
      }

      ::slotted(.highlight) {
        border-bottom: 1px dotted red;
      }

      .icon {
        background: black;
        color: white;
        padding: 0.15rem 0.5rem;
        text-align: center;
        border-radius: 50%;
        cursor: pointer; 
      }
    </style>
    <slot>Some default</slot>
    <span class="icon">?</span>
    `;
  }
  
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    // It is possible to set inline style for elements, but it is preferred to set the style using the ":host" keyword in the shadowRoot.
    // this.style.position = "relative";
    this._render();
  }

  // Receive 3 arguments: 
  // - The name of the attribute which changed
  // - The old value of that attribute
  // - The new value
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === "text") {
      this._tooltipText = newValue;
    }
  }

  // By default changes are not observed (for performance reasons), 
  // so you should specify in this method which elements you want to observe for changes.
  static get observedAttributes() {
    return ["text"];
  }

  // Use it to cleanup event listeners or any work in general.
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    }
    else if (tooltipContainer) {
      this.shadowRoot.removeChild(tooltipContainer);
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

}

customElements.define("sp-tooltip", Tooltip);