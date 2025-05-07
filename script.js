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