import React, { useEffect, useState } from 'react';
import { Row } from './Row';



export function Board(props) {

    const [board, setBoard] = useState(props.board)
    const [status, setStatus] = useState("waiting"); //waiting
    const [flagged, setFlagged] = useState(0); //0
    const [openCells, setOpenCells] = useState(0); //0
    const [gameOver, setGameOver] = useState(false); //false
    console.log("Board rendered. Status:", status);

    useEffect(() => {
        if (props.status !== status) {
            setStatus(props.status);
            console.log("Status:", status);
        }
    }, [props.status, status]);


    useEffect(() => {
        if (board !== props.board) {
            setBoard(props.board);
            console.log("Board updated:", props.board);
        }
    }, [props.board, board]);

    const resetGame = () => {
        props.reset()
        setStatus("waiting");
        setFlagged(0);
        setOpenCells(0);
        setGameOver(false);

    }


    const revealMines = () => {
        const updatedBoard = board.map(row =>
            row.map(cell => {
                if (cell.isMine) {
                    cell.revealed = true;
                    cell.flaged = false;
                }
                return cell;
            }))
        setBoard(updatedBoard);
    }



    function revealAround(cell) {
        const right = cell.col > 0 ? cell.col - 1 : cell.col
        const left = cell.col < props.cols - 1 ? cell.col + 1 : cell.col
        const up = cell.row > 0 ? cell.row - 1 : cell.row
        const down = cell.row < props.rows - 1 ? cell.row + 1 : cell.row

        for (let i = up; i <= down; i++) {
            for (let j = right; j <= left; j++) {
                let curr = board[i][j]
                if (!curr.isMine && !curr.revealed) {
                    openCell(curr)
                }
            }
        }
    }

    function didWin() {
        console.log("check for winCond")
        if (flagged === props.mines && openCells === (props.rows * props.cols - flagged)) {
            console.log("you win!");
            setGameOver(true)
            revealMines();
            return (true);
        } else { return (false) }
    }

    function openFlag(cell) {
        if (gameOver) { return; }
        props.handleCellClick();
        cell.flagged = !cell.flagged;
        const flagsCnt = cell.flagged ? flagged + 1 : flagged - 1;
        console.log(flagsCnt)
        setFlagged(flagsCnt)
        if (didWin()) {
            alert("YOU WON!!");
            setStatus("end game")

        }
    };

    function openCell(tile) {
        if (gameOver) { return; }
        props.handleCellClick();
        if (tile.isMine) {
            if (openCells === 0) {
                resetGame();
            } else {
                props.endGame();
                setGameOver(true)
                alert("GAME OVER!")
                revealMines();
            }
            // props.endGame();
        }

        else {
            if (!tile.flagged && !tile.revealed) {
                tile.value = computeValue(tile);
                tile.revealed = true;
                setOpenCells(openCells + 1)
                if (tile.value === 0) {
                    revealAround(tile)
                }
            }
            if (didWin()) {
                alert("YOU WON!!");
                setStatus("end game");
                revealMines();
            }
        }
    }


    function computeValue(cell) {
        let minesAround = 0;
        const right = cell.col > 0 ? cell.col - 1 : cell.col
        const left = cell.col < props.cols - 1 ? cell.col + 1 : cell.col
        const up = cell.row > 0 ? cell.row - 1 : cell.row
        const down = cell.row < props.rows - 1 ? cell.row + 1 : cell.row

        for (let i = up; i <= down; i++) {
            for (let j = right; j <= left; j++) {
                if (board[i][j].isMine) {
                    minesAround++;
                }
            }
        }
        return minesAround;
    }



    let boardRow = board.map((row, index) => (
        <Row cells={row}
            key={index}
            openCell={openCell}
            openFlag={openFlag}
            gameOver={gameOver} />)
    );
    return (
        <div>
            <button className='ResetButton' onClick={resetGame}>Reset Game</button>
            < div className='board'>{boardRow}</div >
        </div >)

};
export default Board;