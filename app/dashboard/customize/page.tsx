'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BioPreview } from '@/components/dashboard/BioPreview';
import { THEMES, UPCOMING_THEMES } from '@/themes/registry';
import { ThemeMockup } from '@/components/themes/ThemeMockup';
import { NeonPreview, EditorialPreview } from '@/components/themes/UpcomingPreviews';
import { Check, Lock } from 'lucide-react';

const UPCOMING_PREVIEWS: Record<string, React.ComponentType> = {
  neon: NeonPreview,
  editorial: EditorialPreview,
};

const palette = ['#FFFFFF', '#FACC15', '#BEF264', '#2563EB', '#EF4444', '#000000', '#F1F5F9'];

export default function CustomizePage() {
  const [profileId, setProfileId] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setProfileId(u.user.id);
      const { data: p } = await supabase.from('profiles').select('*').eq('id', u.user.id).maybeSingle();
      setProfile(p);
      const [{ data: ls }, { data: ss }, { data: vs }, { data: bs }] = await Promise.all([
        supabase.from('links').select('*').eq('profile_id', u.user.id).order('position'),
        supabase.from('socials').select('*').eq('profile_id', u.user.id).order('position'),
        supabase.from('videos').select('*').eq('profile_id', u.user.id).order('position'),
        supabase.from('banners').select('*').eq('profile_id', u.user.id).order('position'),
      ]);
      setLinks(ls ?? []);
      setSocials(ss ?? []);
      setVideos(vs ?? []);
      setBanners(bs ?? []);
    })();
  }, []);

  async function update(patch: any) {
    const next = { ...profile, ...patch };
    setProfile(next);
    await supabase.from('profiles').update(patch).eq('id', profileId);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (!profile) return <div>Carregando...</div>;

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <h1 className="font-display text-4xl mb-6">Aparência</h1>

        <Section title="Tema">
          <p className="text-xs font-bold text-black/60 mb-3">
            Temas mudam o layout e o estilo da sua página pública. Suas cores continuam aplicadas.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.values(THEMES).map(({ meta }) => {
              const active = (profile.theme || 'brutalist') === meta.key;
              return (
                <button
                  key={meta.key}
                  onClick={() => update({ theme: meta.key })}
                  className={`group brutal-border text-left transition-all overflow-hidden bg-white ${active ? 'brutal-shadow -translate-y-0.5' : 'hover:-translate-y-0.5 hover:brutal-shadow'}`}
                >
                  <div className="relative bg-[#F7F7F5] border-b-[3px] border-black flex items-center justify-center py-6">
                    <ThemeMockup themeKey={meta.key} />
                    {active && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold uppercase bg-black text-white px-2 py-1 brutal-border flex items-center gap-1 z-10">
                        <Check className="w-3 h-3" /> Ativo
                      </span>
                    )}
                  </div>
                  <div className={`p-3 ${active ? 'bg-bioyellow' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg">{meta.name}</span>
                    </div>
                    <p className="text-xs mt-1 text-black/70 line-clamp-2">{meta.description}</p>
                  </div>
                </button>
              );
            })}
            {UPCOMING_THEMES.map(t => {
              const Preview = UPCOMING_PREVIEWS[t.key];
              return (
                <div key={t.key} className="brutal-border overflow-hidden bg-white opacity-90">
                  <div className="relative bg-[#F1F1EE] border-b-[3px] border-black flex items-center justify-center py-6">
                    {Preview && <Preview />}
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[10px] font-bold uppercase bg-white px-3 py-1 brutal-border flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Em breve
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-black/5">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg flex items-center gap-2">
                        <Lock className="w-4 h-4" /> {t.name}
                      </span>
                    </div>
                    <p className="text-xs mt-1 text-black/60 line-clamp-2">{t.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Fundo">
          <Swatches value={profile.bg_color} onChange={(c) => update({ bg_color: c })} />
        </Section>

        <Section title="Cor do botão">
          <Swatches value={profile.button_color} onChange={(c) => update({ button_color: c })} />
        </Section>

        <Section title="Cor do texto">
          <Swatches value={profile.text_color} onChange={(c) => update({ text_color: c })} />
        </Section>

        <Section title="Espessura da borda">
          <div className="flex gap-3">
            {[2, 3, 4, 5].map(w => (
              <button key={w} onClick={() => update({ border_width: w })} className={`brutal-btn px-4 py-2 ${profile.border_width === w ? 'bg-bioyellow' : 'bg-white'}`}>{w}px</button>
            ))}
          </div>
        </Section>

        <Section title="Intensidade da sombra">
          <div className="flex gap-3">
            {[0, 2, 4, 6, 8].map(w => (
              <button key={w} onClick={() => update({ shadow_offset: w })} className={`brutal-btn px-4 py-2 ${profile.shadow_offset === w ? 'bg-bioyellow' : 'bg-white'}`}>{w}px</button>
            ))}
          </div>
        </Section>

        {saved && <div className="mt-4 inline-block brutal-card px-4 py-2 bg-biolime font-bold">Salvo!</div>}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-6">
          <h2 className="font-display text-lg mb-4">Preview</h2>
          <BioPreview
            profileId={profileId}
            profile={profile}
            links={links}
            socials={socials}
            videos={videos}
            banners={banners}
          />
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="brutal-card p-5 mb-5">
      <h3 className="font-display text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Swatches({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {palette.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`w-10 h-10 brutal-border ${value === c ? 'brutal-shadow' : ''}`}
          style={{ backgroundColor: c }}
          aria-label={c}
        />
      ))}
    </div>
  );
}
