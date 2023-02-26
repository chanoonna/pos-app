import { Authentication } from 'modules/AuthenticationModule/Authentication';
import { Menu } from 'modules/MenuModule/Menu';
import { Module } from './types';

export const moduleHash: Record<Module, () => JSX.Element> = {
  [Module.Auth]: Authentication,
  [Module.Menu]: Menu
};
