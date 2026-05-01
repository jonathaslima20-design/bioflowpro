'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Link2, ChartBar as BarChart3, Palette, Settings, LogOut, Zap, ShieldCheck, Video, Image as ImageIcon, AtSign } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/dashboard/links', label: 'Links', icon: Link2 },
  { href: '/dashboard/videos', label: 'Vídeos', icon: Video },
  { href: '/dashboard/banners', label: 'Banners', icon: ImageIcon },
  { href: '/dashboard/socials', label: 'Redes sociais', icon: AtSign },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/customize', label: 'Aparência', icon: Palette },
  { href: '/dashboard/settings', label: 'Configurações', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { router.push('/login'); return; }
      const { data: p } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle();
      setIsAdmin(p?.role === 'admin');
      setReady(true);
    })();
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center font-bold">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-biolime/20">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white brutal-border border-l-0 border-y-0 border-r-2 p-4 hidden md:flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="w-9 h-9 bg-bioblue brutal-border flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </span>
          <span className="font-display text-xl">BioFlowzy</span>
        </Link>
        <nav className="flex flex-col gap-2 flex-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 brutal-border font-bold text-sm ${active ? 'bg-bioyellow brutal-shadow' : 'bg-white border-transparent hover:border-black'}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2 brutal-border font-bold text-sm bg-bioblue text-white`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          )}
        </nav>
        <button onClick={signOut} className="brutal-btn bg-white py-2 mt-3 text-sm gap-2">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </aside>
      <main className="md:ml-64 p-6 md:p-10">{children}</main>
    </div>
  );
}
