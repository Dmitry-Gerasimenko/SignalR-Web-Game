let gameConnection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();

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

    game.update(deltaTime);
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

gameConnection.on("InitiateGame", function () {

    gameConnection.invoke("InitGameObjects", game.gameWidth, game.gameHeight)
        .catch(function (err) {
            return console.error(err.toString());
        });
});
gameConnection.on("InitGameObjects", function (initialGameObjects) {

    game.gameObjects = [];
    for (let i = 0; i < initialGameObjects.length; i++) {
        let maxSoundVolume = initialGameObjects[i].tankId === game.userName + "Tank" ? 0.6 : 0.3;

        game.gameObjects.push(new Tank(
            game,
            initialGameObjects[i].tankId,
            initialGameObjects[i].position,
            initialGameObjects[i].direction,
            maxSoundVolume
        ))
    }

    new InputHanlder(game.gameObjects, gameConnection, game.userName);
});

