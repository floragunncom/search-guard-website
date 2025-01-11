document.addEventListener('DOMContentLoaded', function () {
    // Navigation
    var elems = document.querySelectorAll('.sidenav');
    if (elems && elems.length > 0) {
        M.Sidenav.init(elems, {
            edge: "right"
        });
    }

    elems = document.querySelectorAll('.dropdown-trigger');
    if (elems && elems.length > 0) {
        M.Dropdown.init(elems, {
            hover: true,
            coverTrigger: false
        });
    }
    // NL Signup Forms: Add event listener
    elems = document.querySelectorAll('.nl-newsletterform');
    if (elems && elems.length > 0) {
        elems.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                onNewsletterSubscribeClick();
            });
        });
    }
    // Contact Forms: Add event listener
    elems = document.querySelectorAll('.cf-form');
    if (elems && elems.length > 0) {
        elems.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                postDataToCRM(event);
            });
        });
    }

    // Carousel init
    var glide =document.querySelector('.glide');
    if (glide) {
        new Glide(glide, {
            type: 'carousel',
            startAt: 0,
            perView: 4,
            autoplay: 2000,
            hoverpause: false,
        }).mount();

    }

    var elems = document.querySelectorAll('.materialboxed');
    if (elems && elems.length > 0) {
        M.Materialbox.init(elems, options);
    }

    // Slider for Quotes - could be replaced with Glide
    elems = document.querySelectorAll('.slider');
    if (elems && elems.length > 0) {
        const options = {
            indicators: true,
            duration: 500,
        };
        M.Slider.init(elems, options);
    }

});

// Helper functions
function setDisplayProperty(className, display) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.style.display = display;
    });
}

function setTextProperty(className, text) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.text = text;
    });
}

// Handle Newsletter Signups
const onNewsletterSubscribeClick = async () => {
    setNLProcessing(true);
    const formValuesJson = {};
    const formData = new FormData(event.target);
    formValuesJson.email = formData.get("email");
    formValuesJson.ids = formData.getAll("ids");
    // TODO: Fix return codes from AWS Lambda
    handleNewsletterSubmit(formValuesJson)
        .then(response => {
            if (response && response.ok) {
                setNLProcessing(false);
                setNLThanks(true);
            } else {
                setNLProcessing(false);
                setNLThanks(true);
            }
        }).catch(function (error) {
        setNLProcessing(false);
        setNLThanks(true);
    });
};

async function handleNewsletterSubmit(formProps) {
    const data = {};
    // Default options are marked with *
    return fetch('https://sisag8b0fg.execute-api.eu-central-1.amazonaws.com/dev', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            accept: 'application/json; charset=utf-8',
            'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(formProps)
    });
}

async function setNLProcessing(value) {
    setDisplayProperty("nl-newsletterform", "none")
    setDisplayProperty("nl-thanks", "none")
    setDisplayProperty("nl-processing", "block")
}

async function setNLThanks(value) {
    setDisplayProperty("nl-newsletterform", "none")
    setDisplayProperty("nl-thanks", "block")
    setDisplayProperty("nl-processing", "none")
}


// Handle contact form submissions
async function handleContactFormSubmit(formElements) {
    const data = {};
    formElements.forEach(input => {
        data[input.name] = input.value;
    });
    // Default options are marked with *
    return fetch('https://eb4bhjiig1.execute-api.eu-central-1.amazonaws.com/dev/', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            accept: 'application/json; charset=utf-8',
            'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    });
}

const postDataToCRM = async event => {
    setDisplayProperty("cf-submit", "none");
    setDisplayProperty("cf-feedback", "block");
    const formElements = Array.from(event.target);
    handleContactFormSubmit(formElements)
        .then(response => {
            if (response && response.ok) {
                window.location.href = "/thanks/";
            } else {
                window.location.href = "/thanks/";
            }
        }).catch(function (error) {
        window.location.href = "/thanks/";
    });
};
