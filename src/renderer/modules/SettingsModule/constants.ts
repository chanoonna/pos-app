import type { LanguageCode } from './types';

import english from './english.json';
import korean from './korean.json';

export const ENGLISH = 'ENGLISH' as const;
export const KOREAN = 'KOREAN' as const;

export const LANGUAGE = {
  [ENGLISH]: { languageCode: ENGLISH, languageLabel: 'English' },
  [KOREAN]: { languageCode: KOREAN, languageLabel: '한국어' }
} as const;

interface Labels {
  SettingsModal: {
    title: string;
  };
}

export const labels: Record<LanguageCode, Labels> = {
  [LANGUAGE.KOREAN.languageCode]: korean,
  [LANGUAGE.ENGLISH.languageCode]: english
};
