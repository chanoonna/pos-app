import english from './english.json';
import korean from './korean.json';
import { Language } from 'SettingsModule/types';

const Component = {
  Login: 'Login'
} as const;

interface Labels {
  [Component.Login]: {
    login: string;
    username: string;
    password: string;
  };
}

export const labels: Record<Language, Labels> = {
  [Language.Kor]: korean,
  [Language.Eng]: english
};
