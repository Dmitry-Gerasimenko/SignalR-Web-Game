
class Brick {

    constructor(position) {
        this.image = game.brickImage;
        this.size = 64;
        this.r = this.size / 2;

        this.position = position;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x - this.r, this.position.y - this.r,
            this.size, this.size);

        
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    }
}