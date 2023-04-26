// common
export const LINE_COUNT = 8;

// state
export const GAME_STATE = {
  START: "start",
  CHOOSE_COLOR: "chooseColor",
  INITIALIZE_BOARD: "initializeBoard",
  CHECK: "check",
  PASS: "pass",
  WAIT_FOR_PLAYER: "waitForPlayer",
  UNDO: "undo",
  THINK: "think",
  REVERSE_ANIMATION: "reverseAnimation",
  SHOW_RESULT: "showResult",
  CONTINUE: "continue",
};

// size in three.js
export const CELL_SIZE = 1;
export const BOARD_SIZE = CELL_SIZE * LINE_COUNT;
export const TILE_SIZE = 0.9;
export const TILE_THICKNESS = 0.1;
export const SEPARATOR_WIDTH = 0.08;
export const SEPARATOR_LENGTH = BOARD_SIZE + 0.05;
export const DISC_RADIUS = 0.4;
export const DISC_THICKNESS = 0.1;
export const BOARD_BASE_SIZE = BOARD_SIZE + 1;
export const BOARD_BASE_HEIGHT = 1;

// color in three.js
export const TILE_COLOR = 0x228b22;
export const TILE_SHINE_COLOR = 0xccff66;
export const SEPARATOR_COLOR = 0xffffff;
export const DISC_WHITE_COLOR = 0xffffff;
export const DISC_BLACK_COLOR = 0x000000;

// z position in three.js
export const TILE_Z = -0.1;
export const BOARD_BASE_Z = -0.65;

// camera in three.js
export const CAMERA_FOV = 80;
export const CAMERA_POSITION = {
  x: 0,
  y: -4,
  z: 8,
};
export const CAMERA_LOOK_AT = {
  // decide so that the board is in the center of the screen
  x: 0,
  y: -1,
  z: 0,
};
export const CAMERA_ZOOM_FACTOR = 1200; // change when we want to change the size of the board

// light in three.js
export const LIGHT_COLOR = 0xffffff;
export const POINT_LIGHT_POSITION = {
  x: 0,
  y: 0,
  z: 7,
};
export const POINT_LIGHT_INTENSITY = 1;
export const POINT_LIGHT_DISTANCE = 100;
export const AMBIENT_LIGHT_INTENSITY = 0.4;

// animation
export const REVERSE_DISC_MAX_FRAME_COUNT = 11;
export const REVERSE_DUSC_DELAY_MS = 100;
export const BOT_THINKING_DELAY_MS = 200;
