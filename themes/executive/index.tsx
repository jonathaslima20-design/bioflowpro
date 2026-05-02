'use client';

import { ArrowUpRight } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';

export const executiveMeta: BioThemeMeta = {
  key: 'executive',
  name: 'Executive Mono',
  description: 'Editorial corporativo com tipografia serifada, espacamento amplo e links numerados estilo relatorio anual.',
  available: true,
  defaults: {
    bg_color: '#F5F2EC',
    button_color: '#1A1A1A',
    text_color: '#1A1A1A',
    border_width: 1,
    shadow_offset: 0,
  },
  palettes: {
    bg: ['#F5F2EC', '#FAF7F0', '#F0EBE0', '#E8E4D8', '#1A1A1A', '#0F0F0F'],
    accent: ['#1A1A1A', '#8B6F47', '#1F4E3D', '#0F2847', '#7A1F1F', '#B8860B'],
    text: ['#1A1A1A', '#2C2C2C', '#F5F2EC', '#E8E4D8'],
  },
  controls: [
    { key: 'typography', label: 'Tipografia', type: 'select', options: [
      { value: 'serif', label: 'Serif classica' },
      { value: 'sans', label: 'Sans geometrica' },
      { value: 'mix', label: 'Mista (serif + sans)' },
    ], default: 'mix', group: 'Tipografia' },
    { key: 'density', label: 'Densidade', type: 'select', options: [
      { value: 'compact', label: 'Compacta' },
      { value: 'normal', label: 'Normal' },
      { value: 'spacious', label: 'Espacosa' },
    ], default: 'spacious', group: 'Layout' },
    { key: 'numbering', label: 'Numeracao dos links', type: 'select', options: [
      { value: 'decimal', label: '01, 02, 03' },
      { value: 'roman', label: 'I, II, III' },
      { value: 'letters', label: 'A, B, C' },
      { value: 'none', label: 'Sem numeracao' },
    ], default: 'decimal', group: 'Layout' },
    { key: 'divider', label: 'Linha divisoria', type: 'toggle', default: true, group: 'Layout' },
    { key: 'metallic', label: 'Acento metalico', type: 'select', options: [
      { value: 'none', label: 'Sem metalico' },
      { value: 'gold', label: 'Dourado' },
      { value: 'bronze', label: 'Bronze' },
      { value: 'silver', label: 'Prata' },
    ], default: 'gold', group: 'Acabamento' },
    { key: 'avatarShape', label: 'Formato do avatar', type: 'select', options: [
      { value: 'portrait', label: 'Retrato retangular' },
      { value: 'circle', label: 'Circulo' },
      { value: 'square', label: 'Quadrado sutil' },
    ], default: 'portrait', group: 'Avatar' },
    { key: 'label', label: 'Etiqueta superior', type: 'toggle', default: true, group: 'Cabecalho' },
  ],
};

const METALLIC: Record<string, string> = {
  none: 'transparent',
  gold: '#B8860B',
  bronze: '#8B6F47',
  silver: '#9BA0A6',
};

const DENSITY: Record<string, { padY: number; gap: number; linkPad: string; headerPad: string }> = {
  compact: { padY: 28, gap: 10, linkPad: 'py-3', headerPad: 'pt-8 pb-6' },
  normal: { padY: 40, gap: 14, linkPad: 'py-4', headerPad: 'pt-10 pb-8' },
  spacious: { padY: 56, gap: 18, linkPad: 'py-5', headerPad: 'pt-14 pb-12' },
};

function formatIndex(n: number, style: string): string {
  if (style === 'none') return '';
  if (style === 'letters') return String.fromCharCode(65 + (n % 26));
  if (style === 'roman') {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return romans[n] || String(n + 1);
  }
  return String(n + 1).padStart(2, '0');
}

