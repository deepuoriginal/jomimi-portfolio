let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard[cellIndex] === '' && !gameOver) {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        if (checkWinner(currentPlayer)) {
            document.getElementById('result').textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (!gameBoard.includes('')) {
            document.getElementById('result').textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('result').textContent = `${currentPlayer}'s Turn`;
            if (currentPlayer === 'O') {
                setTimeout(makeAIMove, 500);
            }
        }
    }
}

function makeAIMove() {
    if (!gameOver) {
        const emptyCells = gameBoard.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];
        const aiCell = document.querySelectorAll('.cell')[aiMove];
        makeMove(aiCell);
    }
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombos.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('result').textContent = "Player's Turn";
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
