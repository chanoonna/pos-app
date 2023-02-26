import { createRoot } from 'react-dom/client';
import { App } from './App';

window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
