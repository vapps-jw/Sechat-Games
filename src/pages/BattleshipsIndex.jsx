import React from "react";
import { useStore, StoreObjects } from "../App";
import { GameView } from "../Battleships.js";
import Options from "../components/battleships/Options.jsx";
import History from "../components/battleships/History.jsx";
import Landing from "../components/battleships/Landing.jsx";

function BattleshipsIndex() {
  const [gameView] = useStore(
    (store) => store[StoreObjects.BATTLESHIPS_GAME_VIEW]
  );

  return (
    <>
      <div>BattleshipsIndex</div>
      {gameView === GameView.OPTIONS ? (
        <Options />
      ) : gameView === GameView.HISTORY ? (
        <History />
      ) : gameView === GameView.LANDING ? (
        <Landing />
      ) : (
        <Landing />
      )}
    </>
  );
}

export default BattleshipsIndex;
