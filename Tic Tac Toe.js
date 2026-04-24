const board = document.getElementById("board");
const statusText = document.getElementById("win");
const status = document.getElementById("status");
const button = document.querySelector("button");

let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";

    cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.innerText = cell;
        div.addEventListener("click", () => handleClick(index));
        board.appendChild(div);
    });
}

function handleClick(index) {
    if (cells[index] !== "" || !gameActive) return;

    cells[index] = currentPlayer;
    createBoard();
    checkWinner();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {

            gameActive = false;

            statusText.innerText = `🎉 Player ${currentPlayer} Wins!👌`;


            // 🔥 Apply effects
            statusText.classList.add("big-text");
            button.classList.add("big-button");
            highlightWin(pattern);


            return;
        }
    }

    if (!cells.includes("")) {
        statusText.innerText = "😐 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function highlightWin(pattern) {
    const cellsDiv = document.querySelectorAll(".cell");

    pattern.forEach(i => {
        cellsDiv[i].classList.add("win");
    });
}

function restartGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    statusText.innerText = "Player X's turn";
    statusText.classList.remove("big-text");
    button.classList.remove("big-button");

    createBoard();
}

createBoard();