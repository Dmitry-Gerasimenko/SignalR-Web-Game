const FPS = 45;
const BULLET_MAX = 3;
const BULLET_SPEED = 15; // pixeles per second
const BULLET_DIST = 0.6; // max dist of the bullet flying

let gameConnection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();
gameConnection.on("InitiateGame", function () {

    gameConnection.invoke("InitGameObjects", game.gameWidth, game.gameHeight)
        .catch(function (err) {
            return console.error(err.toString());
        });
});
gameConnection.on("InitGameObjects", function (initialGameObjects) {

    console.dir(initialGameObjects)
    // Clear the objects before an init
    game.gameObjects = [];

    // Initialize some tanks
    for (let i = 0; i < initialGameObjects.tanks.length; i++) {
        let maxSoundVolume = initialGameObjects.tanks[i].tankId === game.userName + "Tank" ? 0.6 : 0.3;

        game.gameObjects.push(new Tank(
            game,
            initialGameObjects.tanks[i].tankId,
            initialGameObjects.tanks[i].position,
            initialGameObjects.tanks[i].direction,
            maxSoundVolume
        ));
    }
    // Create bricks from briks map
    initialGameObjects.brickMap.forEach((row, rowIndex) => {
        alert(row)
        console.dir(row);
        row.forEach((brick, brickIndex) => {

            if (brick === 1) {
                alert('4')
                let position = {
                    x: 64 * brickIndex,
                    y: 20 + 64 * rowIndex
                };
                alert('ok new brick')
                game.gameObjects.push(new Brick(position));
            }
        });
    });

    console.dir('game objects:')
    console.dir(game.gameObjects)
    let myTank = game.gameObjects.find(obj => obj.tankId === getCurrentUserNameWrapper() + 'Tank');
    new InputHanlder(game.gameObjects, gameConnection, game.userName, myTank);
});

let canvas = document.getElementById('gameCanvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.offsetHeight;

let ctx = canvas.getContext('2d');
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


