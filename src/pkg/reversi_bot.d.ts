/* tslint:disable */
/* eslint-disable */
/**
* @param {Board} board
* @returns {boolean}
*/
export function has_game_ended(board: Board): boolean;
/**
* @param {Board} board
* @param {bigint} place
* @returns {PutResult}
*/
export function put(board: Board, place: bigint): PutResult;
/**
* @param {Board} board
* @returns {bigint}
*/
export function calc_legal_places(board: Board): bigint;
/**
* @param {Board} board
* @param {number} prop_method
* @returns {bigint}
*/
export function decide_place(board: Board, prop_method: number): bigint;
/**
*/
export enum COLOR {
  BLACK = 0,
  WHITE = 1,
}
/**
*/
export enum EvalMethod {
  Random = 0,
  PointTable = 1,
  Normal = 2,
  Win = 3,
  Perfect = 4,
}
/**
*/
export class Board {
  free(): void;
/**
*/
  constructor();
/**
* @param {bigint} black_stones
* @param {bigint} white_stones
* @param {number} put_stones_count
* @param {number} current_color
*/
  set(black_stones: bigint, white_stones: bigint, put_stones_count: number, current_color: number): void;
/**
*/
  black_stones: bigint;
/**
*/
  current_color: number;
/**
*/
  put_stones_count: number;
/**
*/
  white_stones: bigint;
}
/**
*/
export class PutResult {
  free(): void;
/**
*/
  board: Board;
/**
*/
  reversed_places: bigint;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly has_game_ended: (a: number) => number;
  readonly __wbg_board_free: (a: number) => void;
  readonly __wbg_get_board_black_stones: (a: number) => number;
  readonly __wbg_set_board_black_stones: (a: number, b: number) => void;
  readonly __wbg_get_board_white_stones: (a: number) => number;
  readonly __wbg_set_board_white_stones: (a: number, b: number) => void;
  readonly __wbg_get_board_put_stones_count: (a: number) => number;
  readonly __wbg_set_board_put_stones_count: (a: number, b: number) => void;
  readonly __wbg_get_board_current_color: (a: number) => number;
  readonly __wbg_set_board_current_color: (a: number, b: number) => void;
  readonly board_new: () => number;
  readonly board_set: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_putresult_free: (a: number) => void;
  readonly __wbg_get_putresult_board: (a: number) => number;
  readonly __wbg_set_putresult_board: (a: number, b: number) => void;
  readonly __wbg_get_putresult_reversed_places: (a: number) => number;
  readonly __wbg_set_putresult_reversed_places: (a: number, b: number) => void;
  readonly put: (a: number, b: number) => number;
  readonly calc_legal_places: (a: number) => number;
  readonly decide_place: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
