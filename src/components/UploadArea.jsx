import React, { useState } from "react";

const UploadArea = () => {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging
            ? "border-purple-400 bg-purple-50 dark:bg-purple-900/20"
            : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
        }`}
      >
        {image ? (
          <div className="space-y-6">
            <img
              src={image}
              alt="Uploaded complaint"
              className="max-h-96 mx-auto rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setImage(null)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-6xl">📸</div>
            <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
              Drop your complaint image here
            </p>
            <p className="text-gray-500 dark:text-gray-400">or</p>
            <label className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-full cursor-pointer hover:bg-purple-700 transition transform hover:scale-105">
              Browse Files
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-8 text-center">
          <button className="px-10 py-5 bg-linear-to-r from-green-600 to-emerald-600 text-white text-xl font-bold rounded-full shadow-2xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105">
            Analyze Image for Fraud
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
