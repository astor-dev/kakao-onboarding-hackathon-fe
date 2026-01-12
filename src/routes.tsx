import App from "@/App";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { Home } from "@/pages/home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
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
        ],
      },
    ],
  },
])