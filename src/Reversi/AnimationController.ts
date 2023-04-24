import { setUpReversi } from "./Setup";
import * as THREE from "three";
import { TILE_COLOR, TILE_SHINE_COLOR } from "./constants";

export class AnimationController {
  constructor() {
    /*
     * set up reversi UI
     */
    const { scene, camera, tiles } = setUpReversi();

    /*
     * flags that control UI
     */
    let shineHoveredTile = true;
    let legalPlaces: [number, number][] = [
      [3, 2],
      [2, 3],
      [5, 4],
      [4, 5],
    ];

    /*
     * make tiles shine when hovered
     */
    const body = document.getElementsByTagName("body")[0];
    let hoveredTile: THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshPhongMaterial
    > | null = null;
    document.addEventListener("mousemove", (event: MouseEvent) => {
      const resetTileColor = () => {
        if (hoveredTile) {
          hoveredTile.material.color = new THREE.Color(TILE_COLOR);
        }
      };
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
        if (intersectedMeshName && intersectedMeshName.slice(0, 4) === "tile") {
          const tileX = parseInt(intersectedMeshName[5]);
          const tileY = parseInt(intersectedMeshName[7]);
          if (
            legalPlaces.some(
              (place) => place[0] === tileX && place[1] === tileY
            )
          ) {
            resetTileColor();
            hoveredTile = tiles[tileX][tileY];
            hoveredTile.material.color = new THREE.Color(TILE_SHINE_COLOR);
            body.style.cursor = "pointer";
          }
        } else {
          resetTileColor();
          hoveredTile = null;
          body.style.cursor = "default";
        }
      } else if (hoveredTile) {
        // if shineHoveredTile is false although hoveredTile exists, reset hoveredTile
        resetTileColor();
        hoveredTile = null;
        body.style.cursor = "default";
      }
    });
  }
}
