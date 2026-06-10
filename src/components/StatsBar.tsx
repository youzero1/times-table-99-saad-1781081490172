import type { TableSettings } from '@/types';

type StatsBarProps = {
  settings: TableSettings;
};

export default function StatsBar({ settings }: StatsBarProps) {
  const { size } = settings;
  const total = size * size;
  const max = size * size;
  const min = 1;
  const uniqueCount = new Set(
    Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => (i + 1) * (j + 1))
    ).flat()
  ).size;

  const stats = [
    { label: 'Table Size', value: `${size} × ${size}` },
    { label: 'Total Cells', value: total.toLocaleString() },
    { label: 'Min Value', value: min },
    { label: 'Max Value', value: max.toLocaleString() },
    { label: 'Unique Values', value: uniqueCount.toLocaleString() },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-2 flex flex-col items-center min-w-[90px]"
        >
          <span className="text-indigo-400 font-bold text-lg leading-tight">{stat.value}</span>
          <span className="text-slate-400 text-xs mt-0.5">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
