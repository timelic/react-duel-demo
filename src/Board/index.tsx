import React, { type CSSProperties, useState } from "react";
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
        fly: fly,
      })}
      style={
        {
          "--h": h,
          "--r": r,
          "--c": c,
          "--shadow": h ? 1 : 0,
          "--opponent-deg": opponent ? "180deg" : "0deg",
          "--trans-time": `${transTime}s`,
          ...style,
        } as CSSProperties
      }
    ></div>
  );
};

export const Board: React.FC = () => {
  const [r1, setR1] = useState(0);
  const [c1, setC1] = useState(0);
  const [fly, setFly] = useState(false);
  const [transTime, setTransTime] = useState(0.3);
  const [opponent, setOpponent] = useState(true);
  function handleClick1() {
    // 先r1+=1 满了再c1+=1
    if (c1 < 4) {
      setC1(c1 + 1);
      setFly(true);
      setTimeout(() => setFly(false), 300);
    } else {
      setC1(0);
      setR1(r1 + 1);
      setFly(true);
      setTimeout(() => setFly(false), 300);
      setOpponent(!opponent);
    }
  }
  return (
    <>
      <div id="controller">
        <button onClick={handleClick1}>A1</button>
        <button>A2</button>
      </div>
      <div id="camera">
        <div id="board">
          <BoardBg />
          <Card
            r={r1}
            c={c1}
            fly={fly}
            transTime={transTime}
            opponent={opponent}
            style={{ zIndex: 99 }}
          />
          <Card r={0} c={4} opponent />
          <Card r={2} c={3} h={90} />
          <Card r={4} c={0} />
          <Card r={3} c={2} defense />
          <Card r={4} c={4} />
        </div>
      </div>
    </>
  );
};
