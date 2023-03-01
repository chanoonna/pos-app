import { Authentication } from 'modules/AuthenticationModule/Authentication';
import { Landing } from 'renderer/modules/LandingModule/Landing';
import { Module } from './types';

export const moduleHash: Record<Module, () => JSX.Element> = {
  [Module.Auth]: Authentication,
  [Module.Landing]: Landing
};
