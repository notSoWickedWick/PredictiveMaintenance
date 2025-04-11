import React, { useEffect } from 'react';
import jsPDF from 'jspdf';

const ReportSection = ({ report }) => {
  useEffect(() => {
    if (report && report.trim()) {
      const saved = JSON.parse(localStorage.getItem("savedReports") || "[]");
      const now = new Date();
      const newReport = {
        text: report,
        date: now.toLocaleString(),
      };
      localStorage.setItem("savedReports", JSON.stringify([newReport, ...saved]));
    }
  }, [report]);

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

  return (
    <div className="min-h-screen w-full bg-gray-800 text-white py-10 px-4">
      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-300 mb-4">Predictive Maintenance Report</h3>

        <div className="space-y-4 whitespace-pre-wrap">
          {report?.trim() ? (
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
          ) : (
            <p className="text-gray-300 italic">No report available. Check back after generation.</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition duration-200"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
