import { useState } from 'react';

export function useHover(): {
  hoveredRow: number | null;
  hoveredCol: number | null;
  setHovered: (row: number | null, col: number | null) => void;
  clearHover: () => void;
} {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  function setHovered(row: number | null, col: number | null) {
    setHoveredRow(row);
    setHoveredCol(col);
  }

  function clearHover() {
    setHoveredRow(null);
    setHoveredCol(null);
  }

  return { hoveredRow, hoveredCol, setHovered, clearHover };
}
