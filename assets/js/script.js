$(window).on('load', function () {
    $preloader = $('.loaderArea'),
        $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

new WOW().init();

$(document).ready(function() {
    $('.text .text-block').eq(0).addClass('active').fadeIn(1000);

    setInterval('blockAnimate();', 8000);
});


function blockAnimate() {
    var length = $('.text .text-block').length - 1;
    $('.text .text-block').each(function(index) {
        if($(this).hasClass('active') && index != length) {
            $(this).removeClass('active').fadeOut(1000).next('.text-block').addClass('active').delay(1000).fadeIn(1000);
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(1000);
            $('.text .text-block').eq(0).addClass('active').delay(1000).fadeIn(1000);
            return false;
        }
    });
};
