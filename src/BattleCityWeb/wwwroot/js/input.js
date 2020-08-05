
class InputHanlder {

    constructor(gameObjects, gameConnection, userName) {

        document.addEventListener('keydown', (event) => {

            gameConnection.invoke("HandleClientKeyDown", userName, event.keyCode)
                .catch(function (err) {
                    return console.error(err.toString());
                });

        });
        document.addEventListener('keyup', (event) => {
            gameConnection.invoke("HandleClientKeyUp", userName, event.keyCode)
                .catch(function (err) {
                    return console.error(err.toString());
                });
        });

        gameConnection.on("ReceiveHandledKeyDown", function (tankId, pressedKeyId) {
            let tankToMove = gameObjects.find(obj => obj.tankId === tankId);

            switch (pressedKeyId) {
                // w
                case 87:
                    tankToMove.run();
                    tankToMove.moveUp();
                    break;
                // s
                case 83:
                    tankToMove.run();
                    tankToMove.moveDown();
                    break;
                // a
                case 65:
                    tankToMove.run();
                    tankToMove.moveLeft();
                    break;
                // d
                case 68:
                    tankToMove.run();
                    tankToMove.moveRight();
                    break;
            }
        });
        gameConnection.on("ReceiveHandledKeyUp", function (tankId, pressedKeyId) {
            let tankToStop = gameObjects.find(obj => obj.tankId === tankId);

            switch (pressedKeyId) {
                // w
                case 87:
                    tankToStop.stop();
                    break;
                // s
                case 83:
                    tankToStop.stop();
                    break;
                // a
                case 65:
                    tankToStop.stop();
                    break;
                // d
                case 68:
                    tankToStop.stop();
                    break;
            }
        });
    }
}