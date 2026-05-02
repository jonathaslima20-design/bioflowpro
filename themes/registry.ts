import { BrutalistTheme } from './brutalist';
import { AuroraTheme, auroraMeta } from './aurora';
import { CyberTheme, cyberMeta } from './cyber';
import { RetrowaveTheme, retrowaveMeta } from './retrowave';
import { ClayTheme, clayMeta } from './clay';
import { ExecutiveTheme, executiveMeta } from './executive';
import { BoardroomTheme, boardroomMeta } from './boardroom';
import { AtlasTheme, atlasMeta } from './atlas';
import { ConversionTheme, conversionMeta } from './conversion';
import { CreatorTheme, creatorMeta } from './creator';
import { AgencyTheme, agencyMeta } from './agency';
import type { BioThemeDefaults, BioThemeDefinition, BioThemeMeta } from './types';

const brutalistMeta: BioThemeMeta = {
  key: 'brutalist',
  name: 'Brutalist',
  description: 'Bordas pretas, sombras duras e cores vibrantes. O visual assinatura do BioFlowzy.',
  available: true,
  defaults: {
    bg_color: '#FFFFFF',
    button_color: '#FACC15',
    text_color: '#000000',
    border_width: 2,
    shadow_offset: 4,
  },
  palettes: {
    bg: ['#FFFFFF', '#F1F5F9', '#FACC15', '#BEF264', '#FDA4AF', '#000000'],
    accent: ['#FACC15', '#BEF264', '#2563EB', '#EF4444', '#F97316', '#000000', '#FFFFFF'],
    text: ['#000000', '#111827', '#FFFFFF', '#1E293B'],
  },
};

export const THEMES: Record<string, BioThemeDefinition> = {
  brutalist: { meta: brutalistMeta, component: BrutalistTheme },
  aurora: { meta: auroraMeta, component: AuroraTheme },
  cyber: { meta: cyberMeta, component: CyberTheme },
  retrowave: { meta: retrowaveMeta, component: RetrowaveTheme },
  clay: { meta: clayMeta, component: ClayTheme },
  executive: { meta: executiveMeta, component: ExecutiveTheme },
  boardroom: { meta: boardroomMeta, component: BoardroomTheme },
  atlas: { meta: atlasMeta, component: AtlasTheme },
  conversion: { meta: conversionMeta, component: ConversionTheme },
  creator: { meta: creatorMeta, component: CreatorTheme },
  agency: { meta: agencyMeta, component: AgencyTheme },
};

export function getTheme(key: string | undefined | null): BioThemeDefinition {
  if (key && THEMES[key]) return THEMES[key];
  return THEMES.brutalist;
}

export function getThemeDefaults(key: string | undefined | null): BioThemeDefaults {
  return getTheme(key).meta.defaults;
}
