import type { ComponentType } from 'react';

export type BioProfile = {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  theme: string;
  theme_settings: Record<string, unknown>;
  bg_color: string;
  button_color: string;
  text_color: string;
  border_width: number;
  shadow_offset: number;
  is_pro: boolean;
};

export type BioThemeProps = {
  profile: BioProfile;
  links: any[];
  socials: any[];
  videos: any[];
  banners: any[];
  track?: (entity_type: string, entity_id: string | null) => void;
};

export type BioThemeMeta = {
  key: string;
  name: string;
  description: string;
  available: boolean;
};

export type BioThemeDefinition = {
  meta: BioThemeMeta;
  component: ComponentType<BioThemeProps>;
};
