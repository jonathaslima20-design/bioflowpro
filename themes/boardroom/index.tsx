'use client';

import { ChevronRight } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';

export const boardroomMeta: BioThemeMeta = {
  key: 'boardroom',
  name: 'Boardroom Navy',
  description: 'Dossie financeiro premium: navy profundo, acentos metalicos e tipografia mono discreta estilo banca de investimento.',
  available: true,
  defaults: {
    bg_color: '#0A1628',
    button_color: '#C9A961',
    text_color: '#E8EDF5',
    border_width: 1,
    shadow_offset: 0,
  },
  palettes: {
    bg: ['#0A1628', '#0F1E36', '#050B18', '#1A2640', '#000814', '#102840'],
    accent: ['#C9A961', '#C0C0C6', '#B87333', '#10B981', '#60A5FA', '#F59E0B'],
    text: ['#E8EDF5', '#F8FAFC', '#CBD5E1', '#94A3B8'],
  },
  controls: [
    { key: 'overlay', label: 'Brilho do fundo', type: 'slider', min: 0, max: 100, step: 5, suffix: '%', default: 40, group: 'Ambiente' },
    { key: 'metalFinish', label: 'Acabamento metalico', type: 'select', options: [
      { value: 'matte', label: 'Fosco' },
      { value: 'satin', label: 'Acetinado' },
      { value: 'polished', label: 'Polido' },
    ], default: 'satin', group: 'Acabamento' },
    { key: 'ticker', label: 'Ticker superior', type: 'toggle', default: true, group: 'Cabecalho' },
    { key: 'confidential', label: 'Marca CONFIDENTIAL', type: 'toggle', default: true, group: 'Cabecalho' },
    { key: 'avatarFrame', label: 'Moldura do avatar', type: 'select', options: [
      { value: 'medal', label: 'Medalhao' },
      { value: 'plate', label: 'Placa' },
      { value: 'circle', label: 'Circulo simples' },
    ], default: 'medal', group: 'Avatar' },
    { key: 'doubleLine', label: 'Divisores com linha dupla', type: 'toggle', default: true, group: 'Layout' },
    { key: 'monoSubtitle', label: 'Subtitulo monoespacado', type: 'toggle', default: true, group: 'Tipografia' },
  ],
};

const FINISH: Record<string, { reflect: number; blur: number }> = {
  matte: { reflect: 0.1, blur: 0 },
  satin: { reflect: 0.3, blur: 1 },
  polished: { reflect: 0.6, blur: 2 },
};

