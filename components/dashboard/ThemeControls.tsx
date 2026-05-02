'use client';

import { useMemo } from 'react';
import type { ControlDef } from '@/themes/types';

type Props = {
  controls: ControlDef[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
};

export function ThemeControls({ controls, values, onChange, onReset }: Props) {
  const groups = useMemo(() => {
    const map: Record<string, ControlDef[]> = {};
    for (const c of controls) {
      const g = c.group || 'Ajustes';
      if (!map[g]) map[g] = [];
      map[g].push(c);
    }
    return map;
  }, [controls]);

  if (controls.length === 0) {
    return <p className="text-xs text-black/60">Este tema nao possui controles avancados.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/60 mb-2">{group}</h4>
          <div className="flex flex-col gap-4">
            {items.map(c => (
              <Control key={c.key} def={c} value={values[c.key] ?? (c as any).default} onChange={(v) => onChange(c.key, v)} />
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={onReset}
        className="self-start text-xs font-bold uppercase tracking-widest underline underline-offset-4 text-black/70 hover:text-black"
      >
        Restaurar padroes do tema
      </button>
    </div>
  );
}

function Control({ def, value, onChange }: { def: ControlDef; value: any; onChange: (v: any) => void }) {
  if (def.type === 'slider') {
    return (
      <label className="block">
        <div className="flex items-center justify-between text-xs font-bold mb-1">
          <span>{def.label}</span>
          <span className="tabular-nums text-black/70">{value}{def.suffix || ''}</span>
        </div>
        <input
          type="range"
          min={def.min}
          max={def.max}
          step={def.step || 1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-black"
        />
      </label>
    );
  }

  if (def.type === 'toggle') {
    return (
      <label className="flex items-center justify-between text-sm font-bold cursor-pointer">
        <span>{def.label}</span>
        <span
          onClick={() => onChange(!value)}
          role="switch"
          aria-checked={!!value}
          className={`relative w-12 h-6 brutal-border transition-colors ${value ? 'bg-bioyellow' : 'bg-white'}`}
        >
          <span
            className={`absolute top-0 left-0 w-5 h-5 m-0.5 bg-black transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </span>
      </label>
    );
  }

  if (def.type === 'select') {
    return (
      <label className="block text-xs font-bold">
        <div className="mb-1">{def.label}</div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full brutal-input py-2 text-sm bg-white"
        >
          {def.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
    );
  }

  if (def.type === 'radio') {
    return (
      <div className="text-xs font-bold">
        <div className="mb-2">{def.label}</div>
        <div className="grid grid-cols-3 gap-2">
          {def.options.map(o => (
            <button
              key={o.value}
              onClick={() => onChange(o.value)}
              className={`brutal-btn px-2 py-2 text-xs ${value === o.value ? 'bg-bioyellow' : 'bg-white'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (def.type === 'color') {
    return (
      <div className="text-xs font-bold">
        <div className="mb-2">{def.label}</div>
        <div className="flex flex-wrap gap-2">
          {def.palette.map(c => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`w-8 h-8 brutal-border ${value === c ? 'brutal-shadow' : ''}`}
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
