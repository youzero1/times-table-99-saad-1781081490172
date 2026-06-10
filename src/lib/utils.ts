import clsx from 'clsx';
import type { ColorScheme } from '@/types';

export { clsx };

export const COLOR_SCHEMES: Record<ColorScheme, {
  header: string;
  headerText: string;
  highlight: string;
  diagonal: string;
  border: string;
  cellBase: string;
}> = {
  indigo: {
    header: 'bg-indigo-700',
    headerText: 'text-indigo-100',
    highlight: 'bg-indigo-900/70',
    diagonal: 'bg-indigo-600/40',
    border: 'border-indigo-900/40',
    cellBase: 'bg-slate-800/60',
  },
  emerald: {
    header: 'bg-emerald-700',
    headerText: 'text-emerald-100',
    highlight: 'bg-emerald-900/70',
    diagonal: 'bg-emerald-600/40',
    border: 'border-emerald-900/40',
    cellBase: 'bg-slate-800/60',
  },
  rose: {
    header: 'bg-rose-700',
    headerText: 'text-rose-100',
    highlight: 'bg-rose-900/70',
    diagonal: 'bg-rose-600/40',
    border: 'border-rose-900/40',
    cellBase: 'bg-slate-800/60',
  },
  amber: {
    header: 'bg-amber-700',
    headerText: 'text-amber-100',
    highlight: 'bg-amber-900/70',
    diagonal: 'bg-amber-600/40',
    border: 'border-amber-900/40',
    cellBase: 'bg-slate-800/60',
  },
  cyan: {
    header: 'bg-cyan-700',
    headerText: 'text-cyan-100',
    highlight: 'bg-cyan-900/70',
    diagonal: 'bg-cyan-600/40',
    border: 'border-cyan-900/40',
    cellBase: 'bg-slate-800/60',
  },
};

export function getCellClass(
  row: number,
  col: number,
  hoveredRow: number | null,
  hoveredCol: number | null,
  scheme: ColorScheme,
  showDiagonal: boolean,
  highlightMode: string
): string {
  const colors = COLOR_SCHEMES[scheme];
  const isRowHovered = hoveredRow === row;
  const isColHovered = hoveredCol === col;
  const isDiagonal = row === col;

  let highlighted = false;
  if (highlightMode === 'row' && isRowHovered) highlighted = true;
  if (highlightMode === 'col' && isColHovered) highlighted = true;
  if (highlightMode === 'both' && (isRowHovered || isColHovered)) highlighted = true;

  return clsx(
    'table-cell text-center font-mono border',
    colors.border,
    highlighted ? colors.highlight : colors.cellBase,
    showDiagonal && isDiagonal ? colors.diagonal : '',
    isRowHovered && isColHovered ? 'text-white font-bold ring-2 ring-white/30' : 'text-slate-200'
  );
}
