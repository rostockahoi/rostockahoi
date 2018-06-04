/*globals Typewriter*/
require('./_typewriter-lib.js');

document.addEventListener('DOMContentLoaded', function() {
    var tw = document.getElementById('typewriter');

    if (tw) {
        var typewriter = new Typewriter(tw, {
            autoStart: true,
            loop: true,
            typingSpeed: 66,
            deleteSpeed: 200
        });
        setTimeout(function() {
            window.scrollTo(window.scrollX, window.scrollY + 1);
        }, 5000);
        window.addEventListener('scroll', function(e) {
            typewriter.typeString('Moin! ')
                .pauseFor(1000)
                .deleteChars(2)
                .pauseFor(200)
                .typeString(', ')
                .pauseFor(500)
                .typeString('ich bin Johannes ')
                .pauseFor(1000)
                .typeString('– Entwickler.')
                .pauseFor(1500)
                .changeSettings({ deleteSpeed: 100 })
                .deleteChars(11)
                .pauseFor(500)
                .typeString('Designer.')
                .pauseFor(1500)
                .deleteChars(9)
                .pauseFor(500)
                .changeSettings({ deleteSpeed: 400 })
                .typeString('Snowbao')
                .changeSettings({ deleteSpeed: 100 })
                .pauseFor(700)
                .deleteChars(2)
                .typeString('oarder.')
                .pauseFor(2000)
                .deleteChars(12)
                .pauseFor(500)
                .typeString('Ingenieur.')
                .pauseFor(2500)
                .deleteChars(10)
                .pauseFor(500)
                .typeString('Bullifahrer.')
                .pauseFor(2500)
                .deleteChars(12)
                .pauseFor(500)
                .typeString('Rostocker.')
                .pauseFor(2500)
                .deleteChars(10)
                .pauseFor(500)
                .typeString('Entwickler')
                .pauseFor(1000)
                .typeString('.')
                .pauseFor(3600000)
                .deleteAll();
            // remove event listener after firing once
            e.target.removeEventListener(e.type, arguments.callee);
        });
    }
});
