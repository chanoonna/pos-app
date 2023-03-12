import type { ApiRequestHandler } from 'preload/preload';

declare global {
  interface Window {
    api: ApiRequestHandler;
  }
}

export {};
