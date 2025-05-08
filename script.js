const gameBoard = (function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push("");
        }
    }

    const getBoardCopy = () => board.slice();

    const updateCell = (coordinateX, coordinateY, token) => {
        if (!board[coordinateX][coordinateY] === "") {
            console.log("The cell is already selected")
            return
        }
        board[coordinateX][coordinateY] = token;
    }

    return {getBoardCopy, updateCell};
})();

const players = (function () {
    let firstPlayer;
    let secondPlayer;

    function createPlayers (firstPlayerName, secondPlayerName) {

        firstPlayer = {
            name: firstPlayerName,
            token : "x",
        };
        secondPlayer = {
            name: secondPlayerName,
            token: "o",
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

    function playRound (coordinateX, coordinateY) {
        if (winner || tie) {
            console.log("The game is already finished");
            return
        }

        const firstPlayer = players.getFirstPlayer();
        const secondPlayer = players.getSecondPlayer();

        if (round === 0) {
            activePlayer = firstPlayer;
        }

        gameBoard.updateCell(coordinateX, coordinateY, activePlayer.token)
        activePlayer = (activePlayer === firstPlayer) ? secondPlayer : firstPlayer;
        round ++;

        if (round > 3) {
            if (checkWinners()) {
                winner = true;
            }
        }
        if (round >= 9 && !winner) {
            tie = true;
            console.log("It's a tie!")
        }
    }

    function checkWinners () {
        const board = gameBoard.getBoardCopy();
        // check horizontal
        for (let i = 0; i < 3; i++) {
            if (board[i].every(token => token === board[i][0]) && board[i].every(token => token !== "" )) {
                if (board[i][0] === "x") {
                    console.log("Player 1 wins")
                } else {
                    console.log("Player 2 wins")
                }
                console.log("Winning row: ")
                console.log(board[i]);
                return true
            }
        }
        // check vertical
        for (let i = 0; i < 3; i++) {
            const column = board.map(row => row[i]);

            if (column.every(token => token === column[0]) && column.every(token => token !== "" )) {
                if (column[0] === "x") {
                    console.log("Player 1 wins")
                } else {
                    console.log("Player 2 wins")
                }
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
                if (diagonal[0] === "x") {
                    console.log("Player 1 wins")
                } else {
                    console.log("Player 2 wins")
                }
                console.log("Winning diagonal: ")
                console.log(diagonal);
                return true
            }
        }
    }

    return {playRound};
})();