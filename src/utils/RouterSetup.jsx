import { createBrowserRouter } from "react-router-dom";
import GamesIndex from "../pages/GamesIndex";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import SemoniaIndex from "../pages/SemoniaIndex";

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
          path: "/semonia",
          element: <SemoniaIndex />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};
