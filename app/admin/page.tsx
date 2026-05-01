'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { router.push('/login'); return; }
      const { data: p } = await supabase.from('profiles').select('role').eq('id', u.user.id).maybeSingle();
      if (p?.role !== 'admin') { router.push('/dashboard'); return; }
      const { data: l } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(50);
      const { data: pr } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50);
      setLeads(l ?? []);
      setProfiles(pr ?? []);
      setReady(true);
    })();
  }, [router]);

  if (!ready) return <div className="min-h-screen flex items-center justify-center font-bold">Carregando...</div>;

  return (
    <div className="min-h-screen bg-bioyellow/30 p-6 md:p-10">
      <h1 className="font-display text-4xl mb-6">Painel Admin</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="brutal-card p-5">
          <h2 className="font-display text-xl mb-3">Leads ({leads.length})</h2>
          <div className="flex flex-col gap-2 max-h-96 overflow-auto">
            {leads.map(l => (
              <div key={l.id} className="brutal-border p-3 bg-white text-sm flex justify-between">
                <span className="font-bold">{l.email}</span>
                <span>@{l.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="brutal-card p-5">
          <h2 className="font-display text-xl mb-3">Usuários ({profiles.length})</h2>
          <div className="flex flex-col gap-2 max-h-96 overflow-auto">
            {profiles.map(p => (
              <div key={p.id} className="brutal-border p-3 bg-white text-sm flex justify-between">
                <span className="font-bold">@{p.username}</span>
                <span>{p.is_pro ? 'Pro' : 'Free'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
