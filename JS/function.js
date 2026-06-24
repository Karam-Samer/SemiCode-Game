function startGame() {
    moveEgg(eggs[0], Math.random() * 10 + 1);
    moveEgg(eggs[1], Math.random() * 10 + 1);
    moveEgg(eggs[2], Math.random() * 10 + 1);

    isInBasket(eggs[0]);
    isInBasket(eggs[1]);
    isInBasket(eggs[2]);

    let game = requestAnimationFrame(startGame);
    if (lifeScore <= 0) {
        cancelAnimationFrame(game);
        $('.popup h4').text('Game Over Try Again! ^-^');
        $('.popup').slideDown(1000);
        if (highestScore > localStorage.getItem('highestScore')) {
            updateHighestScore();
        }
    }
}

function moveEgg(egg, speed) {
    let eggTop = $(egg).offset().top,
        move = Math.random() * speed + 1,
        basketBottom = basket.offset().top + basket.outerHeight(true),
        eggIndex = eggs.index(egg);

    if (eggTop < basketBottom) {
        $(egg).offset({
            top: eggTop + move
        });
    } else {
        if (lifeScore > 0) {
            $(egg).offset({
                top: eggOriginalTop
            });
            brokenEgg.eq(eggIndex).fadeIn(10).delay(500).fadeOut(500);
            $('#LifeScore').text(--lifeScore);
        }
    }

}

function resetGame() {
    score = 0;
    lifeScore = 5;
    $('#LifeScore').text(lifeScore);
    $('#HighestScore').text(highestScore);
    $('.score').text(score);
    $(eggs).offset({
        top: eggOriginalTop
    });
}

function collision(egg, basket) {
    let eggTop = $(egg).offset().top,
        eggLeft = $(egg).offset().left,
        eggRight = eggLeft + $(egg).outerWidth(true),
        eggBottom = eggTop + $(egg).outerHeight(true),

        basketTop = $(basket).offset().top,
        basketLeft = $(basket).offset().left,
        basketRight = basketLeft + $(basket).outerWidth(true),
        basketBottom = basketTop + $(basket).outerHeight(true);

    if (eggBottom < basketTop || eggTop > basketBottom || eggRight < basketLeft || eggLeft > basketRight) {
        return false;
    }
    return true;
}

function isInBasket(egg) {
    if (collision(egg, basket)) {
        $('.score').text(++score);
        if (score > highestScore) {
            $('#HighestScore').text(++highestScore);
        }
        $(egg).offset({
            top: eggOriginalTop
        });
    }
}

function updateHighestScore() {
    localStorage.setItem('highestScore', highestScore);
    $('#HighestScore').text(highestScore);
}