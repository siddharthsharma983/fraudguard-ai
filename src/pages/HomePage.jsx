import React from "react";
import Navbar from "../components/Navbar"; // <-- yeh line add kar

const HomePage = () => {
  return (
    <>
      <Navbar /> {/* <-- yeh add kar */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
            FraudGuard AI
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 max-w-2xl mx-auto">
            Detect fake complaint images in food delivery scams using advanced
            AI analysis
          </p>
          <button className="mt-12 px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-semibold text-lg rounded-full shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
