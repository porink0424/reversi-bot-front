import React, { useMemo } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import { Box, Button, Stack, Typography } from "@mui/material";
import { GameState } from "../types";
import { GAME_STATE } from "../constants";

function UndoButton({
  gameState,
  setGameState,
}: {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}) {
  if (gameState !== GAME_STATE.WAIT_FOR_PLAYER) return null;

  return useMemo(
    () => (
      <Box
        sx={{
          position: "absolute",
          top: "100px",
          left: "5%",
          bgcolor: "white.main",
          border: "2px solid blue",
          borderRadius: "10px",
        }}
      >
        <Button
          onClick={() => setGameState(GAME_STATE.UNDO)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
          }}
          color="black"
        >
          <Stack direction="column" justifyContent="center">
            <UndoIcon
              sx={{
                width: "100%",
                height: "2.5rem",
              }}
            />
            <Typography sx={{ marginTop: "-0.5rem" }}>UNDO</Typography>
          </Stack>
        </Button>
      </Box>
    ),
    [gameState, setGameState]
  );
}

export default UndoButton;
