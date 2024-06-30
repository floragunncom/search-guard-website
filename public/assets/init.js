
$(document).ready(function(){
    initializeSplideSliders();
    initializeJourneyCollabsible();
    initializeQuotesSlider();
    initializeTimelineCollapsible();
    initializeMaterialImages();
    initializeCopyCodeHandlers();
});

function initializeSplideSliders() {
    // initialize sliders if present
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
}
function initializeJourneyCollabsible() {

    if ($("#journey-root").length) {
        var elements = document.querySelectorAll('#journey-root');
        elements.forEach((element) => {
            element.addEventListener('click', () => {
                var collapseBody = element.nextSibling
                var icon = element.querySelector("#icon")
                if (collapseBody.classList.contains("hidden")) {
                    // up and down arrow
                    icon.innerHTML = "keyboard_arrow_down";
                    collapseBody.classList.remove("hidden");
                    setTimeout(() => {
                        collapseBody.classList.add("fadein");
                        collapseBody.classList.remove("hidden");
                    }, "100");
                } else {
                    // up and down arrow
                    icon.innerHTML = "keyboard_arrow_up";
                    collapseBody.classList.remove("fadein");
                    setTimeout(() => {
                        collapseBody.classList.add("hidden");
                    }, "200");
                }
            });
        });
    }
}

function initializeQuotesSlider() {
    if ($(".slider").length) {
        const elems = document.querySelectorAll('.slider');
        const options = {
            indicators: true,
            duration: 750,
        };
        M.Slider.init(elems, options);
    }
}

function initializeTimelineCollapsible() {
    if ($(".collapsible").length) {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }
}

function initializeMaterialImages() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems, {});
}

// Copy code feature for blog articles

function initializeCopyCodeHandlers() {
    var elements = document.querySelectorAll('.copy-code');
    elements.forEach((element) => {
        element.addEventListener('click', copyCode);
    });
}
async function copyCode(event) {
    event.preventDefault();
    let codeElem = event.target.nextSibling.firstChild;
    writeClipboardText(codeElem.textContent, event.target)
}

async function writeClipboardText(text, elem) {
    try {
        await navigator.clipboard.writeText(text);
        // visual feedback
        elem.textContent = "copied"
        setTimeout(function() {elem.textContent = "copy"}, 1000);
    }
    catch (error) {
        elem.textContent = "An error occured";
    }
}