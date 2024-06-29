$(document).ready(function(){
    console.log("ready");
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
        let a = splideIntegrators.mount(window.splide.Extensions);
        console.log("mounted splideIntegrators");
        console.log(a);
        console.log(a.state.is);
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
        console.log("mounted splideReferences");
    }
});
