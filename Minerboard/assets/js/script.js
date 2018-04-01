new WOW().init();

$(window).on('load', function () {
    var $preloader = $('#preloader'),
        $spinner = $preloader.find('.status');
    $spinner.fadeOut();
    $preloader.delay(200);
    $('body').removeClass('loading');
    $preloader.fadeOut(1000);
});

$(".background").interactive_bg({
    strength: 20,
    scale: 1.05,
    animationSpeed: ".5s",
    contain: true,
    wrapContent: false
});

$(window).resize(function () {
    $(".background > .ibg-bg").css({
        width: $(window).outerWidth()
    })
})

window.sr = ScrollReveal();
sr.reveal('.enter', {
    duration: 1500,
    delay: 500,
    origin: 'top',
    scale: 1,
    easing: 'ease-out'
});

sr.reveal('.enter-top', {
    duration: 1500,
    delay: 500,
    origin: 'top',
    distance: '75px',
    scale: 1,
    easing: 'ease-out'
});

sr.reveal('.enter-down', {
    duration: 1500,
    delay: 500,
    origin: 'bottom',
    distance: '75px',
    scale: 1,
    easing: 'ease-out'
})

sr.reveal('.enter-left', {
    duration: 900,
    delay: 450,
    origin: 'left',
    distance: "100px",
    scale: 1,
    easing: 'ease-out'
});

sr.reveal('.enter-right', {
    duration: 900,
    delay: 50,
    origin: 'right',
    distance: "100px",
    scale: 1,
    easing: 'ease-out'
});

sr.reveal('.service-box', {
    duration: 900,
    delay: 800,
    origin: 'left',
    distance: "100px",
    scale: 1,
    easing: 'ease-out'
}, 200);

sr.reveal('.contacts-animate', {
    duration: 900,
    delay: 1100,
    origin: 'bottom',
    distance: "100px",
    scale: 1,
    easing: 'ease-out'
});

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
    relativeInput: true
});

parallaxInstance.friction(0.1);
