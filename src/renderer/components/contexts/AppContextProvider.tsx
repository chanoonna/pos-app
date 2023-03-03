import { useMemo, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { Module } from 'modules/types';
import { AppDataState } from 'utils/hook/useAppData/types';
import { Language } from 'SettingsModule/types';

interface AppDataProviderProps {
  navigateTo: (module: Module) => void;
  authenticate: (username: string, password: string) => void;
  setLanguage: (language: Language) => void;
  logOut: () => void;
  state: AppDataState;
}

type AppContextValues = Omit<AppDataProviderProps, 'state'> & {
  currentModule: Module;
  language: Language;
};

export const AddContextProvider = ({
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

export const AppContext = createContext<AppContextValues>(
  {} as AppContextValues
);

export const useAppContext = () => useContext(AppContext);