export function BoardroomTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'boardroom', boardroomMeta.controls);
  const accent = profile.button_color || '#C9A961';
  const bg = profile.bg_color || '#0A1628';
  const text = profile.text_color || '#E8EDF5';
  const finish = FINISH[s.metalFinish] || FINISH.satin;
  const overlayOpacity = s.overlay / 100;
  const t = (a: string, b: string | null) => track?.(a, b);

  const serifFamily = 'var(--font-playfair), Georgia, serif';
  const sansFamily = 'var(--font-inter), "Helvetica Neue", Arial, sans-serif';
  const monoFamily = 'ui-monospace, "SF Mono", Menlo, Monaco, "JetBrains Mono", monospace';

  const metalGradient = `linear-gradient(135deg, ${accent} 0%, ${accent}DD 30%, ${accent}FF 50%, ${accent}BB 70%, ${accent} 100%)`;

  const Divider = () => s.doubleLine ? (
    <div className="w-full my-6">
      <div className="h-px w-full" style={{ background: `${accent}55` }} />
      <div className="h-px w-full mt-[3px]" style={{ background: `${accent}22` }} />
    </div>
  ) : (
    <div className="w-full h-px my-6" style={{ background: `${accent}44` }} />
  );

  const tickerItems = [
    { k: 'STATUS', v: 'ACTIVE', c: '#10B981' },
    { k: 'PROFILE', v: `#${(profile.username || 'user').slice(0, 6).toUpperCase()}`, c: accent },
    { k: 'TIER', v: profile.is_pro ? 'PREMIUM' : 'STANDARD', c: accent },
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: sansFamily,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accent}22, transparent 70%)`,
          opacity: overlayOpacity,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: overlayOpacity * 0.6,
        }}
        aria-hidden
      />

      <div className="relative max-w-md mx-auto px-6 pt-10 pb-16">
        {s.ticker && (
          <div
            className="flex items-center justify-between text-[9px] tracking-[0.2em] mb-8 px-3 py-2"
            style={{
              border: `1px solid ${accent}40`,
              fontFamily: monoFamily,
              backgroundColor: `${accent}08`,
            }}
          >
            {tickerItems.map((it) => (
              <div key={it.k} className="flex items-center gap-1.5">
                <span className="opacity-60">{it.k}</span>
                <span style={{ color: it.c }}>{it.v}</span>
              </div>
            ))}
          </div>
        )}

        {s.confidential && (
          <div
            className="text-center text-[10px] tracking-[0.4em] mb-8 opacity-70"
            style={{ color: accent, fontFamily: monoFamily }}
          >
            &mdash; CONFIDENTIAL DOSSIER &mdash;
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="relative" style={{ width: profile.avatar_size ?? 120, height: profile.avatar_size ?? 120 }}>
            {s.avatarFrame === 'medal' && (
              <>
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{
                    background: metalGradient,
                    boxShadow: `0 0 ${20 * finish.reflect}px ${accent}66`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-[-4px] rounded-full" style={{ background: bg }} aria-hidden />
              </>
            )}
            {s.avatarFrame === 'plate' && (
              <div
                className="absolute inset-[-8px]"
                style={{
                  background: metalGradient,
                  boxShadow: `0 4px ${12 * finish.reflect}px rgba(0,0,0,0.4)`,
                }}
                aria-hidden
              />
            )}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: s.avatarFrame === 'plate' ? 0 : '50%',
                border: `1px solid ${accent}`,
              }}
            >
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: `${accent}22` }} />
              )}
            </div>
          </div>

          <div
            className="mt-5 text-[9px] tracking-[0.4em] uppercase"
            style={{ color: accent, fontFamily: monoFamily }}
          >
            Principal
          </div>
          <h1
            className="mt-2 text-3xl leading-tight tracking-tight"
            style={{
              background: metalGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: serifFamily,
              fontWeight: 600,
              filter: `drop-shadow(0 1px 0 rgba(0,0,0,0.3))`,
            }}
          >
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div
            className="mt-2 text-xs opacity-70"
            style={{ color: text, fontFamily: s.monoSubtitle ? monoFamily : sansFamily }}
          >
            {s.monoSubtitle ? `> @${profile.username}` : `@${profile.username}`}
          </div>
          {profile.bio && (
            <p
              className="mt-4 text-sm max-w-sm leading-relaxed opacity-85"
              style={{ color: text }}
            >
              {profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-2 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => t('social', soc.id)}
                    className="w-10 h-10 flex items-center justify-center transition-all hover:-translate-y-0.5"
                    style={{
                      border: `1px solid ${accent}66`,
                      backgroundColor: `${accent}10`,
                      color: accent,
                    }}
                    aria-label={meta?.label || soc.platform}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <Divider />

        <div
          className="flex items-center justify-between text-[9px] tracking-[0.3em] uppercase mb-4 opacity-60"
          style={{ fontFamily: monoFamily, color: accent }}
        >
          <span>Portfolio of Links</span>
          <span>{String(links.length).padStart(2, '0')} items</span>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((l: any, i: number) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => t('link', l.id)}
              className="group relative flex items-center gap-4 px-5 py-4 transition-all hover:-translate-y-px"
              style={{
                backgroundColor: `${accent}0A`,
                border: `1px solid ${accent}33`,
                color: text,
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] transition-all group-hover:w-1.5"
                style={{ background: metalGradient }}
              />
              <span
                className="text-[10px] tracking-[0.2em] opacity-60 shrink-0"
                style={{ fontFamily: monoFamily, color: accent }}
              >
                {String(i + 1).padStart(3, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm truncate"
                  style={{ fontFamily: serifFamily, fontWeight: 500, letterSpacing: '-0.01em' }}
                >
                  {l.title}
                </div>
                {l.subtitle && (
                  <div
                    className="text-[10px] mt-0.5 opacity-60 truncate"
                    style={{ fontFamily: monoFamily }}
                  >
                    {l.subtitle}
                  </div>
                )}
              </div>
              <ChevronRight
                className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                style={{ color: accent }}
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>

        {(banners?.length || videos?.length) ? (
          <>
            <Divider />
            <div
              className="text-[9px] tracking-[0.3em] uppercase mb-4 opacity-60"
              style={{ fontFamily: monoFamily, color: accent }}
            >
              Annexes &amp; Media
            </div>
            <div className="flex flex-col gap-4">
              {banners?.map((b: any) => {
                const inner = (
                  <div
                    className="overflow-hidden"
                    style={{
                      height: b.size === 'sm' ? 96 : b.size === 'lg' ? 240 : 160,
                      border: `1px solid ${accent}44`,
                    }}
                  >
                    {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                  </div>
                );
                return b.link_url ? (
                  <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a>
                ) : (
                  <div key={b.id}>{inner}</div>
                );
              })}

              {videos.map((v: any) => (
                <div
                  key={v.id}
                  className="overflow-hidden"
                  style={{
                    border: `1px solid ${accent}44`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  <div className="relative aspect-video bg-black">
                    {v.embed_url ? (
                      <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                    ) : v.thumbnail ? (
                      <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  {v.title && (
                    <div
                      className="px-4 py-3 text-xs tracking-wide"
                      style={{ color: text, fontFamily: monoFamily }}
                    >
                      {v.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : null}

        <Divider />
        <div
          className="text-center text-[9px] tracking-[0.4em] uppercase opacity-50"
          style={{ fontFamily: monoFamily, color: accent }}
        >
          End of Document
        </div>
      </div>
    </div>
  );
}

export default BoardroomTheme;
