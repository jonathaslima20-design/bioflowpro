import { BrutalistTheme } from './brutalist';
import { MinimalistTheme } from './minimalist';
import type { BioThemeDefinition } from './types';

export const THEMES: Record<string, BioThemeDefinition> = {
  brutalist: {
    meta: {
      key: 'brutalist',
      name: 'Brutalist',
      description: 'Bordas pretas, sombras duras e cores vibrantes. O visual assinatura do BioFlowzy.',
      available: true,
    },
    component: BrutalistTheme,
  },
  minimalist: {
    meta: {
      key: 'minimalist',
      name: 'Minimalist Soft',
      description: 'Estetica lifestyle com glassmorphism, tipografia serifada e sombras suaves.',
      available: true,
    },
    component: MinimalistTheme,
  },
};

export const UPCOMING_THEMES: { key: string; name: string; description: string }[] = [
  { key: 'neon', name: 'Neon', description: 'Fundo escuro com efeitos luminosos e gradientes vibrantes.' },
  { key: 'editorial', name: 'Editorial', description: 'Layout de revista com serifs e grade estruturada.' },
];

export function getTheme(key: string | undefined | null): BioThemeDefinition {
  if (key && THEMES[key]) return THEMES[key];
  return THEMES.brutalist;
}