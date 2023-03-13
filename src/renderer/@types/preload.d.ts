import type { ApiHandler } from 'preload/preload';

declare global {
  interface Window {
    api: ApiHandler;
  }
}

export {};
