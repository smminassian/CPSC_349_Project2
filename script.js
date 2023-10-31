
let score = 0;
let highScore = 0;
let gameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

function move(direction) {
    let moved = false;

    switch(direction) {
        case "left":
            for(let y = 0; y < gameBoard.length; y++) {
                for(let x = 0; x < gameBoard[y].length; x++) {
                    if(gameBoard[y][x] !== null) {
                        let nextX = x - 1;
                        while(nextX >= 0 && gameBoard[y][nextX] === null) {
                            nextX--;
                        }
                        if(nextX >= 0 && gameBoard[y][nextX] === gameBoard[y][x]) {
                            gameBoard[y][nextX] *= 2;
                            gameBoard[y][x] = null;
                            moved = true;
                        } else if(nextX + 1 !== x) {
                            gameBoard[y][nextX + 1] = gameBoard[y][x];
                            gameBoard[y][x] = null;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "up":
            for(let x = 0; x < gameBoard[0].length; x++) {
                for(let y = 0; y < gameBoard.length; y++) {
                    if(gameBoard[y][x] !== null) {
                        let nextY = y - 1;
                        while(nextY >= 0 && gameBoard[nextY][x] === null) {
                            nextY--;
                        }
                        if(nextY >= 0 && gameBoard[nextY][x] === gameBoard[y][x]) {
                            gameBoard[nextY][x] *= 2;
                            gameBoard[y][x] = null;
                            moved = true;
                        } else if(nextY + 1 !== y) {
                            gameBoard[nextY + 1][x] = gameBoard[y][x];
                            gameBoard[y][x] = null;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "right":
            for(let y = 0; y < gameBoard.length; y++) {
                for(let x = gameBoard[y].length - 1; x >= 0; x--) {
                    if(gameBoard[y][x] !== null) {
                        let nextX = x + 1;
                        while(nextX < gameBoard[y].length && gameBoard[y][nextX] === null) {
                            nextX++;
                        }
                        if(nextX < gameBoard[y].length && gameBoard[y][nextX] === gameBoard[y][x]) {
                            gameBoard[y][nextX] *= 2;
                            gameBoard[y][x] = null;
                            moved = true;
                        } else if(nextX - 1 !== x) {
                            gameBoard[y][nextX - 1] = gameBoard[y][x];
                            gameBoard[y][x] = null;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case "down":
            for(let x = 0; x < gameBoard[0].length; x++) {
                for(let y = gameBoard.length - 1; y >= 0; y--) {
                    if(gameBoard[y][x] !== null) {
                        let nextY = y + 1;
                        while(nextY < gameBoard.length && gameBoard[nextY][x] === null) {
                            nextY++;
                        }
                        if(nextY < gameBoard.length && gameBoard[nextY][x] === gameBoard[y][x]) {
                            gameBoard[nextY][x] *= 2;
                            gameBoard[y][x] = null;
                            moved = true;
                        } else if(nextY - 1 !== y) {
                            gameBoard[nextY - 1][x] = gameBoard[y][x];
                            gameBoard[y][x] = null;
                            moved = true;
                        }
                    }
                }
            }
            break;
    }
    if(moved) {
        addRandomNumber();
        updateCells();
    }
}

function updateCells(){
    const cells = document.querySelectorAll('.cell');
    for(let y = 0; y < gameBoard.length; y++) {
        for(let x = 0; x < gameBoard[y].length; x++) {
            const cell = cells[y * 4 + x];
            cell.textContent = gameBoard[y][x] || '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addRandomNumber();

    document.addEventListener('keydown', (e) => {
        let direction = null;
        console.log(e.key);
        switch(e.key) {
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowRight":
                direction = "right";
                break;
            case "ArrowDown":
                direction = "down";
                break;
        }
        move(direction);
    });
});


function addRandomNumber() {
    const emptyCells = [...document.querySelectorAll('.cell')].filter(cell => !cell.textContent.trim());
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if(randomCell){
        let x = randomCell.attributes['data-x'].value;
        let y = randomCell.attributes['data-y'].value;
        gameBoard[y][x] = 2;
        randomCell.textContent = '2';
    } 
    console.log(gameBoard);

}
