import React from 'react';
import jsPDF from 'jspdf';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportSection = ({ report, inputData }) => {
  const isFailure = report === 'Failed to generate report.';

  const handleDownload = () => {
    const doc = new jsPDF();
    const lines = report.split('\n');

    let y = 20;
    doc.setFont('Helvetica');
    doc.setFontSize(12);

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        y += 6;
        return;
      }

      if (trimmed.match(/^[A-Z].*:\s*$/)) {
        doc.setFont(undefined, 'bold');
        doc.text(trimmed, 14, y);
        doc.setFont(undefined, 'normal');
        y += 8;
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const text = trimmed.replace(/^[-•]\s*/, '');
        const split = doc.splitTextToSize(`• ${text}`, 180);
        doc.text(split, 14, y);
        y += split.length * 6;
      } else {
        const split = doc.splitTextToSize(trimmed, 180);
        doc.text(split, 14, y);
        y += split.length * 6;
      }

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Predictive_Maintenance_Report.pdf');
  };

  const chartData = {
    labels: Object.keys(inputData || {}),
    datasets: [
      {
        label: 'Input Parameters',
        data: Object.values(inputData || {}).map(Number),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Machine Parameters Overview',
        color: 'white',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
      },
    },
  };

  return (
    <div className="w-full bg-gray-800 text-white p-6 rounded-2xl shadow-xl mt-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-blue-300 mb-4">Predictive Maintenance Report</h3>

      {/* Always show the chart */}
      <div className="bg-gray-700 p-4 rounded-xl mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Report or Error Message */}
      <div className="space-y-4 whitespace-pre-wrap">
        {isFailure ? (
          <p className="text-red-400 text-lg font-semibold text-center">
            ⚠️ Unable to generate report. Please check input parameters or try again later.
          </p>
        ) : (
          report.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={idx} className="h-2" />;

            if (/^[A-Z].*:\s*$/.test(trimmed)) {
              return (
                <p key={idx} className="font-bold text-lg mt-4 mb-2 text-blue-400">
                  {trimmed}
                </p>
              );
            }

            if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
              return (
                <p key={idx} className="ml-4 before:content-['•'] before:mr-2 text-white">
                  {trimmed.replace(/^[-•]\s*/, '')}
                </p>
              );
            }

            return <p key={idx}>{trimmed}</p>;
          })
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition duration-200"
          disabled={isFailure}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportSection;
