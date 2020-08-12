
class Brick {

    constructor(position) {
        this.image = game.brickImage;
        this.size = 64;

        this.position = position;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x, this.position.y,
            this.size, this.size);
    }
}