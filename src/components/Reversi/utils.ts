import { BOARD_SIZE, CELL_SIZE, LINE_COUNT } from "./constants";
import { ReversiPosition } from "./types";

export const reversiPositionToThreePosition = (
  position: ReversiPosition
): { x: number; y: number } => {
  const x = position[0] - (BOARD_SIZE / 2 - CELL_SIZE / 2);
  const y = LINE_COUNT - position[1] - 1 - (BOARD_SIZE / 2 - CELL_SIZE / 2);
  return { x, y };
};
