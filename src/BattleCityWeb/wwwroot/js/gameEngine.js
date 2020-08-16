const FPS = 45;
const BULLET_MAX = 2;
const BULLET_SPEED = 15; // pixeles per second
const BULLET_DIST = 0.6; // max dist of the bullet flying
const TANK_HEALTH = 3;
const TEXT_INFO_FONT_SIZE = 12;
const TEXT_INFO_FONT_WEIGHT_LIGHT = 20;
const TEXT_INFO_FONT_WEIGHT_NORMAL = 50;

let gameConnection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();
let inputHandler;
gameConnection.on("InitiateGame", function () {
    gameConnection.invoke("InitGameObjects", game.gameWidth, game.gameHeight)
        .catch(function (err) {
            return console.error(err.toString());
        });
});
gameConnection.on("InitGameObjects", function (initialGameObjects, initialCanvasWidth, initialCanvasHeight) {

    // Clear the objects before an init
    game.gameObjects.tanks = [];
    game.gameObjects.bricks = [];

    // Initialize some tanks
    for (let i = 0; i < initialGameObjects.tanks.length; i++) {
        let maxSoundVolume = initialGameObjects.tanks[i].tankId === game.userName + "Tank" ? 0.6 : 0.3;

        game.gameObjects.tanks.push(new Tank(
            game,
            initialGameObjects.tanks[i].tankId,
            initialGameObjects.tanks[i].position,
            initialGameObjects.tanks[i].direction,
            maxSoundVolume
        ));
    }

    let widthCoefficient = initialCanvasWidth / 10;
    let heightCoefficient = initialCanvasHeight / 10;

    // Create bricks from briks map and push it into the game
    initialGameObjects.brickMap.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {

            if (brick === 1) {
                let position = {
                    x: widthCoefficient * brickIndex ,
                    y: 20 + heightCoefficient * rowIndex
                };

                game.gameObjects.bricks.push(new Brick(position));
            }
        });
    });

    // Remove all previuosly used handlers
    // $(document).off(mousedown, keydown, ... );

    // Get an own tank obj
    let myTank = game.gameObjects.tanks.find(obj => obj.tankId === getCurrentUserNameWrapper() + 'Tank');

    // Create a new current input handler
    inputHandler = new InputHanlder(game.gameObjects, gameConnection, game.userName, myTank);
});

let canvas = document.getElementById('gameCanvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.offsetHeight;

let ctx = canvas.getContext('2d');
ctx.font = TEXT_INFO_FONT_SIZE + 'px verdana';

let GAME_WIDTH = canvas.clientWidth;
let GAME_HEIGHT = canvas.clientHeight;

let game = new Game(GAME_WIDTH, GAME_HEIGHT, getCurrentUserNameWrapper());

let lastTime = 0;
let frameCount = 1;
function gameLoop(timeStamp) {

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.draw(ctx);  
    
    ///////////////////////////////
    frameCount++;
    requestAnimationFrame(gameLoop);
}

function startGameEngine() {

    gameConnection
        .start()
        .then(function () {
            console.dir('GAME CONNECTION STARTED')
        })
        .catch(function (err) {
            return console.error(err.toString());
        });

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


