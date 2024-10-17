const board = document.getElementById("board");
const statusText = document.createElement('div');
statusText.classList.add('status');
document.body.insertBefore(statusText, board);

const resultMessage = document.createElement('div');
resultMessage.classList.add('result-message');
document.body.insertBefore(resultMessage, document.getElementById("restart"));

const restartBtn = document.getElementById("restart");
const cells = Array.from(document.querySelectorAll(".cell"));
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const cellIndex = e.target.getAttribute("data-index");
  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("active");

  if (checkWinner()) {
    highlightWinningCells();
    displayResult(`Player ${currentPlayer} Wins!`, "win");
    return;
  }

  if (!gameState.includes("")) {
    displayResult("It's a Draw!", "draw");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWinner = () => {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
};

const highlightWinningCells = () => {
  winningConditions.forEach(condition => {
    if (condition.every(index => gameState[index] === currentPlayer)) {
      condition.forEach(index => {
        cells[index].classList.add("win");
      });
    }
  });
};

const displayResult = (message, type) => {
  if (type === "draw") {
    cells.forEach(cell => {
      if (!cell.classList.contains("win")) {
        cell.classList.add("draw");
      }
    });
  } else if (type === "win") {
    highlightWinningCells();
  }
  
  board.classList.add("hidden");  // Hide the game board
  resultMessage.textContent = message;
  resultMessage.classList.add(type);  // Add "win" or "draw" class for styling
  resultMessage.style.display = "block";  // Show the result message
  gameActive = false;
};

const restartGame = () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("active", "win", "draw");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  board.classList.remove("hidden");  // Show the game board again
  resultMessage.style.display = "none";  // Hide the result message
  resultMessage.classList.remove("win", "draw");  // Remove previous result styling
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
