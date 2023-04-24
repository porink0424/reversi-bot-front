import React, { useEffect, useRef, useState } from "react";
import { AnimationController } from "./AnimationController";
import { GameState } from "./types";
import { GAME_STATE } from "./constants";

function GameManager({
  animationController,
}: {
  animationController?: AnimationController;
}) {
  const [gameState, setGameState] = useState<GameState>(GAME_STATE.START);

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

  return <div></div>;
}

export default GameManager;
