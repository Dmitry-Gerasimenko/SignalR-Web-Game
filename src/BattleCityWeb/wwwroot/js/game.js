
class Game {

    constructor(gameWidth, gameHeight, userName) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.userName = userName;

        this.gameObjects = [];      
    }


    update(deltaTime) {

        this.gameObjects.forEach(obj => obj.update(deltaTime));
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}

