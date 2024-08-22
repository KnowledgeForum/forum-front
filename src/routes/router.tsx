import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/Main/MainLayout";

import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import Follow from "@/pages/Follow/Follow";
import Board from "@/pages/Board/Board";

/**
 * router 파일은 어떤 주소에 어떤 pages/[filename].tsx가 띄워질지 정하는 파일입니다.
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/follow",
        element: <Follow />,
      },
    ],
  },
]);

export default router;
