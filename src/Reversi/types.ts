import { COLOR } from "../pkg/reversi_bot";
import { GAME_STATE } from "./constants";

export type ReversiPosition = [number, number];
export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];
export type Result = {
  black: number;
  white: number;
  winner: COLOR | "draw";
};
