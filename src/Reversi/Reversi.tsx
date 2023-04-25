import React, { useEffect, useRef } from "react";
import { AnimationController } from "./AnimationController";
import GameManager from "./GameManager";

function Reversi() {
  const animationController = useRef<AnimationController | undefined>(
    undefined
  );

  const hasBooted = useRef(false);
  useEffect(() => {
    if (!hasBooted.current) {
      hasBooted.current = true;
      const newAnimationController = new AnimationController();
      animationController.current = newAnimationController;
    }
  }, []);

  return (
    <div>
      <GameManager animationController={animationController} />
    </div>
  );
}

export default Reversi;
