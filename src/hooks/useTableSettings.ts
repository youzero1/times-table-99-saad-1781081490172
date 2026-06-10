import { useState } from 'react';
import type { TableSettings } from '@/types';

const DEFAULT_SETTINGS: TableSettings = {
  size: 10,
  showHeaders: true,
  highlightMode: 'both',
  colorScheme: 'indigo',
  fontSize: 'sm',
  showDiagonal: true,
};

export function useTableSettings(): {
  settings: TableSettings;
  updateSettings: (patch: Partial<TableSettings>) => void;
  resetSettings: () => void;
} {
  const [settings, setSettings] = useState<TableSettings>(DEFAULT_SETTINGS);

  function updateSettings(patch: Partial<TableSettings>) {
    setSettings(prev => ({ ...prev, ...patch }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  return { settings, updateSettings, resetSettings };
}
