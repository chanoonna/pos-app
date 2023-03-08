import { Authentication } from 'modules/AuthenticationModule/Authentication';
import { Landing } from 'modules/LandingModule/Landing';
import { StartupMain } from 'modules/StartupModule/StartupMain';
import { Module } from './types';

export const moduleHash: Record<Module, () => JSX.Element> = {
  [Module.Auth]: Authentication,
  [Module.Landing]: Landing,
  [Module.Startup]: StartupMain
};
