'use client';

import { memo, type ReactNode } from 'react';
import { PhoneFrame } from './ThemeMockup';

function Shell({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  return <PhoneFrame overlay={overlay}>{children}</PhoneFrame>;
}

function NeonBase({ overlay }: { overlay?: ReactNode }) {
  return (
    <Shell overlay={overlay}>
      <div
        className="w-full h-full overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 30% 15%, #0ea5e9 0%, transparent 45%), radial-gradient(circle at 75% 85%, #f43f5e 0%, transparent 45%), #050816',
        }}
        aria-hidden
      >
        <div className="flex flex-col items-center pt-10 px-5">
          <div
            className="w-16 h-16 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #f43f5e)',
              boxShadow: '0 0 24px #06b6d4',
            }}
          />
          <div className="mt-3 h-3 w-24 rounded bg-white/90" />
          <div className="mt-1 h-2 w-16 rounded bg-white/40" />
          <div className="mt-3 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px #22d3ee' }} />
            <div className="w-3 h-3 rounded-full bg-pink-400" style={{ boxShadow: '0 0 8px #f472b6' }} />
            <div className="w-3 h-3 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px #34d399' }} />
          </div>
          <div className="mt-6 w-full space-y-3">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="h-9 rounded-xl border border-white/10"
                style={{
                  background: 'linear-gradient(90deg, rgba(6,182,212,0.28), rgba(244,63,94,0.28))',
                  boxShadow: '0 0 14px rgba(6,182,212,0.35)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function EditorialBase({ overlay }: { overlay?: ReactNode }) {
  return (
    <Shell overlay={overlay}>
      <div className="w-full h-full overflow-hidden" style={{ background: '#F5F1EA' }} aria-hidden>
        <div className="px-5 pt-8">
          <div className="text-[9px] tracking-[0.3em] uppercase text-neutral-500">Issue 01 &middot; 2026</div>
          <div
            className="mt-2 leading-none text-neutral-900"
            style={{ fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: 26 }}
          >
            The Quiet
            <br />
            Edition
          </div>
          <div className="mt-3 h-px bg-neutral-900/70" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <div className="h-20 bg-neutral-300 rounded" />
              <div className="mt-2 h-2 w-full bg-neutral-400/70 rounded" />
              <div className="mt-1 h-2 w-4/5 bg-neutral-400/50 rounded" />
              <div className="mt-1 h-2 w-3/5 bg-neutral-400/40 rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full bg-neutral-400/60 rounded" />
              <div className="h-2 w-4/5 bg-neutral-400/50 rounded" />
              <div className="h-2 w-3/5 bg-neutral-400/40 rounded" />
              <div className="h-2 w-full bg-neutral-400/50 rounded" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center justify-between border-t border-neutral-900/70 pt-2">
                <div className="h-2 w-24 bg-neutral-800 rounded" />
                <div className="text-[9px] tracking-widest uppercase text-neutral-600">Read</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export const NeonPreview = memo(NeonBase);
export const EditorialPreview = memo(EditorialBase);
