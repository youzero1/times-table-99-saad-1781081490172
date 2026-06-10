import clsx from 'clsx';
import { Settings, RotateCcw, X } from 'lucide-react';
import type { TableSettings, ColorScheme } from '@/types';
import { COLOR_SCHEMES } from '@/lib/utils';

type SettingsPanelProps = {
  settings: TableSettings;
  onUpdate: (patch: Partial<TableSettings>) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const COLOR_NAMES: ColorScheme[] = ['indigo', 'emerald', 'rose', 'amber', 'cyan'];

export default function SettingsPanel({ settings, onUpdate, onReset, isOpen, onClose }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 h-full w-80 bg-slate-900 border-l border-slate-700 shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 text-white">
            <Settings size={18} />
            <span className="font-semibold text-lg">Settings</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6 flex-1">
          {/* Table Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Table Size: <span className="text-indigo-400 font-bold">{settings.size} × {settings.size}</span>
            </label>
            <input
              type="range"
              min={2}
              max={99}
              value={settings.size}
              onChange={(e: any) => onUpdate({ size: Number(e.target.value) })}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>2</span>
              <span>99</span>
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Color Scheme</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_NAMES.map(name => (
                <button
                  key={name}
                  onClick={() => onUpdate({ colorScheme: name })}
                  className={clsx(
                    'px-3 py-1.5 rounded text-xs font-medium capitalize transition-all border',
                    COLOR_SCHEMES[name].header,
                    COLOR_SCHEMES[name].headerText,
                    settings.colorScheme === name
                      ? 'ring-2 ring-white/60 border-white/30 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Highlight Mode */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Hover Highlight</label>
            <div className="flex flex-col gap-1">
              {(['none', 'row', 'col', 'both'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => onUpdate({ highlightMode: mode })}
                  className={clsx(
                    'px-3 py-2 rounded text-sm font-medium capitalize text-left transition-all',
                    settings.highlightMode === mode
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  )}
                >
                  {mode === 'none' ? 'No highlight' :
                   mode === 'row' ? 'Highlight row' :
                   mode === 'col' ? 'Highlight column' :
                   'Highlight row & column'}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Font Size</label>
            <div className="flex gap-2">
              {(['xs', 'sm', 'base'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => onUpdate({ fontSize: size })}
                  className={clsx(
                    'flex-1 py-2 rounded text-sm font-medium transition-all',
                    settings.fontSize === size
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  )}
                >
                  {size === 'xs' ? 'Small' : size === 'sm' ? 'Medium' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-slate-300">Show Row/Col Headers</span>
              <div
                onClick={() => onUpdate({ showHeaders: !settings.showHeaders })}
                className={clsx(
                  'w-11 h-6 rounded-full transition-colors relative cursor-pointer',
                  settings.showHeaders ? 'bg-indigo-600' : 'bg-slate-700'
                )}
              >
                <div className={clsx(
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  settings.showHeaders ? 'translate-x-5.5' : 'translate-x-0.5'
                )} />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-slate-300">Highlight Diagonal</span>
              <div
                onClick={() => onUpdate({ showDiagonal: !settings.showDiagonal })}
                className={clsx(
                  'w-11 h-6 rounded-full transition-colors relative cursor-pointer',
                  settings.showDiagonal ? 'bg-indigo-600' : 'bg-slate-700'
                )}
              >
                <div className={clsx(
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  settings.showDiagonal ? 'translate-x-5.5' : 'translate-x-0.5'
                )} />
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-sm font-medium"
          >
            <RotateCcw size={15} />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
