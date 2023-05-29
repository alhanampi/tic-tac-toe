import React, { useEffect, useState } from "react";
import { BiCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import './styles.css';

const Square = ({ id, setSquares, player, setPlayer, boardTiles, reset, disabled }) => {
  const [className, setClassName] = useState("");
  const [content, setContent] = useState(null);

  const handleClick = () => {
    if (!disabled && className === "") {
      if (player === "circle") {
        setClassName("circle");
        setPlayer("cross");
        setContent(<BiCircle size={60} className="circle" />);
      } else if (player === "cross") {
        setClassName("cross");
        setPlayer("circle");
        setContent(<ImCross size={60} className="cross" />);
      }
    }
  };

  useEffect(() => {
    handleTileChange();
  }, [content, reset]);

  useEffect(() => {
    if (reset) {
      setClassName("");
      setContent(null);
    }
  }, [reset]);

  const handleTileChange = () => {
    const changeTile = boardTiles.map((b, index) => {
      if (index === id) {
        return className;
      }
      return b;
    });

    setSquares(changeTile);
  };

  return (
    <div className={`square ${className}`} id={id} onClick={handleClick}>
      {content}
    </div>
  );
};

export default Square;
