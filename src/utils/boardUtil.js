export const checkScore = (boardTiles) => {
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

  const isWinningComb = (comb, value) =>
    comb.every((bt) => boardTiles[bt] === value);

  for (let index = 0; index < winningCombs.length; index++) {
    const comb = winningCombs[index];
    if (isWinningComb(comb, "circle")) {
      return {
        winner: "circle won!!",
        winningCombClass: `comb${index + 1}`,
      };
    } else if (isWinningComb(comb, "cross")) {
      return {
        winner: "cross won!!",
        winningCombClass: `comb${index + 1}`,
      };
    }
  }

  return null;
};
