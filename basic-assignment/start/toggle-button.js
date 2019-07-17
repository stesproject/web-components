class ToggleButton extends HTMLElement {
  constructor() {
    super();
    // Define variables and properties for this component
    this._isHidden = true;
    this._button;
    this._infoEl;
    this._buttonTextShow = "show";
    this._buttonTextHide = "hide";
    // Attach shadow and define component style in shadowRoot
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
    <style>
      #info-box {
        display: none;
      }
    </style>
    <button></button>
    <p id="info-box">
      <slot></slot>
    </p>
    `;

    this._button = this.shadowRoot.querySelector("button");
    this._infoEl = this.shadowRoot.querySelector("#info-box");
    this._button.addEventListener("click", this._toggleInfoBox.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute("textShow")) {
      this._buttonTextShow = this.getAttribute("textShow");
    }

    if (this.hasAttribute("textHide")) {
      this._buttonTextHide = this.getAttribute("textHide");
    }

    this._button.textContent = this._buttonTextShow;
  }

  _toggleInfoBox() {
    this._infoEl.style.display = this._isHidden ? 'block' : 'none';
    this._button.textContent = this._isHidden ? this._buttonTextHide : this._buttonTextShow;

    this._isHidden = !this._isHidden;
  }
}

customElements.define("sp-toggle-button", ToggleButton);