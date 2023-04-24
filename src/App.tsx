import React from "react";
import Reversi from "./Reversi/Reversi";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    black: {
      main: "#000000",
    },
    white: {
      main: "#dddddd",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Reversi />
      </ThemeProvider>
    </div>
  );
}

export default App;
