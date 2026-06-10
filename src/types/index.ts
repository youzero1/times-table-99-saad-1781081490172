export type HighlightMode = 'none' | 'row' | 'col' | 'both';

export type ColorScheme = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan';

export type TableSettings = {
  size: number;
  showHeaders: boolean;
  highlightMode: HighlightMode;
  colorScheme: ColorScheme;
  fontSize: 'xs' | 'sm' | 'base';
  showDiagonal: boolean;
};
