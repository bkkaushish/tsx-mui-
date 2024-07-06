import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDetail />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;