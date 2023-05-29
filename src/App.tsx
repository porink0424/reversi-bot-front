import React from "react";
import Reversi from "./Reversi/Reversi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
    <Box
      id="App"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "black",
      }}
    >
      <ThemeProvider theme={theme}>
        <Reversi />
      </ThemeProvider>
    </Box>
  );
}

export default App;
