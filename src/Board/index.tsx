import "./index.css";

import classnames from "classnames";
import React, { type CSSProperties } from "react";
import { useSnapshot } from "valtio";

import { store } from "../store";

const BoardBgRow: React.FC<{ isExtra?: boolean }> = ({ isExtra = false }) => (
  <div className="block-row">
    {Array(isExtra ? 2 : 5)
      .fill(null)
      .map((_, idx) => (
        <div
          key={idx}
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
        // @ts-expect-error xxxxx
        <div key={i} className="card-deck" style={{ "--i": i }}></div>
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
  h?: number;
  defense?: boolean;
  opponent?: boolean;
  fly?: boolean;
  transTime?: number;
  style?: CSSProperties;
}> = ({
  r = 0,
  c = 0,
  h = 1,
  defense = false,
  opponent = false,
  fly = false,
  transTime = 0.3,
  style = {},
}) => {
  return (
    <div
      className={classnames("card", {
        "card-defense": defense,
        fly,
      })}
      style={
        {
          "--h": h,
          "--r": r,
          "--c": c,
          "--shadow": h > 0 ? 1 : 0,
          "--opponent-deg": opponent ? "180deg" : "0deg",
          "--trans-time": `${transTime}s`,
          ...style,
        } as any
      }
    ></div>
  );
};

export const Board: React.FC = () => {
  const snap = useSnapshot(store);

  const cards = snap.magics.concat(snap.monsters);

  return (
    <>
      <div id="controller">
        <button onClick={() => {}}>A1</button>
        <button onClick={() => {}}>A2</button>
      </div>
      <div id="camera">
        <div id="board">
          <BoardBg />
          {cards.map((card) => (
            <Card
              key={card.code}
              r={card.transform.r}
              c={card.transform.c}
              h={card.transform.h}
              defense={card.defense}
            />
          ))}
        </div>
      </div>
    </>
  );
};
