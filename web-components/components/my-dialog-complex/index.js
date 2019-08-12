fetch( '/web-components/components/my-dialog-complex/index.html' )
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

            connectedCallback() {
                console.log('connected', '首次插入');
                this.updateText();
            }

            disconnectedCallback() {
                console.log('disconnected', '被移除');
            }

            adoptedCallback() {
                console.log('adopted', '被移动到新位置');
            }

            attributeChangedCallback() {
                console.log('attributeChanged', '属性变动');
            }

            updateText() {
                this.shadowRoot.querySelector('.title').innerText = this.getAttribute('title');
                this.shadowRoot.querySelector('.content').innerText = this.getAttribute('content');
            }
        }

        window.customElements.define('my-dialog-complex', Dialog);
    });
