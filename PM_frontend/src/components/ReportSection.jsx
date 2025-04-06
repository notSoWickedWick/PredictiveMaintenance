import React from 'react';

const ReportSection = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-4xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-400">Report</h3>
          <h3 className="text-xl font-semibold text-blue-400">Graphical View</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <textarea 
            className="w-full h-40 p-4 bg-gray-700 border border-gray-600 rounded-lg resize-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
            value="Textual Prediction from RAG Architecture"
          />

          <div className="bg-gray-700 text-white p-6 rounded-lg flex items-center justify-center text-sm md:text-base">
            [Graphs Placeholder]
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-8 w-full transition duration-200">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportSection;
