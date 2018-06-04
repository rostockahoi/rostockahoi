/* This is you entry point. */

require('./_nojs.js');

require('./_typewriter.js');
require('./_scrollreveal.js');
require('./_projects.js');

require('./_paperboat.js');


// HANDLE CLICK ON KONTAKT
window.contact = function() {
    var sc = document.getElementById('Smallchat');
    var isOnline = false;
    if (sc && sc.hasChildNodes()) {
        if (sc.firstChild.nodeType !== 8) {
            isOnline = true;
        }
    }
    if (isOnline) {
        Smallchat.open();
    } else {
        var email = document.querySelector('#obf a');
        if (email) {
            email.click();
        }
    }
}
