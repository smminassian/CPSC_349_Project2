
// game set up
let count = 0;
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
    
    // Check moves in given direction
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
                            score += gameBoard[y][nextX];
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
                            score += gameBoard[nextY][x];
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
                            score += gameBoard[y][nextX];
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
                            score += gameBoard[nextY][x];
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

    // if move is possible
    if(moved) {
        // update the score and state of the game, then add a random number
        count++;
        updateScore();
        updateCells();
        addRandomNumber();
    }
    // logGame(); -- for debugging
    updateCellStyles();

    // check if player lost
    const hasLost = checkGameLost();
    if(hasLost) {
        // show new message
        const lostMessage = document.querySelector('.game-lost');
        lostMessage.classList.remove('hidden');
    }
}

function updateScore() {   
    // update player score
    const scoreElement = document.querySelector('.score');
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        const highScoreElement = document.querySelector('.high-score');
        highScoreElement.textContent = highScore;
    }
}

function updateCells(){
    // update the state of the game
    const cells = document.querySelectorAll('.cell');
    for(let y = 0; y < gameBoard.length; y++) {
        for(let x = 0; x < gameBoard[y].length; x++) {
            const cell = cells[y * 4 + x];
            cell.textContent = gameBoard[y][x] || '';
        }
    }
}

function updateCellStyles() {
    // update colors and styling
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const value = cell.textContent;
        switch (value) {
            case '2':
                cell.style.backgroundColor = 'rgb(238, 228, 218)';
                cell.style.color = "#766d65"
                break;
            case '4':
                cell.style.backgroundColor = 'rgb(237, 224, 200)';
                cell.style.color = "#766d65"
                break;
            case '8':
                cell.style.backgroundColor = 'rgb(242, 177, 121)';
                cell.style.color = "white"
                break;
            case '16':
                cell.style.backgroundColor = 'rgb(245, 149, 99)';
                cell.style.color = "white"
                break;
            case '32':
                cell.style.backgroundColor = 'rgb(246, 124, 95)';
                cell.style.color = "white"
                break;
            case '64':
                cell.style.backgroundColor = 'rgb(246, 94, 59)';
                cell.style.color = "white"
                break;
            case '128':
                cell.style.backgroundColor = 'rgb(237, 207, 114)';
                cell.style.color = "white"
                break;
            case '256':
                cell.style.backgroundColor = 'rgb(237, 204, 97)';
                cell.style.color = "white"
                break;
            case '512':
                cell.style.backgroundColor = 'rgb(237, 200, 80)';
                cell.style.color = "white"
                break;
            case '1024':
                cell.style.backgroundColor = 'rgb(237, 197, 63)';
                cell.style.color = "white"
                break;
            case '2048':
                cell.style.backgroundColor = 'rgb(237, 194, 46)';
                cell.style.color = "white"
                break;

            default:
                cell.style.backgroundColor = 'rgb(204, 192, 179)';
                break;
        }
    });
}

function startNewGame(event){
    // set a new game
    gameBoard = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ];
    score = 0;
    updateScore();
    updateCells();
    addRandomNumber();   
    updateCellStyles();

    // if try again button was pushed hide the message
    if(event.target.classList.value === "try-again-btn"){
        const lostMessage = document.querySelector('.game-lost');
        lostMessage.classList.add('hidden');
    }
}

function checkGameLost(){
    // check if board is full
    const hasNullValue = gameBoard.some(row => row.some(cell => cell === null));
    if(hasNullValue) return false;
    
    // if board is full check if any possible moves are left
    for(y = 0; y < gameBoard.length; y++){
        for(x = 0; x < gameBoard[y].length; x++){
            const currValue = gameBoard[y][x];
            // check if we have a possible move
            if(x + 1 < gameBoard.length && currValue === gameBoard[y][x + 1]) return false;
            if(y + 1 < gameBoard.length && currValue === gameBoard[y + 1][x]) return false;
        }
    }
    return true;
}

function logGame(){
    // for debugging we log the board
    const copiedBoard = JSON.parse(JSON.stringify(gameBoard));
    console.log(copiedBoard);
}


document.addEventListener('DOMContentLoaded', () => {
    // add initial random number
    addRandomNumber();
    updateCellStyles();

    // event listener for keys
    document.addEventListener('keydown', (e) => {
        let direction = null;
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
    let x = randomCell.attributes['data-x'].value;
    let y = randomCell.attributes['data-y'].value;

    if (randomCell) {
        //Investigate this tomorrow. Dont want to have to hardcode this shit
        //auto generates 4 on moves that are multiples of 10
        if (count < 2 || count == 10 || count == 20 || count == 30 || count == 40 || count == 50 || count == 60){
            randomCell.textContent = '4';
            gameBoard[y][x] = 4;
        }
        //for every other move it autogenerates 2
        else{
            randomCell.textContent = '2';
            gameBoard[y][x] = 2;
        }
    }
    console.log(gameBoard);

}

