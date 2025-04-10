import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportSection = ({ report }) => {
  const reportRef = useRef();

  const handleDownload = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Predictive_Maintenance_Report.pdf');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg p-8">
      <div ref={reportRef} className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Predictive Maintenance Report</h2>
        {report.split('\n').map((line, idx) => {
          if (line.startsWith('*')) {
            return <p key={idx} className="font-semibold mt-2">{line.replace(/^\*/, '').trim()}</p>;
          } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
            return <p key={idx} className="ml-4">{line}</p>;
          } else if (line.trim() === '') {
            return <br key={idx} />;
          } else {
            return <p key={idx}>{line}</p>;
          }
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
