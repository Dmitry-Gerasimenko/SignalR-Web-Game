
class Tank {

    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.tankImage = new Image(80,42);
        this.tankImage.src = '/img/tankOptimize.png';

        this.turretImage = new Image(80, 28);
        this.turretImage.src = '/img/turretOptimize.png';

        this.position = { x: 0, y: 0 };
    }

    draw(ctx) {
        ctx.drawImage(
            this.tankImage,
            this.position.x, this.position.y,
            this.tankImage.width,  this.tankImage.height);

        ctx.drawImage(
            this.turretImage,
            this.position.x - 21, this.position.y + 7,
            this.turretImage.width, this.turretImage.height);
    }

    moveLeft() {

    }

    moveRight() {

    }

    moveUp() {

    }

    moveDown() {

    }
}