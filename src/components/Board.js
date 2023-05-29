/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Square from "./Square";
import "./styles.css";

const Board = () => {
  const boardSize = 3;
  const boardSquares = Array(boardSize * boardSize).fill();
  const [boardTiles, setboardTiles] = useState(boardSquares);
  const [player, setPlayer] = useState("circle");
  const [won, setWon] = useState(null);
  const [reset, setReset] = useState(false);
  const [winningCombClass, setWinningCombClass] = useState("");

  const message = `${player} is playing!`;

  const checkScore = () => {
    const winningCombs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombs.forEach((array, index) => {
      let circleWin = array.every((bt) => boardTiles[bt] === "circle");
      let crossWin = array.every((bt) => boardTiles[bt] === "cross");

      if (circleWin) {
        setWon("circle won!!");
        setWinningCombClass(`comb${index + 1}`);
      } else if (crossWin) {
        setWon("cross won!!");
        setWinningCombClass(`comb${index + 1}`);
      }
    });
  };

  useEffect(() => {
    checkScore();
  }, [boardTiles]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const handleSquareClick = (index) => {
    if (!won) {
      const newBoardTiles = [...boardTiles];
      newBoardTiles[index] = player;
      setboardTiles(newBoardTiles);
      setPlayer(player === "circle" ? "cross" : "circle");
    }
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setboardTiles(boardSquares);
    setPlayer("circle");
    setWon(null);
    setReset(true);
  };

  return (
    <>
      <div className="board">
        <h1>Tateti!</h1>
        <div className="squareBoard">
          {boardTiles.map((s, index) => (
            <Square
              key={index}
              setSquares={setboardTiles}
              id={index}
              player={player}
              setPlayer={setPlayer}
              boardTiles={boardTiles}
              reset={reset}
              onClick={() => handleSquareClick(index)}
              disabled={won !== null}
            />
          ))}
        </div>
        <h2>{won === null ? message : won}</h2>
        {won !== null && (
          <>
            <div className={`winline ${winningCombClass}`} />
            <button onClick={handleRestart}>restart!</button>
          </>
        )}
      </div>
    </>
  );
};

export default Board;
