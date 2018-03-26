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