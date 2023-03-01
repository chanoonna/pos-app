import { useMemo } from 'react';
import { createContext } from 'react';
import type { ReactNode } from 'react';
import { Module } from 'modules/types';
import { AppDataState } from 'utils/hook/useAppData/types';
import { Language } from 'SettingsModule/types';

interface AppDataProviderProps {
  navigateTo: (module: Module) => void;
  authenticate: (username: string, password: string) => void;
  state: AppDataState;
}

interface AppContextValues {
  navigateTo: (module: Module) => void;
  authenticate: (username: string, password: string) => void;
  currentModule: Module;
  language: Language;
}

export const AddContextProvider = ({
  children,
  navigateTo,
  authenticate,
  state
}: AppDataProviderProps & { children: ReactNode }) => {
  const { currentModule, language } = state;
  const contextValue: AppContextValues = useMemo(
    () => ({
      navigateTo,
      authenticate,
      currentModule,
      language
    }),
    [authenticate, currentModule, language, navigateTo]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const AppContext = createContext<AppContextValues>(
  {} as AppContextValues
);
