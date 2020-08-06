
class Game {

    constructor(gameWidth, gameHeight, userName) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.userName = userName;

        this.gameObjects = [];  
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}

