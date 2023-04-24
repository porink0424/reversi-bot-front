import React, { useEffect, useRef, useState } from "react";
import { AnimationController } from "./AnimationController";
import { GameManager } from "./GameManager";

function Reversi() {
  const [animationController, setAnimationController] = useState<
    AnimationController | undefined
  >(undefined);
  const [gameManager, setGameManager] = useState<GameManager | undefined>(
    undefined
  );

  const hasBooted = useRef(false);
  useEffect(() => {
    if (!hasBooted.current) {
      hasBooted.current = true;
      const newAnimationController = new AnimationController();
      setAnimationController(newAnimationController);
      const newGameManager = new GameManager(newAnimationController);
      setGameManager(newGameManager);
    }
  }, []);

  return <div></div>;
}

export default Reversi;
