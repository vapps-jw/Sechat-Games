import React from "react";
import { useStore, StoreObjects } from "../../App";
import { GameView } from "../../Battleships.js";

function Landing() {
  const [gameView, setGameView] = useStore(
    (store) => store[StoreObjects.BATTLESHIPS_GAME_VIEW]
  );

  return (
    <>
      <div>Landing</div>
      <button
        className="btn"
        onClick={() =>
          setGameView({
            [StoreObjects.BATTLESHIPS_GAME_VIEW]: GameView.PLACEMENT,
          })
        }
      >
        PvC
      </button>
      <button
        className="btn"
        onClick={() =>
          setGameView({
            [StoreObjects.BATTLESHIPS_GAME_VIEW]: GameView.PLACEMENT,
          })
        }
      >
        PvP
      </button>
      <button
        className="btn"
        onClick={() =>
          setGameView({
            [StoreObjects.BATTLESHIPS_GAME_VIEW]: GameView.OPTIONS,
          })
        }
      >
        Options
      </button>
    </>
  );
}

export default Landing;
