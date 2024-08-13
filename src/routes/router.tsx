import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import MainLayout from "../layouts/Main/MainLayout";

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
    ],
  },
]);

export default router;
