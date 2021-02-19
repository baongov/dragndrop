import React, { useState } from "react";
import styled from "styled-components";
import _get from "lodash/get";

import {
  generateColorMatrix,
  isEqual,
  swapBlock,
  stringToPosition,
  Position,
  Block,
} from "./utils";
import { BLOCK_SIZE } from "./config";

const EMPTY_POINT: Position = [-1, -1];

interface ColorBlockProps {
  h: number;
  s: number;
  l: number;
  x: number;
  y: number;
  isSelected: boolean;
  isDraggerOn: boolean;
}

const getBlockStyleByState = (props: ColorBlockProps) => {
  const { isDraggerOn, isSelected } = props;
  if (isDraggerOn) {
    return `
      border: 3px solid yellow;
      z-index: 200;
    `;
  }

  if (isSelected) {
    return `
      border: 3px solid black;
      z-index: 150;
    `;
  }

  return `
    border: 1px solid white;
    z-index: 0;
  `;
};

const ColorBlock = styled.div`
  box-sizing: border-box;
  width: ${BLOCK_SIZE}px;
  height: ${BLOCK_SIZE}px;
  background-color: ${({ h, s, l }: ColorBlockProps) =>
    `hsl(${h}, ${s}%, ${l}%)`};
  top: ${({ x }) => x}px;
  left: ${({ y }) => y}px;
  position: fixed;
  ${(props) => getBlockStyleByState(props)}

  &:hover {
    border: 3px solid brown;
    z-index: 100;
  }
`;

const Container = styled.div`
  padding-left: 100px;
`;

interface AppProps {
  size: number;
}
const App = ({ size }: AppProps) => {
  const [board, setBoard] = useState<Block[][]>(
    generateColorMatrix(size, [100, 100])
  );
  const [selectedBlock, setSelectedBlock] = useState<Position>(EMPTY_POINT);

  // drap and drop
  const [draggedBlock, setDraggedBlock] = useState<Position>(EMPTY_POINT);
  const [hoveredBlock, setHoveredBlock] = useState<Position>(EMPTY_POINT);

  const onDragStart = (id: Position) => {
    setDraggedBlock(id);
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
  };

  const onDrop = () => {
    setBoard(swapBlock(board, draggedBlock, hoveredBlock));
  };

  const onDragEnter = (event: any) => {
    const position: string = _get(event, "currentTarget.dataset.position");
    setHoveredBlock(stringToPosition(position));
  };

  const onDragEnd = () => {
    setDraggedBlock(EMPTY_POINT);
    setHoveredBlock(EMPTY_POINT);
  };

  return (
    <Container className="App">
      <div>Selected position: {JSON.stringify(selectedBlock)}</div>
      <div>Hovered position: {JSON.stringify(hoveredBlock)}</div>
      <div>Dragged position: {JSON.stringify(draggedBlock)}</div>
      <div>
        {board.map((row, i) => (
          <div key={i}>
            {row.map((column, j) => {
              const id: Position = [i, j];
              const { color, position } = column;
              const [h, s, l] = color;
              const [x, y] = position;
              const isSelected = isEqual(id, selectedBlock);

              return (
                <ColorBlock
                  key={j}
                  // drap and drop
                  draggable
                  data-position={id}
                  onDragStart={() => onDragStart(id)}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragEnter={onDragEnter}
                  onDragEnd={onDragEnd}
                  // style
                  h={h}
                  s={s}
                  l={l}
                  x={x}
                  y={y}
                  // others
                  isSelected={isSelected}
                  isDraggerOn={isEqual(id, hoveredBlock)}
                  onClick={() => setSelectedBlock(id)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default App;
