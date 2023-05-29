import { useEffect, useState } from "react";
import Square from "./Square";
import "./styles.css";
import { checkScore } from "../utils/boardUtil";

const Board = () => {
  const boardSize = 3;
  const boardSquares = Array(boardSize * boardSize).fill();
  const [boardTiles, setBoardTiles] = useState(boardSquares);
  const [player, setPlayer] = useState("circle");
  const [won, setWon] = useState(null);
  const [reset, setReset] = useState(false);
  const [winningCombClass, setWinningCombClass] = useState("");

  const message = `${player} is playing!`;

  useEffect(() => {
    const result = checkScore(boardTiles);
    if (result) {
      setWon(result.winner);
      setWinningCombClass(result.winningCombClass);
    }
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
      setBoardTiles(newBoardTiles);
      setPlayer(player === "circle" ? "cross" : "circle");
    }
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setBoardTiles(boardSquares);
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
              setSquares={setBoardTiles}
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
