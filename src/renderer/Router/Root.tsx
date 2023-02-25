import { createMemoryRouter } from 'react-router-dom';
import { Authentication } from 'renderer/Landing/Authentication';
import { App } from 'renderer/App';

export const rootRouter = createMemoryRouter([
  {
    path: '/',
    element: <Authentication />
  },
  {
    path: '/home/*',
    element: <App />
  }
]);
