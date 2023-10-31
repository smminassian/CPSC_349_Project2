
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
        updateCellStyles();
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

function updateCellStyles() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        const value = cell.textContent;

        switch (value) {
            case '2':
                cell.style.backgroundColor = 'rgb(238, 228, 218)';
                break;
            case '4':
                cell.style.backgroundColor = 'rgb(237, 224, 200)';
                break;
            case '8':
                cell.style.backgroundColor = 'rgb(242, 177, 121)';
                break;
            case '16':
                cell.style.backgroundColor = 'rgb(245, 149, 99)';
                break;
            case '32':
                cell.style.backgroundColor = 'rgb(246, 124, 95)';
                break;
            case '64':
                cell.style.backgroundColor = 'rgb(246, 94, 59)';
                break;
            case '128':
                cell.style.backgroundColor = 'rgb(237, 207, 114)';
                break;
            case '256':
                cell.style.backgroundColor = 'rgb(237, 204, 97)';
                break;
            case '512':
                cell.style.backgroundColor = 'rgb(237, 200, 80)';
                break;
            case '1024':
                cell.style.backgroundColor = 'rgb(237, 197, 63)';
                break;
            case '2048':
                cell.style.backgroundColor = 'rgb(237, 194, 46)';
                break;

            default:
                cell.style.backgroundColor = 'rgb(204, 192, 179)'; // Default color for empty cells
                break;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    addRandomNumber();
    updateCellStyles();

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
