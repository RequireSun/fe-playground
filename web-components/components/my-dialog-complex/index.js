fetch( './components/my-dialog-complex/index.html' )
    .then(steam => steam.text())
    .then(text => {
        class Dialog extends HTMLElement {
            static FIELDS = ['title', 'content'];

            attr = new Proxy({}, {
                /**
                 * 一个 proxy 解决所有问题
                 * @param target {*}
                 * @param property {string}
                 * @returns {string}
                 */
                get: (target, property) => {
                    return this.getAttribute(property);
                },
                /**
                 * 一个 proxy 解决所有问题
                 * @param target {*}
                 * @param property {string}
                 * @param value {*}
                 */
                set: (target, property, value) => {
                    this.setAttribute(property, value);
                    return true;
                },
            });

            static get observedAttributes() {
                return Dialog.FIELDS;
            }

            constructor() {
                super();
                const shadowRoot = this.attachShadow({
                    mode: 'open',
                });
                shadowRoot.innerHTML = text;

                shadowRoot.querySelector('.confirm').addEventListener('click', (...args) => this.handlerConfirmClick(...args));
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

            attributeChangedCallback(name, oldValue, newValue) {
                console.log('attributeChanged', '属性变动', name, oldValue, newValue);

                if (-1 < Dialog.FIELDS.indexOf(name) && this.shadowRoot.querySelector(`.${name}`).innerText !== `${this.attr[name]}`) {
                    this.updateText();
                }
            }

            updateText() {
                for (let i = 0, l = Dialog.FIELDS.length; i < l; ++i) {
                    const $el = this.shadowRoot.querySelector(`.${Dialog.FIELDS[i]}`);
                    if ($el.innerText !== `${this.attr[Dialog.FIELDS[i]]}`) {
                        $el.innerText = this.attr[Dialog.FIELDS[i]];
                    }
                }
            }

            handlerConfirmClick(e) {
                console.log('点击确认');

                this.attr.title += '测试';
            }
        }

        window.customElements.define('my-dialog-complex', Dialog);
    });
