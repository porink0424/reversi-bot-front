import React from "react";
import * as THREE from "three";
import { createBoard } from "./Board";
import { createDisc } from "./Disc";
import {
  AMBIENT_LIGHT_INTENSITY,
  CAMERA_LOOK_AT,
  CAMERA_POSITION,
  COLOR,
  LIGHT_COLOR,
  POINT_LIGHT_DISTANCE,
  POINT_LIGHT_INTENSITY,
  POINT_LIGHT_POSITION,
} from "./constants";
import { createBoardBase } from "./BoardBase";

const setUpReversi = () => {
  const scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 100);
  camera.zoom = window.innerWidth / 1200;
  camera.updateProjectionMatrix();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // board
  const board = createBoard();
  scene.add(board);

  // disc
  const disc1 = createDisc([3, 3], COLOR.BLACK);
  const disc2 = createDisc([3, 4], COLOR.WHITE);
  scene.add(disc1);
  scene.add(disc2);

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
};

setUpReversi();

function Reversi() {
  return <div></div>;
}

export default Reversi;
