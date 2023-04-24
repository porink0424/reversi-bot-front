import React, { useEffect, useRef, useState } from "react";
import { AnimationController } from "./AnimationController";
import { GameState } from "./types";
import { GAME_STATE } from "./constants";
import StartModal from "./UI/StartModal";

function GameManager({
  animationController,
}: {
  animationController?: AnimationController;
}) {
  const [gameState, setGameState] = useState<GameState>(GAME_STATE.START);
  const [playerColor, setPlayerColor] = useState<"black" | "white" | null>(
    null
  );

  const previousGameState = useRef<GameState>(gameState);
  useEffect(() => {
    if (gameState !== previousGameState.current) {
      switch (gameState) {
        case GAME_STATE.START:
          break;
        default:
          break;
      }
      previousGameState.current = gameState;
    }
  }, [gameState]);

  return (
    <div>
      <StartModal
        gameState={gameState}
        setGameState={setGameState}
        setPlayerColor={setPlayerColor}
      />
    </div>
  );
}

export default GameManager;
