'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.from('profiles').select('*').eq('id', u.user.id).maybeSingle();
      setProfile(data);
    })();
  }, []);

  async function save() {
    if (!profile) return;
    await supabase.from('profiles').update({
      display_name: profile.display_name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
    }).eq('id', profile.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (!profile) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl mb-6">Configurações</h1>
      <div className="brutal-card p-6 flex flex-col gap-4">
        <div>
          <label className="font-bold text-sm">Nome público</label>
          <input className="brutal-input w-full mt-1" value={profile.display_name || ''} onChange={e => setProfile({ ...profile, display_name: e.target.value })} />
        </div>
        <div>
          <label className="font-bold text-sm">@ (username)</label>
          <input className="brutal-input w-full mt-1" value={profile.username} disabled />
        </div>
        <div>
          <label className="font-bold text-sm">Bio</label>
          <textarea className="brutal-input w-full mt-1" rows={3} value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
        </div>
        <div>
          <label className="font-bold text-sm">URL do avatar</label>
          <input className="brutal-input w-full mt-1" value={profile.avatar_url || ''} onChange={e => setProfile({ ...profile, avatar_url: e.target.value })} />
        </div>
        <button onClick={save} className="brutal-btn bg-bioyellow py-3 mt-2">Salvar</button>
        {saved && <div className="font-bold">Salvo!</div>}
      </div>
    </div>
  );
}
