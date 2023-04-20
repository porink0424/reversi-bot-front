import { COLOR } from "./constants";

export type ReversiPosition = [number, number];
export type Color = typeof COLOR[keyof typeof COLOR];
