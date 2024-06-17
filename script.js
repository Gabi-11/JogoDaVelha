const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || !isGameActive) return;

    boardState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `${currentPlayer} venceu!`;
        isGameActive = false;
    } else if (boardState.every(cell => cell !== null)) {
        gameStatus.textContent = 'Empate!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `É a vez de ${currentPlayer}`;
    }
};

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
};

const restartGame = () => {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    isGameActive = true;
    gameStatus.textContent = `É a vez de ${currentPlayer}`;

    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.textContent = '';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

restartGame();  // Initialize game state
