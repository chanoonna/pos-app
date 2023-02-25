import { Home } from './Landing/Home';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/first" element={<div>First page</div>} />
    </Routes>
  );
};
