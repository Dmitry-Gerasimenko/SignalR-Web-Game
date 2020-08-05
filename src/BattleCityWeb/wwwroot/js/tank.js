
class Tank {

    constructor(game, tankId, position, tankDirection, maxSoundVolume) {
        this.tankId = tankId;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.tankImage = new Image(80, 42);
        this.tankImage.src = '/img/tankOptimize.png';

        this.turretImage = new Image(80, 26);
        this.turretImage.src = '/img/turretOptimize.png';

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
    }

    draw(ctx) {

        switch (this.tankDirection) {
            case 0:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, 0);
                this.drawImage(ctx, this.turretImage, this.position.x - 20, this.position.y, 0);
                break;
            case 1:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI * 0.5);
                this.drawImage(ctx, this.turretImage, this.position.x, this.position.y - 17, Math.PI * 0.5);
                break;
            case 2:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI);
                this.drawImage(ctx, this.turretImage, this.position.x + 20, this.position.y, Math.PI);
                break;
            case 3:
                this.drawImage(ctx, this.tankImage, this.position.x, this.position.y, Math.PI * 1.5);
                this.drawImage(ctx, this.turretImage, this.position.x, this.position.y + 17, Math.PI * 1.5);
                break;
        }

        this.shootSprite.draw(ctx);
    }

    update() {

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