
class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }


    start() {
        this.tank = new Tank(this);

        new InputHanlder(this.tank);
    }

    update(deltaTime) {

        //this.tank.update(deltaTime);
    }

    draw(ctx) {

        this.tank.draw(ctx);
    }
}

