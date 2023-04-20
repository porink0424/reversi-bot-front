import * as THREE from "three";
import {
  BOARD_SIZE,
  LINE_COUNT,
  SEPARATOR_COLOR,
  SEPARATOR_LENGTH,
  SEPARATOR_WIDTH,
  TILE_COLOR,
  TILE_SIZE,
  TILE_THICKNESS,
  TILE_Z,
} from "./constants";
import { reversiPositionToThreePosition } from "./utils";

// Green Rectangles
const createTile = (x: number, y: number) => {
  const geometry = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE, TILE_THICKNESS);
  const material = new THREE.MeshPhongMaterial({ color: TILE_COLOR });
  const tile = new THREE.Mesh(geometry, material);
  tile.position.set(x, y, TILE_Z);
  return tile;
};

// White Lines
// * Create a line between two points
const createSeparator = (
  x: number,
  y: number,
  direction: "horizontal" | "vertical"
) => {
  const geometry = new THREE.BoxGeometry(
    direction === "horizontal" ? SEPARATOR_LENGTH : SEPARATOR_WIDTH,
    direction === "horizontal" ? SEPARATOR_WIDTH : SEPARATOR_LENGTH,
    TILE_THICKNESS
  );
  const material = new THREE.MeshPhongMaterial({ color: SEPARATOR_COLOR });
  const separator = new THREE.Mesh(geometry, material);
  separator.position.set(x, y, TILE_Z);
  return separator;
};

export const createBoard = () => {
  const board = new THREE.Object3D();
  const tiles = [];

  // Create tiles
  for (let x = 0; x < LINE_COUNT; x += 1) {
    const tilesLine = [];
    for (let y = 0; y < LINE_COUNT; y += 1) {
      const { x: threeX, y: threeY } = reversiPositionToThreePosition([x, y]);
      const tile = createTile(threeX, threeY);
      tile.name = `tile-${x}-${y}`;
      tilesLine.push(tile);
      board.add(tile);
    }
    tiles.push(tilesLine);
  }

  // Line between tiles
  for (let i = 0; i <= LINE_COUNT; i++) {
    const horizontalSeparator = createSeparator(
      0,
      -(BOARD_SIZE / 2) + i,
      "horizontal"
    );
    board.add(horizontalSeparator);

    const verticalSeparator = createSeparator(
      -(BOARD_SIZE / 2) + i,
      0,
      "vertical"
    );
    board.add(verticalSeparator);
  }

  return { tiles, board };
};
