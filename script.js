document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = [];
    const discColors = {
        empty: "",
        black: "black",
        white: "white"
    }
    const directions = [
        { row: -1, col: -1 }, // 左上
        { row: -1, col: 0 },  // 上
        { row: -1, col: 1 },  // 右上
        { row: 0, col: -1 },  // 左
        { row: 0, col: 1 },   // 右
        { row: 1, col: -1 },  // 左下
        { row: 1, col: 0 },   // 下
        { row: 1, col: 1 }    // 右下
    ];

    let currentPlayer = "black";
    let gameOver = false;

    // 盤面の初期化
    for (let i = 0; i < 8; i++) {
        cells[i] = [];
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.addEventListener("click", function() {
                if (!gameOver) {
                    placeDisc(i, j);
                }
            });
            cells[i][j] = cell;
            board.appendChild(cell);
        }
    }

    // 初期配置
    cells[3][3].className = "cell white";
    cells[3][4].className = "cell black";
    cells[4][3].className = "cell black";
    cells[4][4].className = "cell white";

    // ディスクを配置する関数
    function placeDisc(row, col) {
        if (isValidMove(row, col)) {
            flipDiscs(row, col);
            cells[row][col].className = "cell " + currentPlayer;
            switchPlayer();
            if (!hasValidMove()) {
                switchPlayer();
                if (!hasValidMove()) {
                    endGame();
                }
            }
        }
    }

    // 有効な手かどうかをチェックする関数
    function isValidMove(row, col) {
        if (cells[row][col].className !== "cell") {
            return false;
        }

        for (let dir of directions) {
            let r = row + dir.row;
            let c = col + dir.col;
            let validDir = false;

            while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                if (cells[r][c].className === discColors.empty) {
                    break;
                } else if (cells[r][c].className === currentPlayer) {
                    validDir = true;
                    break;
                }

                r += dir.row;
                c += dir.col;
            }

            if (validDir) {
                return true;
            }
        }

        return false;
    }

    // ディスクをひっくり返す関数
    function flipDiscs(row, col) {
        for (let dir of directions) {
            let r = row + dir.row;
            let c = col + dir.col;
            let discsToFlip = [];

            while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                if (cells[r][c].className === discColors.empty) {
                    break;
                } else if (cells[r][c].className === currentPlayer) {
                    for (let disc of discsToFlip) {
                        cells[disc.row][disc.col].className = "cell " + currentPlayer;
                    }
                    break;
                } else {
                    discsToFlip.push({ row: r, col: c });
                }

                r += dir.row;
                c += dir.col;
            }
        }
    }

    // プレイヤーを切り替える関数
    function switchPlayer() {
        currentPlayer = (currentPlayer === "black") ? "white" : "black";
    }

    // 有効な手があるかどうかをチェックする関数
    function hasValidMove() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isValidMove(i, j)) {
                    return true;
                }
            }
        }
        return false;
    }

    // ゲーム終了時の処理を行う関数
    function endGame() {
        gameOver = true;
        let blackCount = 0;
        let whiteCount = 0;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (cells[i][j].className === "cell black") {
                    blackCount++;
                } else if (cells[i][j].className === "cell white") {
                    whiteCount++;
                }
            }
        }

        let message;
        if (blackCount > whiteCount) {
            message = "黒の勝利！";
        } else if (blackCount < whiteCount) {
            message = "白の勝利！";
        } else {
            message = "引き分け！";
        }

        alert("ゲーム終了\n黒: " + blackCount + "個\n白: " + whiteCount + "個\n" + message);
    }
});
