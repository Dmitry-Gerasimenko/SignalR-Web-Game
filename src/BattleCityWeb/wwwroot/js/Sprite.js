
class ExplosionSprite {
    constructor(x, y, xv, yv) {
        this.frameCount = 0;
        this.spritesCount = 15;

        this.explosionAnimation =  [
            {
                "position": {
                    "x": 0,
                    "y": 0,
                    "w": 192,
                    "h": 144
                }
            },
            {
                "position": {
                    "x": 128,
                    "y": 0,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 256,
                    "y": 0,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 384,
                    "y": 0,
                    "w": 128,
                    "h": 128
                }
            },

            {
                "position": {
                    "x": 0,
                    "y": 128,
                    "w": 192,
                    "h": 144
                }
            },
            {
                "position": {
                    "x": 128,
                    "y": 128,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 256,
                    "y": 128,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 384,
                    "y": 128,
                    "w": 128,
                    "h": 128
                }
            },

            {
                "position": {
                    "x": 0,
                    "y": 256,
                    "w": 192,
                    "h": 144
                }
            },
            {
                "position": {
                    "x": 128,
                    "y": 256,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 256,
                    "y": 256,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 384,
                    "y": 256,
                    "w": 128,
                    "h": 128
                }
            },

            {
                "position": {
                    "x": 0,
                    "y": 384,
                    "w": 192,
                    "h": 144
                }
            },
            {
                "position": {
                    "x": 128,
                    "y": 384,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 256,
                    "y": 384,
                    "w": 128,
                    "h": 128
                }
            },
            {
                "position": {
                    "x": 384,
                    "y": 384,
                    "w": 128,
                    "h": 128
                }
            }];

        this.explosionImg = new Image();
        this.explosionImg.src = '/img/explosion_impr.png';

        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;

        this.dist = 0;

        this.size = 128;
        this.r = this.size / 2;
        this.visibleR = this.size / 4;
    }

    draw(ctx) {

        ctx.drawImage(this.explosionImg,
            this.explosionAnimation[this.frameCount % this.spritesCount].position.x,
            this.explosionAnimation[this.frameCount % this.spritesCount].position.y,
            this.size, this.size,
            this.x - this.r, this.y - this.r,
            this.size, this.size);

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.visibleR, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();

        this.frameCount++;
    }
}

