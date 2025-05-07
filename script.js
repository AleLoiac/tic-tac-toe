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

const Players = (function () {
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

    const getFirstPlayerToken = () => firstPlayer.token;
    const getSecondPlayerToken = () => secondPlayer.token;
    const getFirstPlayerName = () => firstPlayer.name;
    const getSecondPlayerName = () => secondPlayer.name;

    return {createPlayers, getFirstPlayerName, getSecondPlayerName, getFirstPlayerToken, getSecondPlayerToken};
})()