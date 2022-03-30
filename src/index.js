import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./components/App";
import "./index.css";

const app = ReactDOMClient.createRoot(document.getElementById("app"));
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

serviceWorkerRegistration.register();
/*if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then(function () {
    console.log("Service Worker Registered");
  });
}*/
