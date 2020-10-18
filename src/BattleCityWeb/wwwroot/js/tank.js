
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

        this.runSound = new Audio('/sounds/game/run.wav');
        this.runSound.volume = maxSoundVolume;
        this.stopSound = new Audio('/sounds/game/stop_impr.wav');
        this.stopSound.volume = maxSoundVolume / 3;

        this.shootSound = new Audio('/sounds/game/shoot.mp3');
        this.explodeSound = new Audio('/sounds/game/tankExplode.mp3');

        this.shootSprite = new ExplosionSprite();
        this.bullets = [];
        this.canShoot = true;

        this.health = TANK_HEALTH;

        this.r = this.tankImage.width / 2;
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
            let isBulletHitObject = false;

            // check the collisions with the tanks
            game.gameObjects.tanks.forEach((tank, index, arr) => {
                if (tank != this) {
                    if (distBetweenPoints(
                        tank.position.x,
                        tank.position.y,
                        this.bullets[i].x,
                        this.bullets[i].y)
                        < this.bullets[i].visibleR + tank.r) {

                        // logic of getting shoot of the tank 
                        tank.getShoot(index, arr);
                        isBulletHitObject = true;
                        return;
                    }
                }
            });

            // check the collisions with the bricks
            game.gameObjects.bricks.forEach((brick, index, arr) => {

                if (distBetweenPoints(
                    brick.position.x,
                    brick.position.y,
                    this.bullets[i].x,
                    this.bullets[i].y)
                    < this.bullets[i].visibleR + brick.r) {

                    brick.getShoot();
                    arr.splice(index, 1);
                    isBulletHitObject = true;
                }
            });

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

            // Remove bullet if it hits
            if (isBulletHitObject) {
                this.bullets.splice(i, 1);
            }
        }

        // draw tank info
        this.drawInfo(ctx);
    }

    updateAngle(nx, ny) {
        this.turretToAngle = Math.atan2(ny - this.position.y, nx - this.position.x);
    }

    makeShoot(vx, vy, newTurretAngle) {

        this.turretToAngle = newTurretAngle;

        if (this.canShoot && this.bullets.length <= BULLET_MAX) {

            this.bullets.push(new ExplosionSprite(
                this.position.x,
                this.position.y,
                vx, vy));

            this.shootSound.pause();
            this.shootSound.currentTime = 0;
            this.shootSound.play();
        }

        // prevent further shooting
        this.canShoot = true;
    }

    getShoot(index, tankArr) {
        
        if (--this.health == 0) {
            //gameOver();
            tankArr.splice(index, 1);
        }

        this.explodeSound.play();   
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

    drawInfo(ctx) {
        ctx.font = TEXT_INFO_FONT_SIZE + 'px verdana';
        if (this.health == 0) {
            ctx.strokeStyle = 'gray';
            ctx.strokeText("Here was  " + this.tankId + " ...", this.position.x, this.position.y);
            return;
        }

        ctx.strokeText(this.tankId + ': (' + this.health + ')', this.position.x - this.r, this.position.y - this.r);
    }
}