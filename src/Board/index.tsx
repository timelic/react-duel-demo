import React from "react";
import classnames from "classnames";
import "./index.css";

const BoardBgRow: React.FC<{ isExtra?: boolean }> = ({ isExtra = false }) => (
  <div className="block-row">
    {Array(isExtra ? 2 : 5)
      .fill(null)
      .map((_) => (
        <div
          className={classnames("block", {
            "block-extra": isExtra,
          })}
        ></div>
      ))}
  </div>
);

const BoardDeck: React.FC<{
  nCards: number;
  isMain?: boolean;
  isOpponent?: boolean;
}> = ({ nCards, isMain = false, isOpponent = false }) => (
  <div
    className={classnames("deck", {
      "deck-main": isMain,
      "deck-opponent": isOpponent,
    })}
  >
    {Array(nCards)
      .fill(null)
      .map((_, i) => (
        // @ts-ignore
        <div className="card-deck" style={{ "--i": i }}></div>
      ))}
  </div>
);

const BoardBg: React.FC = () => (
  <div id="board-bg">
    <BoardBgRow />
    <BoardBgRow />
    <BoardBgRow isExtra />
    <BoardBgRow />
    <BoardBgRow />
    <BoardDeck nCards={15} />
    <BoardDeck nCards={40} isMain />
    <BoardDeck nCards={15} isOpponent />
    <BoardDeck nCards={40} isMain isOpponent />
  </div>
);

const Card: React.FC<{
  r?: number;
  c?: number;
  z?: number;
  defense?: boolean;
}> = ({ r = 0, c = 0, z = 0, defense = false }) => {
  return (
    <div
      className={classnames("card", { "card-defense": defense })}
      // @ts-ignore
      style={{ "--z": z, "--r": r, "--c": c }}
    ></div>
  );
};

export const Board: React.FC = () => (
  <div id="camera">
    <div id="board">
      <BoardBg />
      <Card r={1} c={1} />
      <Card r={2} c={3} />
      <Card r={3} c={2} />
      <Card r={4} c={0} defense />
      <Card r={4} c={4} />
    </div>
  </div>
);
