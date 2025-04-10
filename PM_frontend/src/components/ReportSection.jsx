import React, { useRef } from 'react';
import jsPDF from 'jspdf';

const ReportSection = ({ report }) => {
  const reportRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const marginLeft = 20;
    const lineHeight = 8;
    let y = 20;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Predictive Maintenance Report', marginLeft, y);
    y += lineHeight * 1.5;

    // Process and format report text
    const lines = report.split('\n');

    doc.setFontSize(12);

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        y += lineHeight / 2; // line break
      } else if (/^\d+\./.test(trimmed)) {
        // Numbered bullet (e.g., 1. , 2.)
        doc.setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(trimmed, 170);
        doc.text(textLines, marginLeft, y);
        y += textLines.length * lineHeight;
      } else if (trimmed.endsWith(':')) {
        // Bold headings
        doc.setFont(undefined, 'bold');
        doc.text(trimmed.replace('*', ''), marginLeft, y);
        y += lineHeight;
      } else {
        // Normal paragraph
        doc.setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(trimmed.replace(/^\*+/, '').trim(), 170);
        doc.text(textLines, marginLeft, y);
        y += textLines.length * lineHeight;
      }

      // Page break logic
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Predictive_Maintenance_Report.pdf');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg p-8">
      <div ref={reportRef} className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Predictive Maintenance Report</h2>
        {report.split('\n').map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <br key={idx} />;
          if (trimmed.endsWith(':')) return <h3 key={idx} className="font-bold mt-4">{trimmed.replace('*', '')}</h3>;
          if (/^\d+\./.test(trimmed)) return <p key={idx} className="ml-4">{trimmed}</p>;
          return <p key={idx}>{trimmed.replace(/^\*+/, '')}</p>;
        })}
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Download Report as PDF
      </button>
    </div>
  );
};

export default ReportSection;
