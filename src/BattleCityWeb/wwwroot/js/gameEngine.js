
let canvas = document.getElementById('gameCanvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.offsetHeight;


let ctx = canvas.getContext('2d');
let GAME_WIDTH = canvas.clientWidth;
let GAME_HEIGHT = canvas.clientHeight;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();


let lastTime = 0;

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);


    ///////////////////////////////
    requestAnimationFrame(gameLoop);
}

function startGameEngine() {

    requestAnimationFrame(gameLoop);
}

$(window).on('resize', function () {
    handleResize();
});

function handleResize() {
    canvas.width = GAME_WIDTH = canvas.clientWidth;
    canvas.height = GAME_HEIGHT = canvas.clientHeight;

    ctx = canvas.getContext('2d');

    game.gameWidth = GAME_WIDTH;
    game.gameHeight = GAME_HEIGHT;
};


