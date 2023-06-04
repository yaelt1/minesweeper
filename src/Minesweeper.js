
import './App.css';
import { Board } from './components/Board';
import React, { useEffect, useState } from 'react';
import BoardHead from './components/BoardHead'
import axios from 'axios'



export default function Minesweeper() {
  const [board, setBoard] = useState(() => [])
  const [status, setStatus] = useState("waiting");
  const [row, setRow] = useState(null);
  const [cols, setCols] = useState(null);
  const [mines, setMines] = useState(null);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [backendData, setBackendData] = useState("")

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('/api/new-game')
        setBackendData(response.data.message);
        setRow(response.data.rows);
        setCols(response.data.cols);
        setMines(response.data.mines);
        setBoard(response.data.board)
      }
      catch (err) {
        console.error(err);
      }
    };
    fetchData1();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (status === "running") {
        setTime(prevTime => prevTime + 1)
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const resetBoard = async () => {
    try {
      const response = await axios.get('/api/new-game');
      setBoard(response.data.board);
      setStatus("waiting");
      setTime(0);
      setGameOver(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCellClick = () => {
    if (status !== "running") {
      setStatus("running");
    }

  }

  const endGame = () => {
    setStatus("end game")
  }


  return (

    < div className='Minesweeper' >
      {console.log("in minesweeper comp")}
      <h1>Minesweeper</h1>
      <BoardHead time={time} mines={mines} />
      <Board
        board={board}
        rows={row}
        cols={cols}
        mines={mines}
        status={status}
        gameOver={gameOver}
        handleCellClick={handleCellClick}
        endGame={endGame}
        reset={resetBoard} />
    </div >
  );
}


