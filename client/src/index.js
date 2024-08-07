import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./AppLayout";
import reportWebVitals from "./reportWebVitals";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import ProtectRoute from "./utils/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <AppLayout />
      </ProtectRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
