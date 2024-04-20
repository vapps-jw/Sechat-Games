import React from "react";
import { useStore, StoreObjects } from "../../contexts/appState.js";
import { GameView } from "../../Battleships.js";

function Options() {
  const [gameView, setGameView] = useStore(
    (store) => store[StoreObjects.BATTLESHIPS_GAME_VIEW]
  );

  return (
    <>
      <div>Options</div>
      <button
        className="btn"
        onClick={() =>
          setGameView({
            [StoreObjects.BATTLESHIPS_GAME_VIEW]: GameView.LANDING,
          })
        }
      >
        Back
      </button>
    </>
  );
}

export default Options;
