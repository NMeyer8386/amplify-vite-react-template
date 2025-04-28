import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Callback from "./Callback.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

Amplify.configure(outputs);

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="callback" element={<Callback />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
