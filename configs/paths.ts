import path from 'path';

export const ROOT = path.join(__dirname, '../');
export const SRC = path.join(ROOT, 'src');
export const SRC_PRELOAD = path.join(SRC, 'preload');
export const SRC_RENDERER = path.join(SRC, 'renderer');
export const DIST = path.join(ROOT, '.dist');
export const DIST_PACKAGE = path.join(DIST, 'package');
export const DIST_BUILD = path.join(DIST, 'build');
export const DIST_BUILD_NODE_MODULES = path.join(DIST_BUILD, 'node_modules');
