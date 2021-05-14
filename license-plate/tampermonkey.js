// ==UserScript==
// @name         复制车牌号
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        https://gd.122.gov.cn/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $btn = document.createElement('button');
    $btn.style.position = 'fixed';
    $btn.style.top = '100px';
    $btn.style.right = '100px';
    $btn.style.padding = '8px 20px';
    $btn.style.border = 'none';
    $btn.style.background = '#80a9f3';
    $btn.style.color = '#fff';
    $btn.style.fontSize = '16px';
    $btn.style.borderRadius = '5px';
    $btn.innerText = '复制并翻页';

    $btn.addEventListener('click', () => {
        const numbers = Array.from($('#tableContent tbody td:nth-child(3)')).map(td => td.innerText).join('\n') + '\n';

        navigator.clipboard.writeText(numbers).then(function() {
            /* clipboard successfully set */
            console.log('success');

            const $next = $('#mypagination1 li:nth-last-child(2)')[0];
            if ($next) {
                if ($next.classList.contains('disabled')) {
                    console.warn('last page, wont change!');
                } else {
                    const $href = $next.getElementsByTagName('a')[0];
                    if ($href) {
                        $href.click();
                    } else {
                        console.warn('cannot find `a` element');
                    }
                }
            } else {
                console.warn('cannot find `next` button');
            }
        }, function(err) {
            /* clipboard write failed */
            console.log('failed', err);
        });
    });

    document.body.appendChild($btn);
    // Your code here...
})();
