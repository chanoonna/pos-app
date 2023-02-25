import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Entry } from 'Landing/Entry';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
      </Routes>
    </Router>
  );
};