export function ExecutiveTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'executive', executiveMeta.controls);
  const accent = profile.button_color || '#1A1A1A';
  const metal = METALLIC[s.metallic] || 'transparent';
  const d = DENSITY[s.density] || DENSITY.spacious;
  const t = (a: string, b: string | null) => track?.(a, b);

  const serifFamily = 'var(--font-playfair), Georgia, "Times New Roman", serif';
  const sansFamily = 'var(--font-inter), "Helvetica Neue", Arial, sans-serif';

  const titleFont = s.typography === 'sans' ? sansFamily : serifFamily;
  const bodyFont = s.typography === 'serif' ? serifFamily : sansFamily;

  const avatarSize = profile.avatar_size ?? 120;
  const avatarHeight = s.avatarShape === 'portrait' ? Math.round(avatarSize * 1.25) : avatarSize;
  const avatarRadius = s.avatarShape === 'circle' ? '999px' : s.avatarShape === 'square' ? '2px' : '1px';

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: profile.bg_color || '#F5F2EC',
        color: profile.text_color || '#1A1A1A',
        fontFamily: bodyFont,
      }}
    >
      <div className="relative max-w-md mx-auto px-8" style={{ paddingTop: d.padY, paddingBottom: d.padY + 24 }}>
        {s.label && (
          <div
            className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase opacity-60 mb-8"
            style={{ color: profile.text_color, fontFamily: sansFamily }}
          >
            <span>Executive Profile</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        )}

        {s.divider && (
          <div className="w-full h-px mb-8" style={{ backgroundColor: profile.text_color, opacity: 0.25 }} />
        )}

        <div className={`flex flex-col items-center text-center ${d.headerPad}`}>
          <div
            className="overflow-hidden mb-8"
            style={{
              width: avatarSize,
              height: avatarHeight,
              borderRadius: avatarRadius,
              border: `1px solid ${profile.text_color}`,
              boxShadow: metal !== 'transparent' ? `0 0 0 4px ${profile.bg_color}, 0 0 0 5px ${metal}` : undefined,
            }}
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(25%) contrast(1.05)' }} />
            ) : (
              <div className="w-full h-full" style={{ background: profile.text_color, opacity: 0.1 }} />
            )}
          </div>

          <h1
            className="text-4xl leading-[1.1] tracking-tight"
            style={{
              color: profile.text_color,
              fontFamily: titleFont,
              fontWeight: 500,
            }}
          >
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div
            className="mt-3 text-[11px] tracking-[0.25em] uppercase opacity-70"
            style={{ color: profile.text_color, fontFamily: sansFamily }}
          >
            @{profile.username}
          </div>
          {metal !== 'transparent' && (
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: metal }} />
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: metal }}>Established</span>
              <div className="h-px w-8" style={{ backgroundColor: metal }} />
            </div>
          )}
          {profile.bio && (
            <p
              className="mt-5 text-sm max-w-[22rem] leading-[1.7] italic opacity-85"
              style={{ color: profile.text_color, fontFamily: serifFamily }}
            >
              {profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-7 flex gap-5 flex-wrap justify-center">
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
                    className="transition-opacity hover:opacity-60"
                    style={{ color: profile.text_color }}
                    aria-label={meta?.label || soc.platform}
                  >
                    {Icon && <Icon className="w-[18px] h-[18px]" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {s.divider && (
          <div className="w-full h-px my-4" style={{ backgroundColor: profile.text_color, opacity: 0.25 }} />
        )}

        <div className="flex flex-col" style={{ gap: d.gap }}>
          {links.map((l: any, i: number) => {
            const idx = formatIndex(i, s.numbering);
            return (
              <a
                key={l.id}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => t('link', l.id)}
                className={`group flex items-baseline justify-between gap-4 ${d.linkPad} border-b transition-all`}
                style={{
                  borderColor: `${profile.text_color}30`,
                  color: profile.text_color,
                }}
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  {idx && (
                    <span
                      className="text-[10px] tracking-[0.2em] shrink-0"
                      style={{ color: metal !== 'transparent' ? metal : `${profile.text_color}99`, fontFamily: sansFamily }}
                    >
                      {idx}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div
                      className="text-lg truncate"
                      style={{ fontFamily: titleFont, fontWeight: 500, letterSpacing: '-0.01em' }}
                    >
                      {l.title}
                    </div>
                    {l.subtitle && (
                      <div
                        className="text-xs mt-1 opacity-60 italic truncate"
                        style={{ fontFamily: serifFamily }}
                      >
                        {l.subtitle}
                      </div>
                    )}
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.25}
                />
              </a>
            );
          })}
        </div>

        {(banners?.length || videos?.length) ? (
          <div className="mt-10 flex flex-col" style={{ gap: d.gap + 6 }}>
            {banners?.map((b: any) => {
              const inner = (
                <div
                  className="overflow-hidden"
                  style={{
                    height: b.size === 'sm' ? 96 : b.size === 'lg' ? 240 : 160,
                    border: `1px solid ${profile.text_color}30`,
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
              <figure key={v.id} className="flex flex-col">
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ border: `1px solid ${profile.text_color}30` }}
                >
                  {v.embed_url ? (
                    <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  ) : v.thumbnail ? (
                    <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : null}
                </div>
                {v.title && (
                  <figcaption
                    className="mt-2 text-xs italic opacity-75"
                    style={{ color: profile.text_color, fontFamily: serifFamily }}
                  >
                    {v.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : null}

        {s.divider && (
          <div className="w-full h-px mt-12" style={{ backgroundColor: profile.text_color, opacity: 0.25 }} />
        )}
        <div
          className="mt-4 text-[9px] tracking-[0.35em] uppercase text-center opacity-50"
          style={{ color: profile.text_color, fontFamily: sansFamily }}
        >
          {profile.display_name || profile.username} &middot; All rights reserved
        </div>
      </div>
    </div>
  );
}

export default ExecutiveTheme;
