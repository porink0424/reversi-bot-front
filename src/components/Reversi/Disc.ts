import * as THREE from "three";
import {
  COLOR,
  DISC_BLACK_COLOR,
  DISC_RADIUS,
  DISC_THICKNESS,
  DISC_WHITE_COLOR,
} from "./constants";
import { Color, ReversiPosition } from "./types";
import { reversiPositionToThreePosition } from "./utils";

export const createDisc = (
  [x, y]: ReversiPosition,
  color: Color = COLOR.BLACK
) => {
  const whiteDiscGeometry = new THREE.CylinderGeometry(
    DISC_RADIUS,
    DISC_RADIUS,
    DISC_THICKNESS / 2,
    32
  );
  const blackDiscGeometry = new THREE.CylinderGeometry(
    DISC_RADIUS,
    DISC_RADIUS,
    DISC_THICKNESS / 2,
    32
  );
  const whiteDiscMaterial = new THREE.MeshPhongMaterial({
    color: DISC_WHITE_COLOR,
  });
  const blackDiscMaterial = new THREE.MeshPhongMaterial({
    color: DISC_BLACK_COLOR,
  });
  const whiteDisc = new THREE.Mesh(whiteDiscGeometry, whiteDiscMaterial);
  const blackDisc = new THREE.Mesh(blackDiscGeometry, blackDiscMaterial);
  blackDisc.position.y = DISC_THICKNESS / 4;
  whiteDisc.position.y = -DISC_THICKNESS / 4;

  const othelloDisc = new THREE.Object3D();
  othelloDisc.add(whiteDisc);
  othelloDisc.add(blackDisc);
  othelloDisc.rotation.x = Math.PI / 2;
  if (color === COLOR.WHITE) othelloDisc.rotation.x += Math.PI;
  const { x: threeX, y: threeY } = reversiPositionToThreePosition([x, y]);
  othelloDisc.position.set(threeX, threeY, 0);

  return othelloDisc;
};
