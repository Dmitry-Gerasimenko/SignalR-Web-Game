
class Tank {

    constructor(game, tankId, position, tankDirection, maxSoundVolume) {
        this.tankId = tankId;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.tankImage = new Image(80, 42);
        this.tankImage.src = '/img/tankOptimize.png';

        this.turretImage = new Image(125, 91);
        this.turretImage.src = '/img/turretOptimize.png';
        this.turretAngle = 0;
        this.turretToAngle = this.turretAngle;

        this.position = position;

        this.maxSpeed = 5;
        this.tankDirection = tankDirection;

        this.runSound = document.createElement('audio');
        this.runSound.src = '/sounds/game/run.wav';
        this.runSound.volume = maxSoundVolume;
        this.stopSound = document.createElement('audio');
        this.stopSound.src = '/sounds/game/stop_impr.wav';
        this.stopSound.volume = maxSoundVolume / 3;

        this.shootSprite = new ExplosionSprite();
        this.bullets = [];
        this.canShoot = true;
    }

    draw(ctx) {
        // draw the tank and its turret
        switch (this.tankDirection) {
            case 0:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, 0);
                this.drawImage(ctx, this.turretImage, this.position.x - 20, this.position.y, this.turretToAngle);
                break;
            case 1:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI * 0.5);
                this.drawImage(ctx, this.turretImage, this.position.x - 2, this.position.y - 20, this.turretToAngle);
                break;
            case 2:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI);
                this.drawImage(ctx, this.turretImage, this.position.x + 20, this.position.y, this.turretToAngle);
                break;
            case 3:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI * 1.5);
                this.drawImage(ctx, this.turretImage, this.position.x, this.position.y + 15, this.turretToAngle);
                break;
        }

        // draw the bullets
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw(ctx);
        }

        // move the bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {

            // check the distance travelled 
            if (this.bullets[i].dist > BULLET_DIST * canvas.width) {

                this.bullets.splice(i, 1);
                continue;
            }

            // move the bullets
            this.bullets[i].x += this.bullets[i].xv;
            this.bullets[i].y += this.bullets[i].yv;

            
            // and calculate the distance travelled
            this.bullets[i].dist += Math.sqrt(Math.pow(this.bullets[i].xv, 2) + Math.pow(this.bullets[i].yv, 2));
        }
    }

    updateAngle(nx, ny) {
        this.turretToAngle = Math.atan2(ny - this.position.y, nx - this.position.x);
    }

    makeShoot(vx, vy) {
        if (this.canShoot && this.bullets.length < BULLET_MAX) {

            this.bullets.push(new ExplosionSprite(
                this.position.x - this.tankImage.width,
                this.position.y - this.tankImage.height,
                vx, vy));
        }

        // prevent further shooting
        this.canShoot = true;
    }

    run() {
        this.stopSound.pause();
        this.runSound.play();
    }
    stop() {
        this.runSound.pause();
        this.stopSound.currentTime = 0;
        this.stopSound.play();
    }

    moveLeft() {
        this.tankDirection = 0;
        this.position.x -= this.maxSpeed;
    }
    moveRight() {
        this.tankDirection = 2;
        this.position.x += this.maxSpeed
    }
    moveUp() {
        this.tankDirection = 1;
        this.position.y -= this.maxSpeed;
    }
    moveDown() {
        this.tankDirection = 3;
        this.position.y += this.maxSpeed;
    }

    drawImage(ctx, img, x, y, ang) {

        var vx = Math.cos(ang);
        var vy = Math.sin(ang);

        var imH = -(img.height / 2);
        var imW = -(img.width / 2);
        x += imW * vx + imH * -vy;
        y += imW * vy + imH * vx;

        ctx.setTransform(vx, vy, -vy, vx, x, y);
        ctx.drawImage(img, 0, 0);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}