$(document).ready(function(){
    if ($("#splide-integrators").length) {
        var splideIntegrators = new Splide( '#splide-integrators', {
                type   : 'loop',
                drag   : 'free',
                focus  : 'center',
                pauseOnHover: false,
                autoStart: true,
                autoWidth: true,
                perPage: 10,
                lazyload: true,
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: 0.6,
                    pauseOnHover: false,
                    pauseOnFocus: false
                },
            }
        );
        splideIntegrators.mount(window.splide.Extensions);
    }

    if ($("#splide-references").length) {
        var splideReferences = new Splide( '#splide-references', {
                type   : 'loop',
                drag   : 'free',
                focus  : 'center',
                pauseOnHover: false,
                autoStart: true,
                autoWidth: true,
                perPage: 10,
                lazyload: true,
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: 0.6,
                    pauseOnHover: false,
                    pauseOnFocus: false
                },
            }
        );
        splideReferences.mount(window.splide.Extensions);
    }
});
