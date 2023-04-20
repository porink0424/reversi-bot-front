import React from "react";
import * as THREE from "three";
import { createBoard } from "./Board";
import { createDisc } from "./Disc";
import { COLOR } from "./constants";
import { createBoardBase } from "./BoardBase";

const setUpReversi = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
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
  camera.position.z = 8;
  camera.position.y = -6;
  camera.position.x = 0;
  camera.lookAt(scene.position);
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 0, 7);
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
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
