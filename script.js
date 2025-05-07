const gameBoard = (function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;

    const updateCell = (coordinateX, coordinateY, token) => {
        if (board[coordinateX][coordinateY] === "") {
            board[coordinateX][coordinateY] = token;
        }
    }

    return {getBoard, updateCell};
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

    function playRound (coordinateX, coordinateY) {
        const firstPlayer = players.getFirstPlayer();
        const secondPlayer = players.getSecondPlayer();
        const board = gameBoard.getBoard();

        if (round === 0) {
            activePlayer = firstPlayer;
        }

        if (!board[coordinateX][coordinateY] === "") {
            console.log("The cell is already selected");
            return
        }
        board[coordinateX][coordinateY] = activePlayer.token;
        activePlayer = (activePlayer === firstPlayer) ? secondPlayer : firstPlayer;
        round ++;
    }

    return {playRound};
})();