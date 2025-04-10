import React, { useRef } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportSection = ({ report }) => {
  const reportRef = useRef();

  const handleDownload = () => {
    const lines = report.split('\n').map(line => line.trim()).filter(Boolean);

    const content = [
      { text: 'Predictive Maintenance Report', style: 'header' },
    ];

    lines.forEach((line) => {
      if (line.endsWith(':')) {
        content.push({ text: line.replace(/^\*+/g, ''), style: 'subheader', margin: [0, 10, 0, 4] });
      } else if (/^\d+\./.test(line)) {
        content.push({ text: line.replace(/^\*+/g, ''), style: 'listItem' });
      } else if (/^[-•]/.test(line)) {
        content.push({ ul: [line.replace(/^[-•]\s*/, '')], style: 'listItem' });
      } else {
        content.push({ text: line.replace(/^\*+/g, ''), style: 'paragraph' });
      }
    });

    const docDefinition = {
      pageMargins: [40, 50, 40, 50],
      content,
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          color: '#000000',
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: '#2b2b2b',
        },
        paragraph: {
          fontSize: 11,
          color: '#000000',
          margin: [0, 2],
        },
        listItem: {
          fontSize: 11,
          color: '#000000',
          margin: [0, 2],
        },
      },
      defaultStyle: {
        font: 'Helvetica',
      },
      // ✅ Background removed to make PDF white
    };

    pdfMake.createPdf(docDefinition).download('Predictive_Maintenance_Report.pdf');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-8">
      <div ref={reportRef} className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Predictive Maintenance Report</h2>
        {report.split('\n').map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <br key={idx} />;
          if (trimmed.endsWith(':')) return <h3 key={idx} className="font-bold mt-4 text-blue-300">{trimmed.replace(/^\*+/, '')}</h3>;
          if (/^\d+\./.test(trimmed)) return <p key={idx} className="ml-4">{trimmed.replace(/^\*+/, '')}</p>;
          if (/^[-•]/.test(trimmed)) return <li key={idx}>{trimmed.replace(/^[-•]/, '')}</li>;
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
