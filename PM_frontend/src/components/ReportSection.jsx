import React, { useEffect, useRef } from 'react';

const ReportSection = ({ report }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [report]);

  return (
    <div className="w-full flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-4xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-400">Graphical View</h3>
          <h3 className="text-xl font-semibold text-blue-400">Report</h3>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* Graph on top */}
          <div className="bg-gray-700 text-white p-6 rounded-lg flex items-center justify-center text-sm md:text-base">
            [Graphs Placeholder]
          </div>

          {/* Report below */}
          <textarea
            ref={textAreaRef}
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg resize-y text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
            value={report || 'No report generated yet.'}
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-8 w-full transition duration-200">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportSection;
