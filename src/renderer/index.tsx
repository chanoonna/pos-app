import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { rootRouter } from './Router/Root';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<RouterProvider router={rootRouter} />);
}
