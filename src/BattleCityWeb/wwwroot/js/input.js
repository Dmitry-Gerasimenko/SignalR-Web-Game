
class InputHanlder {

    constructor(tank) {
        document.addEventListener('keydown', (event) => {
            console.dir(event.keyCode)
            switch (event.keyCode) {
                // w
                case 87:
                    tank.moveUp();
                    break;
                // s
                case 83:
                    tank.moveDown();
                    break;
                // a
                case 65:
                    tank.moveLeft();
                    break;
                // d
                case 68:
                    tank.moveRight();
                    break;
            }
        });
    }
}