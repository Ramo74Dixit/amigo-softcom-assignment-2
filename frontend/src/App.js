import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './HeroSection';  
import Bill from './Bill';   

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bill-generator" element={<Bill />} />
      </Routes>
    </Router>
  );
}

export default App;
