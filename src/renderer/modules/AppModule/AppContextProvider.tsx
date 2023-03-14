import { useMemo, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { Module } from 'modules/types';
import { AppDataState } from './types';
import { LanguageCode } from 'SettingsModule/types';

interface AppDataProviderProps {
  navigateTo: (module: Module) => void;
  authenticate: (username: string, password: string) => void;
  setLanguage: (language: LanguageCode) => void;
  logOut: () => void;
  state: AppDataState;
}

type AppContextValues = Omit<AppDataProviderProps, 'state'> & {
  currentModule: Module;
  language: LanguageCode;
};

export const AppContextProvider = ({
  children,
  navigateTo,
  authenticate,
  setLanguage,
  logOut,
  state
}: AppDataProviderProps & { children: ReactNode }) => {
  const { currentModule, language } = state;
  const contextValue: AppContextValues = useMemo(
    () => ({
      navigateTo,
      authenticate,
      setLanguage,
      logOut,
      currentModule,
      language
    }),
    [authenticate, currentModule, language, navigateTo, setLanguage, logOut]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const AppContext = createContext<AppContextValues>({} as AppContextValues);

export const useAppContext = () => useContext(AppContext);
