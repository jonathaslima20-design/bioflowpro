'use client';

import { ExternalLink } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';

export const clayMeta: BioThemeMeta = {
  key: 'clay',
  name: 'Organic Clay',
  description: 'Claymorphism suave: superficies de argila, sombras duplas e paleta pastel acolhedora.',
  available: true,
  defaults: {
    bg_color: '#F5E6D3',
    button_color: '#E8937C',
    text_color: '#3D2B1F',
  },
  palettes: {
    bg: ['#F5E6D3', '#F0E6DA', '#EDE4D3', '#F4EAE0', '#FFE8D6', '#E8DFD3'],
    accent: ['#E8937C', '#A8B89A', '#C9A89D', '#B8A491', '#D9A384', '#9BA89A'],
    text: ['#3D2B1F', '#4A3B2C', '#2D2416', '#5C4B3A'],
  },
  controls: [
    { key: 'radius', label: 'Raio de borda', type: 'slider', min: 12, max: 40, step: 2, suffix: 'px', default: 24, group: 'Forma' },
    { key: 'innerShadow', label: 'Sombra interna', type: 'slider', min: 0, max: 100, step: 5, suffix: '%', default: 60, group: 'Profundidade' },
    { key: 'outerShadow', label: 'Sombra externa', type: 'slider', min: 0, max: 100, step: 5, suffix: '%', default: 70, group: 'Profundidade' },
    { key: 'blobAvatar', label: 'Avatar em blob', type: 'toggle', default: true, group: 'Avatar' },
    { key: 'easing', label: 'Easing', type: 'select', options: [
      { value: 'calm', label: 'Calmo' },
      { value: 'bouncy', label: 'Pulante' },
      { value: 'springy', label: 'Mola' },
    ], default: 'bouncy', group: 'Interacoes' },
    { key: 'palette', label: 'Paleta', type: 'select', options: [
      { value: 'terracotta', label: 'Terracotta' },
      { value: 'sage', label: 'Sage' },
      { value: 'lavender', label: 'Lavender' },
      { value: 'cream', label: 'Cream' },
    ], default: 'terracotta', group: 'Forma' },
  ],
};

const EASING: Record<string, string> = {
  calm: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  springy: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

const PAL_TINTS: Record<string, string> = {
  terracotta: '#E8937C',
  sage: '#A8B89A',
  lavender: '#B8A8C9',
  cream: '#E8D9C0',
};

export function ClayTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'clay', clayMeta.controls);
  const accent = profile.button_color || '#E8937C';
  const tint = PAL_TINTS[s.palette] || accent;
  const t = (a: string, b: string | null) => track?.(a, b);
  const radius = s.radius;
  const inner = Math.max(0, s.innerShadow / 100);
  const outer = Math.max(0, s.outerShadow / 100);
  const ease = EASING[s.easing] || EASING.bouncy;

  const claySurface = (bg: string) => ({
    borderRadius: radius,
    background: bg,
    boxShadow: [
      `${8 * outer}px ${8 * outer}px ${18 * outer}px rgba(0,0,0,${0.12 * outer})`,
      `-${6 * outer}px -${6 * outer}px ${16 * outer}px rgba(255,255,255,${0.7 * outer})`,
      `inset 2px 2px 4px rgba(255,255,255,${0.6 * inner})`,
      `inset -2px -2px 4px rgba(0,0,0,${0.08 * inner})`,
    ].join(', '),
  });

  const avatarMask = s.blobAvatar
    ? 'radial-gradient(60% 55% at 40% 45%, #000 60%, transparent 75%)'
    : undefined;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: profile.bg_color || '#F5E6D3',
        color: profile.text_color,
        fontFamily: 'var(--font-dmsans), var(--font-inter), system-ui',
      }}
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${tint}66, transparent 70%)`, filter: 'blur(30px)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)`, filter: 'blur(40px)' }}
        aria-hidden
      />

      <div className="relative max-w-md mx-auto px-6 pt-10 pb-24">
        <div className="flex flex-col items-center text-center">
          <div className="relative" style={{ width: profile.avatar_size ?? 120, height: profile.avatar_size ?? 120 }}>
            {s.blobAvatar && (
              <div
                className="absolute inset-[-8px] clay-blob"
                style={{ background: `linear-gradient(135deg, ${accent}, ${tint})`, filter: 'blur(2px)' }}
                aria-hidden
              />
            )}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: s.blobAvatar ? '55% 45% 50% 50% / 50% 55% 45% 50%' : radius + 8,
                boxShadow: `6px 6px 18px rgba(0,0,0,${0.18 * outer}), -4px -4px 12px rgba(255,255,255,0.6), inset 2px 2px 6px rgba(255,255,255,0.6)`,
              }}
            >
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
          </div>

          <h1 className="mt-6 text-3xl" style={{ color: profile.text_color, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div className="mt-1 text-sm opacity-70" style={{ color: profile.text_color }}>@{profile.username}</div>
          {profile.bio && <p className="mt-3 text-sm max-w-xs leading-relaxed opacity-85" style={{ color: profile.text_color }}>{profile.bio}</p>}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-3 flex-wrap justify-center">
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
                    className="w-11 h-11 flex items-center justify-center clay-tap"
                    style={{
                      ...claySurface(`linear-gradient(135deg, ${accent}, ${tint})`),
                      color: '#FFFFFF',
                      transitionTimingFunction: ease,
                    }}
                    aria-label={meta?.label || soc.platform}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {links.map((l: any) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => t('link', l.id)}
              className="clay-tap px-5 py-4 flex items-center justify-between"
              style={{
                ...claySurface(`linear-gradient(135deg, ${accent}, ${tint})`),
                color: '#FFFFFF',
                fontWeight: 600,
                transitionTimingFunction: ease,
              }}
            >
              <span>{l.title}</span>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.3)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.6), inset -1px -1px 2px rgba(0,0,0,0.1)' }}
              >
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div
                className="overflow-hidden"
                style={{
                  ...claySurface('#ffffff'),
                  height: b.size === 'sm' ? 96 : b.size === 'lg' ? 240 : 160,
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
            <div key={v.id} className="overflow-hidden" style={claySurface('#ffffff')}>
              <div className="relative aspect-video bg-black" style={{ borderRadius: radius - 4 }}>
                {v.embed_url ? (
                  <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                ) : v.thumbnail ? (
                  <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              {v.title && <div className="px-4 py-3 text-sm font-medium" style={{ color: profile.text_color }}>{v.title}</div>}
            </div>
          ))}
        </div>

        <div aria-hidden className="h-16" />
      </div>

      <style jsx>{`
        :global(.clay-tap) { transition: transform 300ms; }
        :global(.clay-tap:hover) { transform: translateY(-2px) scale(1.01); }
        :global(.clay-tap:active) { transform: translateY(1px) scale(0.99); }
        :global(.clay-blob) {
          border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%;
          animation: clay-morph 8s ease-in-out infinite;
        }
        @keyframes clay-morph {
          0%,100% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; }
          50% { border-radius: 45% 55% 50% 50% / 55% 50% 50% 45%; }
        }
      `}</style>
    </div>
  );
}

export default ClayTheme;
