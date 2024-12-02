// DOM Elements
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

// Variables
let gameBoard = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

// Winning Patterns
const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

// Initialize Game
function initializeGame() {
  board.innerHTML = '';
  gameBoard.fill(null);
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle Cell Click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!isGameActive || gameBoard[index]) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    isGameActive = false;
  } else if (!gameBoard.includes(null)) {
    statusText.textContent = `It's a Draw! 🤝`;
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check Winner
function checkWinner() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      highlightWinningCells([a, b, c]);
      return true;
    }
  }
  return false;
}

// Highlight Winning Cells
function highlightWinningCells(indices) {
  indices.forEach(index => {
    document.querySelector(`[data-index='${index}']`).style.background = '#c8e6c9';
  });
}

// Reset Game
resetButton.addEventListener('click', initializeGame);

// Start Game
initializeGame();
