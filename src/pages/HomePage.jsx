import React from "react";
import Navbar from "../components/Navbar";
import UploadArea from "../components/UploadArea";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex flex-col items-center justify-start pt-20">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
            FraudGuard AI
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 max-w-2xl mx-auto mb-12">
            Detect fake complaint images in food delivery scams using advanced
            AI analysis
          </p>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-semibold text-lg rounded-full shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Upload Area section */}
        <UploadArea />
      </div>
    </>
  );
};

export default HomePage;
