import React from "react";
import { useStore, StoreObjects } from "../App";
import { GameView } from "../Battleships.js";
import Options from "../components/battleshipsViews/Options.jsx";
import History from "../components/battleshipsViews/History.jsx";
import Landing from "../components/battleshipsViews/Landing.jsx";

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
