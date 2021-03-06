$(window).on('load', function () {
    $preloader = $('.loaderArea'),
        $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

$(function () {

    $('#main').on('click', function () {
        show($("main"));
        hide($(".service"));
        hide($('.about-us'));
        hide($('.contacts'));
    });

    $('#service').on('click', function () {
        show($(".service"));
        hide($("main"));
        hide($('.about-us'));
        hide($('.contacts'));


    });

    $('#about-us').on('click', function () {
        show($('.about-us'));
        hide($('main'));
        hide($('.service'));
        hide($('.contacts'));

    });

    $('#contacts').on('click', function () {
        show($('.contacts'));
        hide($('main'));
        hide($('.service'));
        hide($('.about-us'));

    });

    $('#main1').on('click', function () {
        show($("main"));
        hide($(".service"));
        hide($('.about-us'));
        hide($('.contacts'));
    });

    $('#service1').on('click', function () {
        show($(".service"));
        hide($("main"));
        hide($('.about-us'));
        hide($('.contacts'));
    });

    $('#about-us1').on('click', function () {
        show($('.about-us'));
        hide($('main'));
        hide($('.service'));
        hide($('.contacts'));
    });

    $('#contacts1').on('click', function () {
        show($('.contacts'));
        hide($('main'));
        hide($('.service'));
        hide($('.about-us'));
    });

    function show(element) {
        element.removeClass("hide");

    }

    function hide(element) {
        element.addClass("hide");
    }

});


var wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       false       // trigger animations on mobile devices (true is default)
    }
);
wow.init();

$(document).ready(function () {
    $('.text .text-block').eq(0).addClass('active').fadeIn(1000);

    setInterval('blockAnimate();', 8000);
});


function blockAnimate() {
    var length = $('.text .text-block').length - 1;
    $('.text .text-block').each(function (index) {
        if ($(this).hasClass('active') && index != length) {
            $(this).removeClass('active').fadeOut(1000).next('.text-block').addClass('active').delay(1000).fadeIn(1000);
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(1000);
            $('.text .text-block').eq(0).addClass('active').delay(1000).fadeIn(1000);
            return false;
        }
    });
};
$(document).ready(function() {
    $('.item').magnificPopup({
        type: "image",
        gallery: {enabled: true
        },
        removaDelay: 300,
        mainClass: 'mfp-fade'
    });

});
