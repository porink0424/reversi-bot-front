import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// import init, { greet } from "./pkg/reversi_bot";
// init().then(greet);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
