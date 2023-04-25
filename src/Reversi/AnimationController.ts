import { setUpDiscs, setUpReversi } from "./Setup";
import * as THREE from "three";
import {
  REVERSE_DUSC_DELAY_MS,
  TILE_COLOR,
  TILE_SHINE_COLOR,
} from "./constants";
import { createDisc, reverseDisc } from "./Disc";
import { COLOR } from "../pkg/reversi_bot";
import { ReversiPosition } from "./types";

export class AnimationController {
  /*
   * varialbles that control UI
   */
  private shineHoveredTile: boolean = false;
  private legalPlaces: ReversiPosition[] = [];
  private onLegalPlaceClicked: ((x: number, y: number) => void) | null = null;
  private scene!: THREE.Scene;
  private discs: (THREE.Object3D<THREE.Event> | null)[][] = [];
  public setShineHoveredTile = (shineHoveredTile: boolean) => {
    this.shineHoveredTile = shineHoveredTile;
  };
  public setLegalPlaces = (legalPlaces: ReversiPosition[]) => {
    this.legalPlaces = legalPlaces;
  };
  public setOnLegalPlaceClicked = (
    onLegalPlaceClicked: ((x: number, y: number) => void) | null
  ) => {
    this.onLegalPlaceClicked = onLegalPlaceClicked;
  };
  public reverseDiscs = (places: ReversiPosition[], onEnd: () => void) => {
    let animationEndCount = 0;
    places.forEach((place, index) => {
      setTimeout(() => {
        reverseDisc(place, this.discs, () => {
          animationEndCount += 1;
          if (animationEndCount === places.length) {
            onEnd();
          }
        });
      }, index * REVERSE_DUSC_DELAY_MS);
    });
  };
  public putDisc = (place: ReversiPosition, color: COLOR | null) => {
    this.scene.add(createDisc(place, color ?? COLOR.BLACK, this.discs));
  };
  public reset = () => {
    this.discs.forEach((row) => {
      row.forEach((disc) => {
        if (disc) this.scene.remove(disc);
      });
    });
    this.discs = setUpDiscs(this.scene);
  };

  constructor() {
    /*
     * set up reversi UI
     */
    const { scene, camera, tiles, discs } = setUpReversi();
    this.discs = discs;
    this.scene = scene;

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
      if (this.shineHoveredTile) {
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
            this.legalPlaces.some(
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
    document.addEventListener("click", () => {
      if (hoveredTile) {
        const tileX = parseInt(hoveredTile.name[5]);
        const tileY = parseInt(hoveredTile.name[7]);
        this.onLegalPlaceClicked?.(tileX, tileY);
      }
    });
  }
}
