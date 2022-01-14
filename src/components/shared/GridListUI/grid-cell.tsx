import React, { useEffect, createRef } from 'react';

interface UIProps {
  key: number;
  role: string;
  childrenNode: () => React.ReactNode;
  index: number;
  isActiveCell: boolean;
  onClick: Function;
}

const GridCell = (props: UIProps) => {
  const cellSpan = createRef<HTMLSpanElement>();
  useEffect(() => {
    if (props.isActiveCell) {
      (cellSpan.current?.firstChild as HTMLSpanElement)?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isActiveCell]);

  return (
    <span role="cell" ref={cellSpan} onClick={() => props.onClick()}>
      {props.childrenNode()}
    </span>
  );
};

export default GridCell;
