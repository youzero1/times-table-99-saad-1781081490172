import { useState } from 'react';
import { Settings2, Hash } from 'lucide-react';
import MultiplicationTable from '@/components/MultiplicationTable';
import SettingsPanel from '@/components/SettingsPanel';
import StatsBar from '@/components/StatsBar';
import { useTableSettings } from '@/hooks/useTableSettings';

export default function TablePage() {
  const { settings, updateSettings, resetSettings } = useTableSettings();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f0f1a' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/50" style={{ backgroundColor: '#16213e' }}>
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg">
              <Hash size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">Table of 99</h1>
              <p className="text-slate-400 text-xs">Multiplication Table up to {settings.size} × {settings.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
              <span className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs">
                Hover a cell to highlight
              </span>
            </div>
            <button
              onClick={() => setPanelOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-sm font-medium shadow"
            >
              <Settings2 size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="border-b border-slate-700/30 py-3 px-4">
        <StatsBar settings={settings} />
      </div>

      {/* Table */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <MultiplicationTable settings={settings} />
      </main>

      {/* Quick size controls */}
      <footer className="border-t border-slate-700/30 py-3 px-4">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center gap-2 justify-center">
          <span className="text-slate-400 text-xs">Quick size:</span>
          {[5, 10, 12, 15, 20, 25, 50, 99].map(n => (
            <button
              key={n}
              onClick={() => updateSettings({ size: n })}
              className={
                `px-3 py-1 rounded text-xs font-medium transition-all border ${
                  settings.size === n
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                }`
              }
            >
              {n}×{n}
            </button>
          ))}
        </div>
      </footer>

      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        onUpdate={updateSettings}
        onReset={resetSettings}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
