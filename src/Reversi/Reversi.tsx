import React from "react";
import { setUpReversi } from "./Setup";
import * as THREE from "three";
import { TILE_COLOR, TILE_SHINE_COLOR } from "./constants";

/*
 * set up reversi UI
 */
const { scene, camera, tiles } = setUpReversi();

/*
 * flags that control UI
 */
let shineHoveredTile = true;

/*
 * make tiles shine when hovered
 */
let hoveredTile: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial> | null =
  null;
document.addEventListener("mousemove", (event: MouseEvent) => {
  if (shineHoveredTile) {
    // get mouse position
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    // make raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // get intersections and make hoveredTile shine
    const intersects = raycaster.intersectObjects(scene.children);
    const intersectedMeshName = intersects[0]?.object.name;
    const resetTileColor = () => {
      if (hoveredTile) {
        hoveredTile.material.color = new THREE.Color(TILE_COLOR);
      }
    };
    if (intersectedMeshName && intersectedMeshName.slice(0, 4) === "tile") {
      resetTileColor();
      const tileX = parseInt(intersectedMeshName[5]);
      const tileY = parseInt(intersectedMeshName[7]);
      hoveredTile = tiles[tileX][tileY];
      hoveredTile.material.color = new THREE.Color(TILE_SHINE_COLOR);
    } else {
      resetTileColor();
      hoveredTile = null;
    }
  }
});

function Reversi() {
  return <div></div>;
}

export default Reversi;
