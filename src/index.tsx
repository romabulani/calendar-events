import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthProvider, EventProvider } from "./contexts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
      <ToastContainer position="bottom-right" autoClose={800} draggable />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        ></RouterProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
