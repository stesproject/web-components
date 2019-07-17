class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", event => {
      if (confirm("Do you really want ot leave?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("sp-confirm-link", ConfirmLink, {extends: "a"});