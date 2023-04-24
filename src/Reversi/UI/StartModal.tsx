import React from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { GameState } from "../types";
import { GAME_STATE } from "../constants";

function StartModal({
  gameState,
  setGameState,
  setPlayerColor,
}: {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  setPlayerColor: (playerColor: "black" | "white" | null) => void;
}) {
  return (
    <Modal
      open={
        gameState === GAME_STATE.START || gameState === GAME_STATE.CHOOSE_COLOR
      }
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "400px",
          backgroundColor: "#fff",
          border: "2px solid #000",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {gameState === GAME_STATE.START ? (
          <>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                marginBottom: "4rem",
                fontWeight: "600",
              }}
            >
              REVERSI-BOT
            </Typography>
            <Button
              variant="contained"
              onClick={() => setGameState(GAME_STATE.CHOOSE_COLOR)}
              sx={{
                width: "60%",
                fontSize: "1rem",
                display: "block",
              }}
            >
              START
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                marginBottom: "4rem",
                fontWeight: "600",
              }}
            >
              YOUR COLOR ?
            </Typography>
            <Stack direction="row" spacing={6}>
              <Button
                variant="contained"
                color="black"
                onClick={() => {
                  setPlayerColor("black");
                  setGameState(GAME_STATE.CHECK);
                }}
                sx={{
                  width: "150px",
                  fontSize: "1rem",
                  display: "block",
                  color: "#fff",
                }}
              >
                BLACK
              </Button>
              <Button
                variant="contained"
                color="white"
                onClick={() => {
                  setPlayerColor("white");
                  setGameState(GAME_STATE.CHECK);
                }}
                sx={{
                  width: "150px",
                  fontSize: "1rem",
                  display: "block",
                  color: "#000",
                }}
              >
                WHITE
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default StartModal;
