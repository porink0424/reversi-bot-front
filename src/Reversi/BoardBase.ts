import * as THREE from "three";
import { BOARD_BASE_HEIGHT, BOARD_BASE_SIZE, BOARD_BASE_Z } from "./constants";

export const createBoardBase = () => {
  const boardBaseGeometry = new THREE.BoxGeometry(
    BOARD_BASE_SIZE,
    BOARD_BASE_SIZE,
    BOARD_BASE_HEIGHT
  );
  const woodTexture = new THREE.TextureLoader().load("textures/wood.jpg");
  const boardBaseMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,
  });
  const boardBase = new THREE.Mesh(boardBaseGeometry, boardBaseMaterial);
  boardBase.position.set(0, 0, BOARD_BASE_Z);
  return boardBase;
};
