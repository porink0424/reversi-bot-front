import * as THREE from "three";
import { createBoard } from "./Board";
import { createDisc } from "./Disc";
import {
  AMBIENT_LIGHT_INTENSITY,
  CAMERA_FOV,
  CAMERA_LOOK_AT,
  CAMERA_POSITION,
  CAMERA_ZOOM_FACTOR,
  LIGHT_COLOR,
  LINE_COUNT,
  POINT_LIGHT_DISTANCE,
  POINT_LIGHT_INTENSITY,
  POINT_LIGHT_POSITION,
} from "./constants";
import { createBoardBase } from "./BoardBase";
import { COLOR } from "../pkg/reversi_bot";

export const setUpDiscs = (scene: THREE.Scene) => {
  const discs: (THREE.Object3D<THREE.Event> | null)[][] = Array(LINE_COUNT)
    .fill(null)
    .map(() => Array(LINE_COUNT).fill(null));
  scene.add(createDisc([3, 3], COLOR.WHITE, discs));
  scene.add(createDisc([4, 4], COLOR.WHITE, discs));
  scene.add(createDisc([3, 4], COLOR.BLACK, discs));
  scene.add(createDisc([4, 3], COLOR.BLACK, discs));
  return discs;
};

export const setUpReversi = () => {
  const scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspectRatio, 0.1, 100);
  camera.zoom = window.innerWidth / CAMERA_ZOOM_FACTOR;
  camera.updateProjectionMatrix();
  const listener = new THREE.AudioListener();
  camera.add(listener);
  const audioLoaders = Array(LINE_COUNT)
    .fill(null)
    .map(() =>
      Array(LINE_COUNT)
        .fill(null)
        .map(() => new THREE.AudioLoader())
    );
  const putStoneSounds = Array(LINE_COUNT)
    .fill(null)
    .map(() =>
      Array(LINE_COUNT)
        .fill(null)
        .map(() => new THREE.Audio(listener))
    );
  audioLoaders.forEach((row, rowIndex) => {
    row.forEach((audioLoader, columnIndex) => {
      audioLoader.load("sounds/put_stone.mp3", (buffer) => {
        putStoneSounds[rowIndex][columnIndex].setBuffer(buffer);
        putStoneSounds[rowIndex][columnIndex].setLoop(false);
        putStoneSounds[rowIndex][columnIndex].setVolume(1);
      });
    });
  });
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // board
  const { tiles, board } = createBoard();
  scene.add(board);

  // initial disc
  const discs = setUpDiscs(scene);

  // board base
  const boardBase = createBoardBase();
  scene.add(boardBase);

  // setup camera and lights
  camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
  camera.lookAt(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z);
  const pointLight = new THREE.PointLight(
    LIGHT_COLOR,
    POINT_LIGHT_INTENSITY,
    POINT_LIGHT_DISTANCE
  );
  pointLight.position.set(
    POINT_LIGHT_POSITION.x,
    POINT_LIGHT_POSITION.y,
    POINT_LIGHT_POSITION.z
  );
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(
    LIGHT_COLOR,
    AMBIENT_LIGHT_INTENSITY
  );
  scene.add(ambientLight);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  return { scene, camera, putStoneSounds, renderer, tiles, discs };
};
