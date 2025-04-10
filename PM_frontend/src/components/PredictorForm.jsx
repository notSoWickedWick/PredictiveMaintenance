import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportSection from './ReportSection';

const PredictorForm = () => {
  const [generating, setGenerating] = useState(false);
  const [machineType, setMachineType] = useState('Rotatory Device');
  const [report, setReport] = useState('');

  const machineParamsMap = {
    'Rotatory Device': {
      'Operating Speed': 'RPM',
      'Vibration Measurement': 'mm/s',
      'Temperature': '°C',
      'Noise Level': 'dB',
    },
    'Industrial Boiler': {
      'Pressure': 'psi',
      'Temperature': '°C',
      'Vibration': 'mm/s',
      'Feed Water Quality': 'ppm',
    },
  };

  const getDefaultParams = (machine) => {
    const paramSet = machineParamsMap[machine];
    const defaultParams = {};
    Object.keys(paramSet).forEach((key) => {
      defaultParams[key] = '10';
    });
    return defaultParams;
  };

  const [params, setParams] = useState(getDefaultParams(machineType));

  // Update parameter fields when machineType changes
  useEffect(() => {
    setParams(getDefaultParams(machineType));
  }, [machineType]);

  const handleInputChange = (key, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setParams((prev) => ({ ...prev, [key]: value }));
    }
  };

  const increase = (key) => {
    const current = parseFloat(params[key]) || 0;
    setParams((prev) => ({ ...prev, [key]: (current + 1).toString() }));
  };

  const decrease = (key) => {
    const current = parseFloat(params[key]) || 0;
    setParams((prev) => ({ ...prev, [key]: (current - 1).toString() }));
  };

  const handleSubmit = async () => {
    setGenerating(true);
    setReport('');

    try {
      const response = await axios.post('http://localhost:3000/analyze', {
        machineType,
        data: params,
      });

      setReport(response.data.report || 'No report received.');
    } catch (error) {
      console.error(error);
      setReport('Failed to generate report.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-900 px-4">
      {/* Predictor Form */}
      <div className="w-full max-w-3xl bg-gray-800 text-white shadow-2xl rounded-2xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Select Machine</h2>

        <select
          value={machineType}
          onChange={(e) => setMachineType(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Rotatory Device</option>
          <option>Industrial Boiler</option>
        </select>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-300">Input Parameters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-700 p-6 rounded-xl">
          {Object.entries(machineParamsMap[machineType]).map(([param, unit]) => (
            <div key={param} className="flex flex-col items-center text-center">
              <span className="font-medium text-gray-200 mb-2">
                {param} <span className="text-sm text-gray-400">({unit})</span>
              </span>
              <div className="flex items-center">
                <button
                  onClick={() => decrease(param)}
                  className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-l text-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-24 text-center px-2 py-1 bg-gray-800 border border-gray-600 text-white focus:outline-none"
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
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-6 w-full transition duration-200"
        >
          Submit
        </button>
      </div>

      {/* Report Section - full width below the form */}
      <div className="w-full mt-8">
        {generating ? (
          <div className="p-4 bg-blue-100 text-blue-900 text-center rounded-lg shadow-sm max-w-3xl mx-auto">
            Generating Report Based on Parameters and Context...
          </div>
        ) : (
          report && <ReportSection report={report} />
        )}
      </div>
    </div>
  );
};

export default PredictorForm;
