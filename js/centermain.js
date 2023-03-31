$(document).ready(function() {

    $('.counter').counterUp({
        time: 1000
    })
});




var info = [{
        "id": "RAJASTHAN",
        "centre": "Jaipur"
    }, {
        "id": "MADHYA PRADESH",
        "centre": "Gwalior"
    }, {
        "id": "KERALA",
        "centre": "Pallakad"
    }, {
        "id": "CHHATTISGARH",
        "centre": "Raipur"
    }, {
        "id": "MAHARASHTRA",
        "centre": "Wardha, Samvedna"
    }, {
        "id": "TAMIL NADU",
        "centre": "Chennai"
    }, {
        "id": "PUNJAB",
        "centre": "Sukhmani"
    }, {
        "id": "BIHAR",
        "centre": "Gaya"
    }, {
        "id": "JHARKHAND",
        "centre": "FFI"
    }, {
        "id": "WEST BENGAL",
        "centre": "Kharagpur"
    }, {
        "id": "HARYANA",
        "centre": "Kurukshetra"
    },

]
$description = $(".description");

$('.enabled').hover(function() {
    var currState = $(this).attr('id');
    var currStateInfo = info.filter(function(x) {
        return x.id == currState
    });
    if (currStateInfo[0]) {
        $(this).attr("class", "enabled heyo");
        $description.addClass('active');
        $description.html($(this).attr('id') + ":<br> " + currStateInfo[0].centre);
        $('.light-center-name').html(currStateInfo[0].centre);
        if (currStateInfo[0].centre === 'Kurukshetra') $('.light-center-info').html('Kurukshetra Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'FFI') $('.light-center-info').html('FFI Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'Gaya') $('.light-center-info').html('Gaya Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'Sukhmani') $('.light-center-info').html(' LIGHT SUKHMANI was formed in november 2019 .The centre was made with determination and by hardworking people for the betterment of the society.');
        if (currStateInfo[0].centre === 'Chennai') $('.light-center-info').html('Chennai Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'Wardha, Samvedna') $('.light-center-info').html('Wardha, Samvedna Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'Raipur') $('.light-center-info').html(' aims in helping people\'s social, economic, cultural development and encouraging them to find solutions to their problems based on available sources. ');
        if (currStateInfo[0].centre === 'Pallakad') $('.light-center-info').html('LIGHT has come up with a platform to accomplish the necessities of the feeble fragments of a community. It is a unique body whose fabric has been woven by a very strong network of socially motivated students.');
        if (currStateInfo[0].centre === 'Gwalior') $('.light-center-info').html('Gwalior Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
        if (currStateInfo[0].centre === 'Jaipur') $('.light-center-info').html('Jaipur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad numquam dicta nesciunt quam tempora, at ut ipsam nisi eveniet? Cumque ducimus rem placeat a quaerat dolores laudantium doloribus voluptate explicabo?');
    }
}, function() {
    $description.removeClass('active');
});
var topalign = ($(window).width() < 992) ? 410 : 500
$(window).resize(function() {
    if ($(window).width() < 992) topalign = 410
    else topalign = 500
})
$(document).on('mousemove', function(e) {

    $description.css({
        left: e.pageX,
        top: e.pageY - topalign
    });

});



(function() {

    // VARIABLES
    const timeline = document.querySelector(".timeline ol"),
        elH = document.querySelectorAll(".timeline li > div"),
        arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        firstItem = document.querySelector(".timeline li:first-child"),
        lastItem = document.querySelector(".timeline li:last-child"),
        xScrolling = 280,
        disabledClass = "disabled";

    // START
    window.addEventListener("load", init);

    function init() {
        setEqualHeights(elH);
        animateTl(xScrolling, arrows, timeline);
        setSwipeFn(timeline, arrowPrev, arrowNext);
        setKeyboardFn(arrowPrev, arrowNext);
    }

    // SET EQUAL HEIGHTS
    function setEqualHeights(el) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;

            if (counter < singleHeight) {
                counter = singleHeight;
            }
        }

        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
        }
    }

    // CHECK IF AN ELEMENT IS IN VIEWPORT
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // SET STATE OF PREV/NEXT ARROWS
    function setBtnState(el, flag = true) {
        if (flag) {
            el.classList.add(disabledClass);
        } else {
            if (el.classList.contains(disabledClass)) {
                el.classList.remove(disabledClass);
            }
            el.disabled = false;
        }
    }

    // ANIMATE TIMELINE
    function animateTl(scrolling, el, tl) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function() {
                if (!arrowPrev.disabled) {
                    arrowPrev.disabled = true;
                }
                if (!arrowNext.disabled) {
                    arrowNext.disabled = true;
                }
                const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
                if (counter === 0) {
                    tl.style.transform = `translateX(-${scrolling}px)`;
                } else {
                    const tlStyle = getComputedStyle(tl);
                    // add more browser prefixes if needed here
                    const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                    const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
                    tl.style.transform = `translateX(${values}px)`;
                }

                setTimeout(() => {
                    isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
                    isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
                }, 1100);

                counter++;
            });
        }
    }

    // ADD SWIPE SUPPORT FOR TOUCH DEVICES
    function setSwipeFn(tl, prev, next) {
        const hammer = new Hammer(tl);
        hammer.on("swipeleft", () => next.click());
        hammer.on("swiperight", () => prev.click());
    }

    // ADD BASIC KEYBOARD FUNCTIONALITY
    function setKeyboardFn(prev, next) {
        document.addEventListener("keydown", (e) => {
            if ((e.which === 37) || (e.which === 39)) {
                const timelineOfTop = timeline.offsetTop;
                const y = window.pageYOffset;
                if (timelineOfTop !== y) {
                    window.scrollTo(0, timelineOfTop);
                }
                if (e.which === 37) {
                    prev.click();
                } else if (e.which === 39) {
                    next.click();
                }
            }
        });
    }

})();