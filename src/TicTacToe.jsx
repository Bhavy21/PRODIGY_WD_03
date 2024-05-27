import React, { useState, useRef } from 'react';
import O from './assets/circle.png';
import X from './assets/cross.png';

const initialData = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || data[index]) return;

    const newData = [...data];
    newData[index] = currentPlayer;
    setData(newData);
    setCount(count + 1);

    if (!checkWin(newData)) {
      const nextPlayer = currentPlayer === "x" ? "o" : "x";
      setCurrentPlayer(nextPlayer);
      titleRef.current.innerHTML = `Turn: <img src='${nextPlayer === "x" ? X : O}'>`;
    }
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setLock(true);
        titleRef.current.innerHTML = `Congrats: <img src='${board[a] === "x" ? X : O}'> is the Winner!`;
        return true;
      }
    }

    if (board.every(cell => cell)) {
      titleRef.current.innerHTML = "It's a tie!";
      return true;
    }

    return false;
  };

  const reset = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    setCurrentPlayer("x");
    titleRef.current.innerHTML = `Turn: <img src='${X}'>`;
  };

  return (
    <div className='container'>
      <h1 className='title'>Tic Tac Toe Game</h1>
      <div className='status' ref={titleRef}>Turn: <img src={X} /></div>
      <div className="board">
        {data.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => toggle(index)}
            dangerouslySetInnerHTML={{ __html: value ? `<img src='${value === "x" ? X : O}'>` : "" }}
          ></div>
        ))}
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};
