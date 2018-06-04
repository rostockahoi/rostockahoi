var swal2 = require('sweetalert2');

document.addEventListener('DOMContentLoaded', function(e) {
    var pb = document.getElementById('paperboat');
    if (pb) {
        pb.addEventListener('click', function(e) {
            window.ga('send', 'event', 'Papierschiff', 'Schiff versenkt');
            var parent = getParents(pb, ".paperboat");
            if (parent[0]) {
                parent[0].classList.add("paperboat--sos");
            }
            setTimeout(function() {
                swal2({
                    title: "Schiff versenkt.",
                    text: "Sie haben mein Papierschiff versenkt, soll ich ein neues falten?",
                    showCancelButton: true,
                    confirmButtonColor: "#FF705D",
                    confirmButtonText: "Ja, bitte.",
                    cancelButtonText: "Nein :(",
                    imageUrl: '/assets/img/paperboat-icon.svg',
                    imageWidth: 100,
                    reverseButtons: true,
                    allowOutsideClick: false,
                    imageHeight: 100
                }).then((result) => {
                    window.ga('send', 'event', 'Papierschiff', 'Neues Schiff gefaltet');
                    parent[0].classList.remove("paperboat--sos");
                }, () => {
                    swal2({
                        title: "Teilen",
                    	imageWidth: 100,
                    	imageHeight: 100,
                        imageUrl: '/assets/img/paperboat-icon.svg',
                        confirmButtonColor: "#3B5998",
                        confirmButtonText: "Facebook-Seite öffnen",
                        text: "Okay, kein neues Papierschiff, aber ich würde mich über einen Like auf meiner Facebook-Seite freuen!"
                    }).then(() => {
                    	window.ga('send', 'event', 'Papierschiff', 'Facebook geöffnet');
                    	window.open('https://www.facebook.com/rostockahoiweb');
                    }, () => {
                    	window.ga('send', 'event', 'Papierschiff', 'Facebook nicht geöffnet');
                    });
                });
            }, 3500);
        });
    }
});
