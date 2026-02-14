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
    var elems = document.querySelectorAll('.materialboxed');
    if (elems && elems.length > 0) {
        M.Materialbox.init(elems);
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
