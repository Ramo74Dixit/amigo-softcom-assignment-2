import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './HeroSection';  // Import the landing page
import Bill from './Bill';  // Your bill generator component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for the bill generator */}
        <Route path="/bill-generator" element={<Bill />} />
      </Routes>
    </Router>
  );
}

export default App;
