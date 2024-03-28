import { createBrowserRouter } from "react-router-dom";
import GamesIndex from "../pages/GamesIndex";
import BattleshipsHistory from "../pages/BattleshipsHistory";
import BattleshipsIndex from "../pages/BattleshipsIndex";
import BattleshipsOptions from "../pages/BattleshipsOptions";
import BattleshipsPlacement from "../pages/BattleshipsPlacement";
import BattleshipsGameSession from "../pages/BattleshipsGameSession";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFoundPage from "../pages/NotFoundPage";

export const SechatGamesRouter = () => {
  return createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <GamesIndex />,
        },
        {
          path: "/bs/game-session",
          element: <BattleshipsGameSession />,
        },
        {
          path: "/bs/history",
          element: <BattleshipsHistory />,
        },
        {
          path: "/bs",
          element: <BattleshipsIndex />,
        },
        {
          path: "/bs/options",
          element: <BattleshipsOptions />,
        },
        {
          path: "/bs/placemen",
          element: <BattleshipsPlacement />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};
