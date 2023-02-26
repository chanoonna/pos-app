import { createContext } from 'react';
import type { ReactNode } from 'react';
import { Module } from 'modules/types';

interface AppDataProviderProps {
  navigateTo: (module: Module) => void;
  currentModule: Module;
}

interface AppContextValues {
  navigateTo: (module: Module) => void;
  currentModule: Module;
}

export const AddContextProvider = ({
  children,
  navigateTo,
  currentModule
}: AppDataProviderProps & { children: ReactNode }) => {
  const contextValue = {
    navigateTo,
    currentModule
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const AppContext = createContext<AppDataProviderProps>(
  {} as AppDataProviderProps
);
