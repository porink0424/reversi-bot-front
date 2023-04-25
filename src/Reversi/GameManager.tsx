import React, { useEffect, useRef, useState } from "react";
import { AnimationController } from "./AnimationController";
import { GameState, Result, ReversiPosition } from "./types";
import { BOT_THINKING_DELAY_MS, GAME_STATE } from "./constants";
import StartModal from "./UI/StartModal";
import init, {
  Board,
  calc_legal_places,
  has_game_ended,
  put,
  decide_place,
} from "../pkg/reversi_bot";
import { COLOR } from "../pkg/reversi_bot";
import HeadMessageBox from "./UI/HeadMessageBox";
import { bigIntToPlaces, countOnesInBigInt, placeToBigInt } from "./utils";

function GameManager({
  animationController,
}: {
  animationController: React.MutableRefObject<AnimationController | undefined>;
}) {
  const [gameState, setGameState] = useState<GameState>(GAME_STATE.START);
  const [result, setResult] = useState<Result | null>(null);
  const [playerColor, setPlayerColor] = useState<COLOR | null>(COLOR.BLACK);

  const previousGameState = useRef<GameState | null>(null);
  const decidedPlace = useRef<ReversiPosition>(null!);
  const board = useRef<Board | null>(null);
  useEffect(() => {
    if (gameState !== previousGameState.current) {
      switch (gameState) {
        case GAME_STATE.INITIALIZE_BOARD: {
          animationController.current?.reset();
          init().then(() => {
            // initialize board
            board.current = new Board();
            board.current.set(
              BigInt(0x0000000810000000),
              BigInt(0x0000001008000000),
              4,
              COLOR.BLACK
            );

            setGameState(GAME_STATE.CHECK);
          });
          break;
        }
        case GAME_STATE.CHECK: {
          if (!board.current) {
            throw new Error("board is not initialized");
          }

          if (has_game_ended(board.current)) {
            const black = countOnesInBigInt(board.current.black_stones);
            const white = countOnesInBigInt(board.current.white_stones);
            setResult({
              black,
              white,
              winner:
                black > white
                  ? COLOR.BLACK
                  : white > black
                  ? COLOR.WHITE
                  : "draw",
            });
            setGameState(GAME_STATE.SHOW_RESULT);
            return;
          }

          const legal_places = calc_legal_places(board.current);
          if (legal_places === BigInt(0)) {
            board.current.current_color =
              board.current.current_color === COLOR.BLACK
                ? COLOR.WHITE
                : COLOR.BLACK;
            setGameState(GAME_STATE.PASS);
            return;
          }

          if (board.current.current_color === playerColor) {
            setGameState(GAME_STATE.WAIT_FOR_PLAYER);
          } else {
            setGameState(GAME_STATE.THINK);
          }
          break;
        }
        case GAME_STATE.WAIT_FOR_PLAYER: {
          if (!board.current) {
            throw new Error("board is not initialized");
          }

          // // for debug, decide the first legal place automatically
          // if (process.env.REACT_APP_ENVIRONMENT === "dev") {
          //   const legal_places = calc_legal_places(board.current);
          //   decidedPlace.current = bigIntToPlaces(legal_places)[0];
          //   setGameState(GAME_STATE.REVERSE_ANIMATION);
          //   return;
          // }

          animationController.current?.setLegalPlaces(
            bigIntToPlaces(calc_legal_places(board.current))
          );
          animationController.current?.setShineHoveredTile(true);
          animationController.current?.setOnLegalPlaceClicked((x, y) => {
            decidedPlace.current = [x, y];
            setGameState(GAME_STATE.REVERSE_ANIMATION);
          });
          break;
        }
        case GAME_STATE.THINK: {
          if (!board.current) {
            throw new Error("board is not initialized");
          }
          decidedPlace.current = bigIntToPlaces(decide_place(board.current))[0];
          setTimeout(() => {
            setGameState(GAME_STATE.REVERSE_ANIMATION);
          }, BOT_THINKING_DELAY_MS);
          break;
        }
        case GAME_STATE.REVERSE_ANIMATION: {
          if (!board.current) {
            throw new Error("board is not initialized");
          }
          animationController.current?.putDisc(
            decidedPlace.current,
            board.current.current_color
          );
          animationController.current?.setShineHoveredTile(false);
          animationController.current?.setLegalPlaces([]);
          animationController.current?.setOnLegalPlaceClicked(null);
          const putResult = put(
            board.current,
            placeToBigInt(decidedPlace.current)
          );
          animationController.current?.reverseDiscs(
            bigIntToPlaces(putResult.reversed_places),
            () => {
              setGameState(GAME_STATE.CHECK);
            }
          );
          board.current = putResult.board;

          break;
        }
        default:
          break;
      }
      previousGameState.current = gameState;
    }
  }, [gameState]);

  return (
    <div>
      <StartModal
        gameState={gameState}
        setGameState={setGameState}
        setPlayerColor={setPlayerColor}
      />
      <HeadMessageBox
        gameState={gameState}
        setGameState={setGameState}
        result={result}
        playerColor={playerColor}
      />
    </div>
  );
}

export default GameManager;
