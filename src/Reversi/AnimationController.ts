import { setUpDiscs, setUpReversi } from "./Setup";
import * as THREE from "three";
import {
  REVERSE_DUSC_DELAY_MS,
  TILE_COLOR,
  TILE_SHINE_COLOR,
} from "./constants";
import { createDisc, deleteDisc, reverseDisc } from "./Disc";
import { COLOR } from "../pkg/reversi_bot";
import { ReversiPosition } from "./types";

export class AnimationController {
  /*
   * varialbles that control UI
   */
  private shineHoveredTile: boolean = false;
  private legalPlaces: ReversiPosition[] = [];
  private hoveredTile: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshPhongMaterial
  > | null = null;
  private onLegalPlaceClicked: ((x: number, y: number) => void) | null = null;
  private scene!: THREE.Scene;
  private putStoneSounds!: THREE.Audio<GainNode>[][];
  private discs: (THREE.Object3D<THREE.Event> | null)[][] = [];
  private resetTileColor = () => {
    if (this.hoveredTile) {
      this.hoveredTile.material.color = new THREE.Color(TILE_COLOR);
    }
  };
  public setShineHoveredTile = (shineHoveredTile: boolean) => {
    this.shineHoveredTile = shineHoveredTile;
    this.resetTileColor();
    this.hoveredTile = null;
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
    places.forEach(([x, y], index) => {
      setTimeout(() => {
        reverseDisc([x, y], this.discs, () => {
          animationEndCount += 1;
          this.putStoneSounds[x][y].play();
          if (animationEndCount === places.length) {
            onEnd();
          }
        });
      }, (index + 1) * REVERSE_DUSC_DELAY_MS);
    });
  };
  public reverseDiscsWithoutAnimation = (places: ReversiPosition[]) => {
    places.forEach(([x, y]) => {
      const disc = this.discs[x][y];
      if (disc === null) throw new Error("disc is null");
      disc.rotation.x += Math.PI;
    });
  };
  public putDisc = ([x, y]: ReversiPosition, color: COLOR | null) => {
    this.scene.add(createDisc([x, y], color ?? COLOR.BLACK, this.discs));
    this.putStoneSounds[x][y].play();
  };
  public deleteDisc = (place: ReversiPosition) => {
    deleteDisc(place, this.discs, this.scene);
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
    const { scene, camera, tiles, discs, putStoneSounds, renderer } =
      setUpReversi();
    this.discs = discs;
    this.scene = scene;
    this.putStoneSounds = putStoneSounds;

    /*
     * make tiles shine when hovered
     */
    const body = document.getElementsByTagName("body")[0];
    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (this.shineHoveredTile) {
        // get mouse position
        const clientRect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          (event.offsetX / clientRect.width) * 2 - 1,
          -(event.offsetY / clientRect.height) * 2 + 1
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
            this.resetTileColor();
            this.hoveredTile = tiles[tileX][tileY];
            this.hoveredTile.material.color = new THREE.Color(TILE_SHINE_COLOR);
            body.style.cursor = "pointer";
          }
        } else {
          this.resetTileColor();
          this.hoveredTile = null;
          body.style.cursor = "default";
        }
      } else if (this.hoveredTile) {
        // if shineHoveredTile is false although hoveredTile exists, reset hoveredTile
        this.resetTileColor();
        this.hoveredTile = null;
        body.style.cursor = "default";
      }
    });
    document.addEventListener("click", () => {
      if (this.shineHoveredTile && this.hoveredTile) {
        const tileX = parseInt(this.hoveredTile.name[5]);
        const tileY = parseInt(this.hoveredTile.name[7]);
        this.onLegalPlaceClicked?.(tileX, tileY);
      }
    });
  }
}
