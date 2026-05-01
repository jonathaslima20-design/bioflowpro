'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getTheme } from '@/themes/registry';

export function BioPreview({
  profileId,
  profile: profileProp,
  links,
  socials,
  videos,
  banners,
}: {
  profileId: string;
  profile?: any;
  links: any[];
  socials?: any[];
  videos?: any[];
  banners?: any[];
}) {
  const [fetched, setFetched] = useState<any>(null);

  useEffect(() => {
    if (profileProp || !profileId) return;
    supabase.from('profiles').select('*').eq('id', profileId).maybeSingle().then(({ data }) => setFetched(data));
  }, [profileId, profileProp]);

  const profile = profileProp ?? fetched;
  if (!profile) return null;

  const Theme = getTheme(profile.theme).component;
  const noop = () => {};
  const activeLinks = (links || []).filter((l: any) => l.is_active !== false);

  return (
    <div className="brutal-border bg-white brutal-shadow-xl w-[320px] mx-auto overflow-hidden">
      <div
        className="pointer-events-none origin-top-left"
        style={{ transform: 'scale(0.55)', width: '582px', transformOrigin: 'top left' }}
      >
        <Theme
          profile={profile}
          links={activeLinks}
          socials={socials || []}
          videos={videos || []}
          banners={banners || []}
          track={noop}
        />
      </div>
    </div>
  );
}
