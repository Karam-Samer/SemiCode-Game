let basket = $('.basket'),
    halfBasketWidth = basket.outerWidth(true) / 2,
    eggs = $('i[class="fa-solid fa-egg"]'),
    brokenEgg = $('.brokenEgg'),
    score = 0,
    lifeScore = 5,
    eggOriginalTop = eggs.offset().top,
    highestScore = parseInt($('#HighestScore').text());

if (localStorage.getItem('highestScore') == null) {
    updateHighestScore();
} else {
    highestScore = localStorage.getItem('highestScore');
    $('#HighestScore').text(highestScore);
}


$(window).mousemove(function (e) {
    if (e.pageX >= halfBasketWidth && e.pageX <= $(window).outerWidth(true) - halfBasketWidth) {
        basket.offset({
            left: e.pageX - halfBasketWidth
        });
    }
});

$('.popup').click(function () {
    $(this).slideUp(1000, function () {
        resetGame();
        startGame();
    });
});