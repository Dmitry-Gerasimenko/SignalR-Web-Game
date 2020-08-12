function detectShootingCollision(bullet, gameObject) {

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y + gameObject.size;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.size;


    if (
        bullet.y >= topOfObject && bullet.x >= leftSideOfObject &&
        bullet.y - bullet.r <= bottomOfObject && bullet.x <= rightSideOfObject
    ) {

        return true;
    }
    else {
        return false;
    }
}

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}