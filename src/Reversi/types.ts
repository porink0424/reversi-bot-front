import { COLOR, GAME_STATE } from "./constants";

export type ReversiPosition = [number, number];
export type Color = (typeof COLOR)[keyof typeof COLOR];
export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];
