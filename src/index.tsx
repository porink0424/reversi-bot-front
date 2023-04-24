import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// import init, { Board, calc_legal_places } from "./pkg/reversi_bot";
// import { COLOR } from "./pkg/reversi_bot";
// init().then(() => {
//   const board = new Board();
//   board.set(
//     BigInt(0x0000000810000000),
//     BigInt(0x0000001008000000),
//     4,
//     COLOR.BLACK
//   );
//   console.log(calc_legal_places(board).toString(16));
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
