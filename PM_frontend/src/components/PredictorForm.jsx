import React, { useState } from 'react';

const PredictorForm = () => {
  const [generating, setGenerating] = useState(false);

  const initialParams = {
    'Spindle Speed': '10',
    'Vibration Levels': '10',
    'Coolant Flow Rate': '10',
    'Motor Temperature': '10',
  };

  const [params, setParams] = useState(initialParams);

  const handleInputChange = (key, value) => {
    // Allow empty string or valid numbers only
    if (/^\d*$/.test(value)) {
      setParams((prev) => ({ ...prev, [key]: value }));
    }
  };

  const increase = (key) => {
    const current = parseInt(params[key]) || 0;
    setParams((prev) => ({ ...prev, [key]: (current + 1).toString() }));
  };

  const decrease = (key) => {
    const current = parseInt(params[key]) || 0;
    setParams((prev) => ({ ...prev, [key]: (current - 1).toString() }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Select Machine</h2>

        <select className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Machine 1</option>
          <option>Machine 2</option>
        </select>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-300">Input Parameters</h3>

        <div className="grid grid-cols-2 gap-6 bg-gray-700 p-6 rounded-xl">
          {Object.keys(params).map((param) => (
            <div key={param} className="flex flex-col items-center">
              <span className="font-medium text-gray-200">{param}</span>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decrease(param)}
                  className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-l text-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-20 text-center px-2 py-1 bg-gray-800 border border-gray-600 text-white focus:outline-none"
                  value={params[param]}
                  onChange={(e) => handleInputChange(param, e.target.value)}
                />
                <button
                  onClick={() => increase(param)}
                  className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-r text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setGenerating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-6 w-full transition duration-200"
        >
          Submit
        </button>

        {generating && (
          <div className="mt-6 p-4 bg-blue-100 text-blue-900 text-center rounded-lg shadow-sm">
            Generating Report Based on Parameters and Context...
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictorForm;
