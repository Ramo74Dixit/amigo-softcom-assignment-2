import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faBolt, faChartBar } from '@fortawesome/free-solid-svg-icons';
const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/bill-generator');
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-red-600 overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?business,technology')] bg-cover bg-center opacity-30 transform scale-110 hover:scale-125 transition-all duration-700"></div>
      <div className="absolute top-1/4 left-1/3 h-24 w-24 bg-pink-400 rounded-full opacity-40 blur-lg animate-bounce-slow"></div>
      <div className="absolute top-1/2 right-1/4 h-20 w-20 bg-indigo-400 rounded-full opacity-40 blur-lg animate-bounce-slow delay-200"></div>
      <div className="absolute bottom-1/4 left-1/4 h-16 w-16 bg-yellow-400 rounded-full opacity-40 blur-lg animate-bounce-slow delay-500"></div>
      <header className="text-center mb-16 z-20 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 neon-text">Billing Made Easy</h1>
        <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto animate-fade-in">
          Generate professional, customizable bills in minutes. Perfect for businesses and freelancers.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold px-10 py-4 rounded-full shadow-2xl transform hover:scale-110 hover:shadow-neon transition-all duration-300 ease-in-out"
        >
          Get Started
        </button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 z-20 animate-slide-up">
        <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon">
          <FontAwesomeIcon icon={faFileAlt} className="h-12 w-12 mx-auto mb-4 text-indigo-300 animate-floating" />
          <h2 className="text-xl font-semibold mb-2 neon-text">Easy Bill Creation</h2>
          <p>Create professional bills with minimal effort and maximum customization.</p>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon">
          <FontAwesomeIcon icon={faBolt} className="h-12 w-12 mx-auto mb-4 text-yellow-300 animate-floating" />
          <h2 className="text-xl font-semibold mb-2 neon-text">Fast & Efficient</h2>
          <p>Generate bills quickly without any complex steps or lengthy procedures.</p>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon">
          <FontAwesomeIcon icon={faChartBar} className="h-12 w-12 mx-auto mb-4 text-green-300 animate-floating" />
          <h2 className="text-xl font-semibold mb-2 neon-text">Analytics & Tracking</h2>
          <p>Track your bills and monitor financial data easily from one platform.</p>
        </div>
      </section>
      <footer className="w-full py-6 text-center text-sm z-20 bg-black bg-opacity-50 mt-auto">
        <p>© 2024 Bill Generator | Designed with ❤️ by Ram Mohan</p>
      </footer>
    </div>
  );
};

export default LandingPage;
