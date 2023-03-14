export const ENGLISH = 'ENGLISH' as const;
export const KOREAN = 'KOREAN' as const;

export const LANGUAGE = {
  [ENGLISH]: { languageCode: ENGLISH, languageLabel: 'English' },
  [KOREAN]: { languageCode: KOREAN, languageLabel: '한국어' }
} as const;
