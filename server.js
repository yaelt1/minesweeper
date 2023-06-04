const express = require('express');
const app = express();

function randomNum(end) {
    const num = Math.floor(Math.random() * end);
    return (num);
}

class mineGame {
    constructor(rows, cols, mines) {
        this.board = []
        this.rows = rows;
        this.cols = cols;
        this.mines = mines
    }

    createBoard() {
        this.board = []
        for (let i = 0; i < this.rows; i++) {
            this.board.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.board[i].push({
                    row: i,
                    col: j,
                    isMine: false,
                    revealed: false,
                    flagged: false,
                    value: null
                })
            }
        }
        this.plantMines()
        return this.board;
    }




    plantMines() {
        let randRow, randCol, counter = 0
        while (counter < this.mines) {
            randRow = randomNum(this.rows);
            randCol = randomNum(this.cols);
            if (!this.board[randRow][randCol].isMine) {
                this.board[randRow][randCol].isMine = true;
                counter++;
            }
        }
    };


    newGame() {
        this.board = this.createBoard();
    }
}

const game = new mineGame(10, 10, 20);

// api endpoint to start the game
app.get("/api/new-game", (req, res) => {
    game.newGame()
    res.json({ message: "board was created", rows: game.rows, cols: game.cols, mines: game.mines, board: game.board });
})



app.listen(3000, () => { console.log(`running on port 3000`) })