import React, { useMemo } from "react";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { GameState } from "../types";
import { GAME_STATE } from "../constants";
import { COLOR } from "../../pkg/reversi_bot";

function StartModal({
  gameState,
  setGameState,
  setPlayerColor,
}: {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  setPlayerColor: (playerColor: COLOR | null) => void;
}) {
  return useMemo(
    () => (
      <Modal
        open={
          gameState === GAME_STATE.START ||
          gameState === GAME_STATE.CHOOSE_COLOR
        }
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "200px",
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
                  marginBottom: "2rem",
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
                  fontSize: "2rem",
                  marginBottom: "2rem",
                  fontWeight: "600",
                }}
              >
                YOUR COLOR?
              </Typography>
              <Stack direction="row" spacing={4}>
                <Button
                  variant="contained"
                  color="black"
                  onClick={() => {
                    setPlayerColor(COLOR.BLACK);
                    setGameState(GAME_STATE.INITIALIZE_BOARD);
                  }}
                  sx={{
                    width: "8rem",
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
                    setPlayerColor(COLOR.WHITE);
                    setGameState(GAME_STATE.INITIALIZE_BOARD);
                  }}
                  sx={{
                    width: "8rem",
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
    ),
    [gameState, setGameState, setPlayerColor]
  );
}

export default StartModal;
