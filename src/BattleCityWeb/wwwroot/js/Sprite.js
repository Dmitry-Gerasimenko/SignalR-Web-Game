
class ExplosionSprite {
    constructor() {
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

        this.position = {
            x: 10,
            y: 20
        }
    }

    draw(ctx) {

        ctx.drawImage(this.explosionImg,
            this.explosionAnimation[this.frameCount % this.spritesCount].position.x,
            this.explosionAnimation[this.frameCount % this.spritesCount].position.y,
            128, 128,
            this.position.x, this.position.y,
            128, 128);

        this.frameCount++;
    }
}

