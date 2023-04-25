import * as THREE from "three";
import {
  DISC_BLACK_COLOR,
  DISC_RADIUS,
  DISC_THICKNESS,
  DISC_WHITE_COLOR,
  REVERSE_DISC_MAX_FRAME_COUNT,
} from "./constants";
import { ReversiPosition } from "./types";
import { reversiPositionToThreePosition } from "./utils";
import { COLOR } from "../pkg/reversi_bot";
import sound from "../sounds/put_stone.mp3";

export const createDisc = (
  [x, y]: ReversiPosition,
  color: COLOR = COLOR.BLACK,
  discs: (THREE.Object3D<THREE.Event> | null)[][],
  isSoundOn: boolean = true
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
  whiteDisc.position.y = -DISC_THICKNESS / 4;
  blackDisc.position.y = DISC_THICKNESS / 4;
  whiteDisc.name = `whiteDisc-${x}-${y}`;
  blackDisc.name = `blackDisc-${x}-${y}`;

  const othelloDisc = new THREE.Object3D();
  othelloDisc.add(whiteDisc);
  othelloDisc.add(blackDisc);
  othelloDisc.rotation.x = Math.PI / 2;
  if (color === COLOR.WHITE) othelloDisc.rotation.x += Math.PI;
  const { x: threeX, y: threeY } = reversiPositionToThreePosition([x, y]);
  othelloDisc.position.set(threeX, threeY, 0);

  if (isSoundOn) {
    const audio = new Audio(sound);
    audio.play();
  }
  discs[x][y] = othelloDisc;
  return othelloDisc;
};

export const deleteDisc = (
  [x, y]: ReversiPosition,
  discs: (THREE.Object3D<THREE.Event> | null)[][],
  scene: THREE.Scene
) => {
  const disc = discs[x][y];
  if (disc === null) throw new Error("disc is null");
  scene.remove(disc);
  discs[x][y] = null;
};

let nowReversedDiscs: {
  disc: THREE.Object3D<THREE.Event>;
  frame: number;
  onEnd?: () => void;
}[] = [];
export const reverseDisc = (
  [x, y]: ReversiPosition,
  discs: (THREE.Object3D<THREE.Event> | null)[][],
  onEnd?: () => void
) => {
  const disc = discs[x][y];
  if (disc === null) throw new Error("disc is null");
  nowReversedDiscs.push({ disc, frame: 0, onEnd });
};

function reverseDiscAnimate() {
  requestAnimationFrame(reverseDiscAnimate);
  nowReversedDiscs.forEach((disc) => {
    disc.disc.rotation.x += Math.PI / REVERSE_DISC_MAX_FRAME_COUNT;
    disc.disc.position.z =
      0 +
      (disc.frame - REVERSE_DISC_MAX_FRAME_COUNT / 2 <= 0
        ? (0.1 * disc.frame) / 0.6
        : (0.1 * (REVERSE_DISC_MAX_FRAME_COUNT - disc.frame)) / 0.6);
    disc.frame += 1;
    if (disc.frame >= REVERSE_DISC_MAX_FRAME_COUNT) {
      const audio = new Audio(sound);
      audio.play();
      disc.disc.position.z = 0;
      if (disc.onEnd) disc.onEnd();
      nowReversedDiscs = nowReversedDiscs.filter((d) => d !== disc);
    }
  });
}
reverseDiscAnimate();
