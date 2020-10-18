
class Game {

    constructor(gameWidth, gameHeight, userName) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.userName = userName;

        this.brickImage = new Image(64, 64);
        this.brickImage.src = '/img/brick.png';

        this.gameObjects = { tanks: [], bricks: [] };  
    }

    draw(ctx) {

        // draw the bricks
        this.gameObjects.bricks.forEach(obj => obj.draw(ctx));

        // draw the tanks
        this.gameObjects.tanks.forEach(obj => obj.draw(ctx));
    }
}

