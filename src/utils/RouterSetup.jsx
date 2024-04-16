import { createBrowserRouter } from "react-router-dom";
import GamesIndex from "../pages/GamesIndex";
import BattleshipsIndex from "../pages/BattleshipsIndex";
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
          path: "/",
          element: <GamesIndex />,
        },
        {
          path: "/bs",
          element: <BattleshipsIndex />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};
