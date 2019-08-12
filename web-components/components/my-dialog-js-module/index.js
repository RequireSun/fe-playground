const importDoc = import.meta.document;

class Dialog extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open',
        });
        shadowRoot.innerHTML = `
<div class="container">
    <div class="mask"></div>
    <div class="inner">
        <h3 class="title">test</h3>
        <p class="content"></p>
        <button class="cancel"></button>
        <button class="confirm"></button>
        <button class="close"></button>
    </div>
</div>
        `;
    }
}

window.customElements.define('my-dialog-js-module', Dialog);
