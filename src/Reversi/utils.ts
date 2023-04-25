import { BOARD_SIZE, CELL_SIZE, LINE_COUNT } from "./constants";
import { ReversiPosition } from "./types";

export const reversiPositionToThreePosition = (
  position: ReversiPosition
): { x: number; y: number } => {
  const x = position[0] - (BOARD_SIZE / 2 - CELL_SIZE / 2);
  const y = LINE_COUNT - position[1] - 1 - (BOARD_SIZE / 2 - CELL_SIZE / 2);
  return { x, y };
};

export const bigIntToPlaces = (bigInt: bigint): ReversiPosition[] => {
  const placesArray: ReversiPosition[] = [];
  for (let i = 0; i < 64; i += 1) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    if (bigInt & (BigInt(0x8000000000000000) >> BigInt(i))) {
      placesArray.push([x, y]);
    }
  }
  return placesArray;
};

export const placeToBigInt = (place: ReversiPosition): bigint => {
  const [x, y] = place;
  return BigInt(0x8000000000000000) >> BigInt(x + y * 8);
};
