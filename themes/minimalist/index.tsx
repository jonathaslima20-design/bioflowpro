'use client';

import { ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps } from '@/themes/types';

const BANNER_HEIGHT: Record<string, string> = { sm: 'h-24', md: 'h-40', lg: 'h-60' };

export function MinimalistTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div
      className="min-h-screen py-14 px-5 font-sans-light relative overflow-hidden"
      style={{ backgroundColor: '#FDFCF8' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(244,236,220,0.9), transparent 50%), radial-gradient(circle at 80% 80%, rgba(230,236,230,0.7), transparent 45%)',
        }}
      />

      <div className="relative max-w-md mx-auto">
        <div className="flex flex-col items-center text-center">
          <div
            className="shrink-0 aspect-square rounded-full overflow-hidden soft-shadow"
            style={{ border: '4px solid #FFFFFF', width: profile.avatar_size ?? 90, height: profile.avatar_size ?? 90 }}
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#F0EBE0]" />
            )}
          </div>

          <h1
            className="font-serif-display mt-6 text-[2rem] leading-tight text-[#2A2A2A]"
            style={{ fontWeight: 500 }}
          >
            {profile.display_name || `@${profile.username}`}
          </h1>
          <p className="mt-1 text-sm text-[#9A9A9A] tracking-wide">@{profile.username}</p>
          {profile.bio && (
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6A6A6A]">
              {profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-6 flex-wrap justify-center">
              {socials.map((s: any) => {
                const meta = SOCIALS_BY_KEY[(s.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => t('social', s.id)}
                    className="text-[#A0A0A0] hover:text-[#4A4A4A] transition-colors"
                    aria-label={meta?.label || s.platform}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-10">
          {links.map((l: any) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => t('link', l.id)}
              className="glass-card soft-shadow rounded-[2rem] px-6 py-4 flex items-center justify-between transition-all hover:-translate-y-0.5 hover:soft-shadow-lg"
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-[15px] font-medium text-[#2A2A2A]">{l.title}</span>
                {l.subtitle && (
                  <span className="text-xs text-[#9A9A9A] mt-0.5">{l.subtitle}</span>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-[#A0A0A0]" strokeWidth={1.5} />
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div
                className={`rounded-[2rem] overflow-hidden soft-shadow ${BANNER_HEIGHT[b.size] || BANNER_HEIGHT.md}`}
              >
                {b.image_url && (
                  <img src={b.image_url} alt="" className="w-full h-full object-cover" />
                )}
              </div>
            );
            return b.link_url ? (
              <a
                key={b.id}
                href={b.link_url}
                target="_blank"
                rel="noreferrer"
                onClick={() => t('banner', b.id)}
                className="block transition-transform hover:-translate-y-0.5"
              >
                {inner}
              </a>
            ) : (
              <div key={b.id}>{inner}</div>
            );
          })}

          {videos.map((v: any) => (
            <div
              key={v.id}
              className="rounded-[2rem] overflow-hidden soft-shadow bg-white"
            >
              <div className="relative aspect-video bg-[#F0EBE0]">
                {v.embed_url ? (
                  <iframe
                    src={v.embed_url}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => t('video', v.id)}
                  />
                ) : (
                  <>
                    {v.thumbnail && (
                      <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center soft-shadow">
                        <Play className="w-5 h-5 text-[#2A2A2A] ml-0.5" fill="#2A2A2A" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-md text-[10px] tracking-widest uppercase px-3 py-1 rounded-full text-[#4A4A4A]">
                      {(v.platform || 'video')}
                    </span>
                  </>
                )}
              </div>
              {v.title && (
                <div className="px-5 py-4 font-serif-display text-[17px] text-[#2A2A2A]">
                  {v.title}
                </div>
              )}
            </div>
          ))}
        </div>

        {!profile.is_pro && (
          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-block text-[10px] uppercase text-[#A0A0A0] hover:text-[#4A4A4A] transition-colors"
              style={{ letterSpacing: '0.25em' }}
            >
              feito com BioFlowzy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MinimalistTheme;