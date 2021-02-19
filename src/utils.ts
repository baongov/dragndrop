import _get from "lodash/get";

import { H_MIN, H_MAX, S, L_MIN, L_MAX, BLOCK_SIZE } from "./config";

export type Position = [number, number];
export type Color = [number, number, number];
export interface Block {
  color: Color;
  position: Position;
}

const EMPTY_POINT: Position = [-1, -1];
export const generateColorMatrix = (size: number, pos: Position): Block[][] => {
  const variantH = parseFloat(((H_MAX - H_MIN) / (size - 1)).toFixed(3));
  const variantL = parseFloat(((L_MAX - L_MIN) / (size - 1)).toFixed(3));
  const [posX, posY] = pos;
  let result: Block[][] = [];

  for (let row = 0; row < size; row++) {
    const h = H_MIN + variantH * row;
    const x = posX + BLOCK_SIZE * row;
    result[row] = [];

    for (let column = 0; column < size; column++) {
      const l = L_MIN + variantL * column;
      const y = posY + BLOCK_SIZE * column;

      result[row][column] = {
        color: [h, S, l],
        position: [x, y],
      };
    }
  }

  return result;
};

export const isEqual = (id1: Position, id2: Position): boolean =>
  id1[0] === id2[0] && id1[1] === id2[1];

export const getBlockColor = (
  board: Block[][],
  [x, y]: Position,
  defaultColor: Color
): Color => _get(board, `[${x}][${y}].color`, defaultColor);

export const swapBlock = (
  board: Block[][],
  block1: Position,
  block2: Position
): Block[][] =>
  board.map((row, i) =>
    row.map((column, j) =>
      isEqual([i, j], block1)
        ? { ...column, color: getBlockColor(board, block2, column.color) }
        : isEqual([i, j], block2)
        ? { ...column, color: getBlockColor(board, block1, column.color) }
        : column
    )
  );

export const stringToPosition = (str: string): Position => {
  const ele = str.split(",");
  return ele[0] && ele[1] ? [Number(ele[0]), Number(ele[1])] : EMPTY_POINT;
};
