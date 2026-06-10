import { useCallback } from 'react';
import clsx from 'clsx';
import type { TableSettings } from '@/types';
import { COLOR_SCHEMES, getCellClass } from '@/lib/utils';
import { useHover } from '@/hooks/useHover';

type MultiplicationTableProps = {
  settings: TableSettings;
};

const FONT_SIZE_MAP = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
};

const CELL_SIZE_MAP = {
  xs: 'w-8 h-7',
  sm: 'w-10 h-9',
  base: 'w-12 h-11',
};

export default function MultiplicationTable({ settings }: MultiplicationTableProps) {
  const { size, showHeaders, highlightMode, colorScheme, fontSize, showDiagonal } = settings;
  const { hoveredRow, hoveredCol, setHovered, clearHover } = useHover();
  const colors = COLOR_SCHEMES[colorScheme];
  const fontClass = FONT_SIZE_MAP[fontSize];
  const cellSizeClass = CELL_SIZE_MAP[fontSize];

  const handleMouseEnter = useCallback((row: number, col: number) => {
    setHovered(row, col);
  }, [setHovered]);

  const rows = Array.from({ length: size }, (_, i) => i + 1);
  const cols = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <div className="overflow-auto rounded-xl border border-slate-700/50 shadow-2xl">
      <table className="border-collapse" onMouseLeave={clearHover}>
        <tbody>
          {/* Header row */}
          {showHeaders && (
            <tr>
              {/* Corner cell */}
              <td className={clsx(
                'border border-slate-700/30 text-center font-bold',
                fontClass,
                cellSizeClass,
                'bg-slate-900 text-slate-500'
              )}>
                ×
              </td>
              {cols.map(col => (
                <td
                  key={col}
                  className={clsx(
                    'border border-slate-700/30 text-center font-bold sticky top-0',
                    fontClass,
                    cellSizeClass,
                    colors.header,
                    colors.headerText,
                    hoveredCol === col ? 'brightness-125' : ''
                  )}
                >
                  {col}
                </td>
              ))}
            </tr>
          )}

          {/* Data rows */}
          {rows.map(row => (
            <tr key={row}>
              {/* Row header */}
              {showHeaders && (
                <td
                  className={clsx(
                    'border border-slate-700/30 text-center font-bold sticky left-0',
                    fontClass,
                    cellSizeClass,
                    colors.header,
                    colors.headerText,
                    hoveredRow === row ? 'brightness-125' : ''
                  )}
                >
                  {row}
                </td>
              )}

              {/* Data cells */}
              {cols.map(col => {
                const value = row * col;
                const cellClass = getCellClass(
                  row, col,
                  hoveredRow, hoveredCol,
                  colorScheme,
                  showDiagonal,
                  highlightMode
                );
                return (
                  <td
                    key={col}
                    className={clsx(cellClass, fontClass, cellSizeClass)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
