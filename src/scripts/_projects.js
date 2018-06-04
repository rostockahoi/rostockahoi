require('./_util.js');
const LazyLoad = require('vanilla-lazyload');

document.addEventListener('DOMContentLoaded', function(e) {

	new LazyLoad({
		Elements_selector: '.project__image'
	});

    var projectLinks = document.querySelectorAll('.project__link')
    if (projectLinks) {
        Array.from(projectLinks).forEach(function(el) {
            el.classList.add('project__link--cursor');
            var parent = getParents(el, '.project');
            el.addEventListener('click', function(e) {
                e.preventDefault();
                parent[0].classList.toggle('project--view');
            });
            parent[0].addEventListener('mouseleave', function(e) {
                parent[0].classList.remove('project--view');
            });
        })
    }
});
