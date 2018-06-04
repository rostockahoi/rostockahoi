var ScrollReveal = require('scrollreveal');
document.addEventListener('DOMContentLoaded', function() {
    var sr = new ScrollReveal({
        distance: '5px',
        duration: 800,
        scale: 0.9
    });

    if (document.querySelector('.project')) {
    	sr.reveal('.project', {});
    }

    if (document.querySelector('body.home .logo')) {
    	sr.reveal('.logo', {});
    }

});
