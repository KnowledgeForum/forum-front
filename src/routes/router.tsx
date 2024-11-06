import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/Main/MainLayout";
import CenterLayout from "@/layouts/Center/CenterLayout";

import EmailVerify from "../pages/EmaillVerify/EmailVerify";
import EmailVerifyCode from "../pages/EmailVerifyCode/EmailVerifyCode";

import Main from "@/pages/Main/Main";
import News from "@/pages/News/News";
import Follow from "@/pages/Follow/Follow";
import Board from "@/pages/Board/Board";
import BoardDetail from "@/pages/BoardDetail/BoardDetail";

import Login from "@/pages/Login/Login";
import Callback from "@/pages/Callback/Callback";
import Register from "@/pages/Register/Register";
import Post from "@/pages/Post/Post";
import Update from "@/pages/Update/Update";

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
      {
        path: "/board/:boardId",
        element: <BoardDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: "/post",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Post />,
      },
    ],
  },
  {
    path: "/update/:boardId",
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <Update />,
      },
    ],
  },
  {
    path: "/callback",
    children: [
      {
        index: true,
        element: <Callback />,
      },
    ],
  },
  {
    path: "/email/verify",
    element: <EmailVerify />,
  },
  {
    path: "/email/verify/code",
    element: <EmailVerifyCode />,
  },
]);

export default router;
