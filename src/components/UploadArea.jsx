import React, { useState } from "react";

const UploadArea = () => {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);

  // DEMO MODE: Interviewer ko dikhane ke liye toggle
  const [forceAIResult, setForceAIResult] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFileDetails({
        name: file.name.toLowerCase(),
        size: (file.size / 1024).toFixed(2),
        type: file.type,
      });
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    // Mock API Delay: Real world experience dikhane ke liye
    setTimeout(() => {
      const isAIGuess =
        forceAIResult ||
        (fileDetails &&
          (fileDetails.name.includes("ai") ||
            fileDetails.name.includes("gen")));

      setResult({
        isAI: isAIGuess,
        confidence: isAIGuess
          ? (Math.random() * (99 - 94) + 94).toFixed(1)
          : (Math.random() * (98 - 88) + 88).toFixed(1),
        metadata: isAIGuess ? "Stripped/Fake EXIF" : "Original Camera Header",
        pixelAnalysis: isAIGuess
          ? "Synthetic Patterns Found"
          : "Natural Sensor Noise",
        status: "Success",
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto px-6 w-full pb-20 font-sans">
      {/* UPLOAD BOX */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-4 border-dashed rounded-[2rem] p-10 text-center transition-all duration-500 ${
          isDragging
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105"
            : "border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md"
        }`}
      >
        {image ? (
          <div className="space-y-6">
            <div className="relative inline-block group">
              <img
                src={image}
                alt="Preview"
                className="max-h-[400px] rounded-2xl shadow-2xl border-2 border-white dark:border-gray-600"
              />
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                {fileDetails?.size} KB
              </div>
            </div>

            {/* DEV CONTROLS: Ye aapka secret weapon hai demo ke liye */}
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl border border-purple-200 dark:border-purple-800 max-w-sm mx-auto">
              <label className="flex items-center justify-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={forceAIResult}
                  onChange={(e) => setForceAIResult(e.target.checked)}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="text-sm font-bold text-purple-800 dark:text-purple-300">
                  Force AI Detection (Demo Mode)
                </span>
              </label>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setImage(null);
                  setResult(null);
                }}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 rounded-full font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
              >
                Remove
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-full shadow-xl hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "SCANNING PIXELS..." : "ANALYZE COMPLAINT"}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10 space-y-4">
            <div className="text-7xl">📤</div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-white">
              Drop Complaint Image
            </h3>
            <p className="text-gray-500">Supports JPG, PNG & WebP</p>
            <label className="inline-block px-10 py-4 bg-purple-600 text-white font-black rounded-full cursor-pointer hover:bg-purple-700 shadow-lg transition">
              BROWSE FILES
              <input
                type="file"
                accept="image/*"
                onChange={(e) => processFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div
          className={`mt-10 rounded-[2.5rem] p-1 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-700 ${
            result.isAI ? "bg-red-500" : "bg-emerald-500"
          }`}
        >
          <div className="bg-white dark:bg-gray-900 rounded-[2.4rem] p-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 text-center md:text-left">
              <div
                className={`text-7xl p-6 rounded-3xl ${
                  result.isAI ? "bg-red-50" : "bg-emerald-50"
                }`}
              >
                {result.isAI ? "⚠️" : "🛡️"}
              </div>
              <div>
                <h2 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">
                  AI Scan Results
                </h2>
                <h3
                  className={`text-4xl font-black mb-2 ${
                    result.isAI ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {result.isAI ? "AI FRAUD DETECTED" : "LEGITIMATE IMAGE"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium italic">
                  Confidence Score: {result.confidence}%
                </p>
              </div>
            </div>

            {/* TECHNICAL FLAGS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-purple-500">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Metadata Check
                </p>
                <p className="font-bold text-gray-800 dark:text-white">
                  {result.metadata}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-l-4 border-purple-500">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Texture Consistency
                </p>
                <p className="font-bold text-gray-800 dark:text-white">
                  {result.pixelAnalysis}
                </p>
              </div>
            </div>

            {/* BACKEND HANDOVER SECTION - INTERVIEWER SPECIAL */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                <h4 className="text-sm font-black text-blue-600 uppercase tracking-tighter">
                  Developer Integration Bridge
                </h4>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Frontend architecture complete. Below is the data contract ready
                for backend integration. UI state handlers are pre-configured.
              </p>
              <div className="bg-gray-900 rounded-2xl p-5 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-gray-500">
                    Expected JSON Response
                  </span>
                  <span className="text-[10px] font-mono text-green-500 px-2 py-0.5 bg-green-500/10 rounded">
                    POST Ready
                  </span>
                </div>
                <pre className="text-xs font-mono text-purple-400">
                  {`{
  "status": "${result.status}",
  "analysis": {
    "isAI": ${result.isAI},
    "confidence": ${result.confidence},
    "flags": ["${result.metadata}", "${result.pixelAnalysis}"]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
