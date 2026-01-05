import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
          FraudGuard AI
        </h1>
        <p className="text-xl md:text-2xl text-white opacity-90 max-w-2xl mx-auto">
          Detect fake complaint images in food delivery scams using advanced AI
          analysis
        </p>
        <button className="mt-12 px-8 py-4 bg-white text-purple-600 font-semibold text-lg rounded-full shadow-2xl hover:bg-gray-100 transition transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
