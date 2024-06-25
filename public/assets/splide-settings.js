$(document).ready(function(){
    if ($("#splide-integrators")) {
        var splide = new Splide( '#splide-integrators', {
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
        splide.mount(window.splide.Extensions);
    }
});
