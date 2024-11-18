// src/router.tsx

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage, SignupPage } from "./pages";
import { ErrorState } from "./components";
import App from "./App";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorState />,
      children: [
        {
          index: true, // default child route
          element: <App />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
