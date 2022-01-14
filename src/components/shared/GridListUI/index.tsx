import React, { useState, createRef } from 'react';

import GridCellItem from './grid-cell';
import styled from 'styled-components';

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const withinBounds = (lowerBound: number, upperBound: number) => {
  return (value: number) => {
    if (value < lowerBound) return lowerBound;
    if (value > upperBound) return upperBound;
    return value;
  };
};

interface UIProps {
  items: any;
  childrenNode: (item: any, index: number) => React.ReactNode;
}

const GridListUI = (props: UIProps) => {
  const [activeCellInd, setActiveCellInd] = useState(0);
  const grid = createRef<HTMLDivElement>();

  const getRowLength = () => {
    const gridWidth = grid.current?.offsetWidth;
    const cellWidth = grid.current?.querySelector('span')?.offsetWidth;
    if (gridWidth && cellWidth) {
      return Math.floor(gridWidth / cellWidth);
    }
    return 0;
  };

  const handleCellClick = (index: number) => {
    setActiveCellInd(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const rowLength = getRowLength();
    const withinCellIndices = withinBounds(0, props.items.length - 1);
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        break;
      case 'ArrowLeft':
        setActiveCellInd(withinCellIndices(activeCellInd - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveCellInd(withinCellIndices(activeCellInd - rowLength));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveCellInd(withinCellIndices(activeCellInd + rowLength));
        break;
      case 'Home':
        e.preventDefault();
        setActiveCellInd(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveCellInd(props.items.length - 1);
        break;
      default:
    }
  };

  return (
    <div role="grid" ref={grid} onKeyDown={e => handleKeyDown(e)}>
      <StyledRow role="row">
        {props.items?.map((item: any, index: number) => (
          <GridCellItem
            key={index}
            index={index}
            role="grid-cell"
            isActiveCell={index === activeCellInd}
            childrenNode={() => props.childrenNode(item, index)}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </StyledRow>
    </div>
  );
};

export default GridListUI;
