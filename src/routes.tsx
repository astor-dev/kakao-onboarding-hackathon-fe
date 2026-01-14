import App from "@/App";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { Home } from "@/pages/home";
import { ChatRoom } from "@/pages/chat";
import { TalkDrawer } from "@/pages/chat/cloud";
import { CategoryPage } from "@/pages/chat/cloud/category";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/chat/:id',
              element: <ChatRoom />,
            },
            {
              path: '/chat/:id/cloud',
              element: <TalkDrawer />,
            },
            {
              path: '/chat/:id/cloud/category/:categoryId',
              element: <CategoryPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)