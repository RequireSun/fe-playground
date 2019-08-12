fetch( '/web-components/components/my-dialog-html-file/index.html' )
    .then(steam => steam.text())
    .then(text => {
        class Dialog extends HTMLElement {
            constructor() {
                super();
                const shadowRoot = this.attachShadow({
                    mode: 'open',
                });
                shadowRoot.innerHTML = text;
            }
        }

        window.customElements.define('my-dialog-html-file', Dialog);
    });
