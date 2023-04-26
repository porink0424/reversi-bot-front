/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_putresult_free(a: number): void;
export function __wbg_get_putresult_board(a: number): number;
export function __wbg_set_putresult_board(a: number, b: number): void;
export function __wbg_get_putresult_reversed_places(a: number): number;
export function __wbg_set_putresult_reversed_places(a: number, b: number): void;
export function put(a: number, b: number): number;
export function has_game_ended(a: number): number;
export function __wbg_board_free(a: number): void;
export function __wbg_get_board_black_stones(a: number): number;
export function __wbg_set_board_black_stones(a: number, b: number): void;
export function __wbg_get_board_white_stones(a: number): number;
export function __wbg_set_board_white_stones(a: number, b: number): void;
export function __wbg_get_board_put_stones_count(a: number): number;
export function __wbg_set_board_put_stones_count(a: number, b: number): void;
export function __wbg_get_board_current_color(a: number): number;
export function __wbg_set_board_current_color(a: number, b: number): void;
export function board_new(): number;
export function board_set(a: number, b: number, c: number, d: number, e: number): void;
export function calc_legal_places(a: number): number;
export function decide_place(a: number, b: number): number;
