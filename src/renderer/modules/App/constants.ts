import english from './english.json';
import korean from './korean.json';
import { Language } from 'SettingsModule/types';

const Component = {
  AppSearchBar: 'AppSearchBar'
} as const;

interface Labels {
  [Component.AppSearchBar]: {
    placeholder: string;
  };
}

export const labels: Record<Language, Labels> = {
  [Language.Kor]: korean,
  [Language.Eng]: english
};
