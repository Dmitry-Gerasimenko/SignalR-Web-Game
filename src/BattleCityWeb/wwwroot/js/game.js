
class Game {

    constructor(gameWidth, gameHeight, userName) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.userName = userName;

        this.brickImage = new Image(64, 64);
        this.brickImage.src = '/img/brick.png';

        this.gameObjects = [];  
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}

