const gameBoard = (function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push("");
        }
    }

    const getBoardCopy = () => board.map(row => [...row]);

    const updateCell = (coordinateX, coordinateY, token) => {
        if (board[coordinateX][coordinateY] !== "") {
            console.log("The cell is already selected")
            return false;
        }
        board[coordinateX][coordinateY] = token;
        return true;
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push("");
            }
        }
    }

    return {getBoardCopy, updateCell, resetBoard};
})();

const players = (function () {
    let firstPlayer;
    let secondPlayer;

    function createPlayers (firstPlayerName, secondPlayerName) {

        firstPlayer = {
            name: firstPlayerName,
            token : "✕",
        };
        secondPlayer = {
            name: secondPlayerName,
            token: "O",
        };
    }

    const getFirstPlayer = () => firstPlayer;
    const getSecondPlayer = () => secondPlayer;

    return {createPlayers, getFirstPlayer, getSecondPlayer};
})();

const gameController = (function () {
    let round = 0;
    let activePlayer;
    let winner;
    let tie;

    function resetRound () {
        round = 0;
        activePlayer = undefined;
        winner = undefined;
        tie = undefined;
        gameBoard.resetBoard();
        screenController.updateScreen();
        const resultDiv = document.querySelector(".result > p");
        resultDiv.textContent = "";
    }

    function playRound (coordinateX, coordinateY) {
        if (winner || tie) {
            console.log("No more moves, the game is over");
            return
        }

        const firstPlayer = players.getFirstPlayer();
        const secondPlayer = players.getSecondPlayer();

        if (round === 0) {
            activePlayer = firstPlayer;
        }

        const validMove = gameBoard.updateCell(coordinateX, coordinateY, activePlayer.token)

        if (!validMove) {
            return;
        }

        round ++;
        screenController.updateScreen();

        if (round > 4) {
            if (checkWinners()) {
                winner = true;
            }
        }
        if (round >= 9 && !winner) {
            tie = true;
            const resultDiv = document.querySelector(".result > p");
            resultDiv.textContent = `It's a tie!`;
        }

        activePlayer = (activePlayer === firstPlayer) ? secondPlayer : firstPlayer;
    }

    function checkWinners () {
        const board = gameBoard.getBoardCopy();
        // check horizontal
        for (let i = 0; i < 3; i++) {
            if (board[i].every(token => token === board[i][0]) && board[i].every(token => token !== "" )) {
                const resultDiv = document.querySelector(".result > p");
                resultDiv.textContent = `${activePlayer.name} wins the game!`;
                console.log("Winning row: ")
                console.log(board[i]);
                return true
            }
        }
        // check vertical
        for (let i = 0; i < 3; i++) {
            const column = board.map(row => row[i]);

            if (column.every(token => token === column[0]) && column.every(token => token !== "" )) {
                const resultDiv = document.querySelector(".result > p");
                resultDiv.textContent = `${activePlayer.name} wins the game!`;
                console.log("Winning column: ")
                console.log(column);
                return true
            }
        }
        // check diagonal
        const diagonalOne = [board[0][0],board[1][1],board[2][2]];
        const diagonalTwo = [board[0][2],board[1][1],board[2][0]];
        const diagonals = [diagonalOne, diagonalTwo];

        for (const diagonal of diagonals) {
            if (diagonal.every(token => token === diagonal[0]) && diagonal.every(token => token !== "" )) {
                const resultDiv = document.querySelector(".result > p");
                resultDiv.textContent = `${activePlayer.name} wins the game!`;
                console.log("Winning diagonal: ")
                console.log(diagonal);
                return true
            }
        }
    }

    return {playRound, resetRound};
})();

const screenController = (function () {
    const container = document.querySelector(".container");
    const resetBtn = document.querySelector(".reset-btn");
    const addPlayersBtn = document.querySelector(".create-players-btn");
    const firstPlayer = document.querySelector("#first-player-name");
    const secondPlayer = document.querySelector("#second-player-name");

    addPlayersBtn.addEventListener("click", () => {
        const firstName = firstPlayer.value;
        const secondName = secondPlayer.value;
        players.createPlayers(firstName, secondName);
        console.log(players.getFirstPlayer(), players.getSecondPlayer());
    })

    function updateScreen() {
        container.innerHTML = "";
        const board = gameBoard.getBoardCopy();
    
        board.forEach((row, i) => {
            row.forEach((entry, j) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("data-x", i);
                cell.setAttribute("data-y", j);
                cell.textContent = entry;
                container.appendChild(cell);
            })
        })
    }

    container.addEventListener("click", (e) => {
        if (e.target.classList.value === "cell") {
            const coordinateX = e.target.dataset.x;
            const coordinateY = e.target.dataset.y;
            gameController.playRound(coordinateX, coordinateY);
        }
    })

    resetBtn.addEventListener("click", gameController.resetRound);

    return {updateScreen};
})();

screenController.updateScreen();
players.createPlayers("Player 1","Player 2");