import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i) => {
    const newBoard = [...board];
    if (newBoard[i] || calculateWinner(board)) return;
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    shiftBoardRandom(newBoard);
  };

  const shiftBoardRandom = (board) => {
    const randomDirection0 = Math.floor(Math.random() * 3); // 0 = left, 1 = right, 2 = stay
    for (let row = 0; row < 3; row++) {
      const newRow = board.slice(row * 3, row * 3 + 3);
      if (randomDirection0 === 0) {
        newRow.unshift(newRow.pop());
      }
      if (randomDirection0 === 1) {
        newRow.push(newRow.shift());
      }
      board.splice(row * 3, 3, ...newRow);
    }
    // Shift columns
    const randomDirection1 = Math.floor(Math.random() * 3); // 0 = up, 1 = down, 2 = stay
    for (let col = 0; col < 3; col++) {
      const newCol = [board[col], board[col + 3], board[col + 6]];
      if (randomDirection1 === 0) {
        newCol.push(newCol.shift());
      }
      if (randomDirection1 === 1) {
        newCol.unshift(newCol.pop());
      }
      for (let i = 0; i < 3; i++) {
        board[col + i * 3] = newCol[i];
      }
    }

    setBoard(board);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="App">
      <h1>Tic Tac Toe: Schizophrenic Edition</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <h6>by kirilligum</h6>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
