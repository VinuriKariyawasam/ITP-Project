import { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas'; // Import html2canvas library
import jsPDF from 'jspdf';
import CompanyHeader from '../../../SM/SMmain/SMService/CompanyHeader';
import CompanyFooter from '../../../SM/SMmain/SMService/CompanyFooter';

const ReportPDFGenerator = ({ reports }) => {
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printableRef = useRef(null); // Ref for the printable component

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Format date as MM/DD/YYYY
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true); // Set generating PDF state to true
    try {
      const doc = new jsPDF();

      // Add CompanyHeader image as PDF header
      const headerCanvas = await html2canvas(document.getElementById('header-content'));
      const headerImgData = headerCanvas.toDataURL('image/jpeg');
      doc.addImage(headerImgData, 'JPEG', 10, 10, 190, 25);

      // Convert the printable component to an image using html2canvas
      const canvas = await html2canvas(printableRef.current);
      const imgData = canvas.toDataURL('image/jpeg');

      // Add empty space for row
      doc.setDrawColor(0); // Set color to white
      doc.setFillColor(255); // Set fill color to white
      doc.rect(10, 35, 190, 10, 'F'); // Add empty rectangle for space

      // Add table content
      doc.autoTable({
        head: [
          ["Report ID", "Vehicle Number", "Start Date", "End Date", "Total Service Price (Rs.)", "Services Done", "Inventory Used", "Borrowed Items", "Inventory Total Price (Rs.)", "Test Run Done", "Test Run Details", "Service Done Technician ID", "Test Done Technician ID"]
        ],
        body: reports.map(report => [
          report.serviceReportId,
          report.vehicleNumber,
          formatDate(report.selectedStartDate),
          formatDate(report.selectedEndDate),
          report.totalServicePrice,
          report.services.filter(service => service.completed).map(service => service.name).join(', '),
          report.inventoryUsed ? "Yes" : "No",
          report.borrowedItems,
          report.inventoryTotalPrice,
          report.testRunDone ? "Yes" : "No",
          report.testRunDetails,
          report.serviceDoneTechnicianId,
          report.testDoneTechnicianId
        ]),
      });

      // Get CompanyFooter image as base64
      const footerCanvas = await html2canvas(document.getElementById('footer-content'));
      const footerImgData = footerCanvas.toDataURL('image/jpeg');

      // Add CompanyFooter image as PDF footer
      doc.addImage(footerImgData, 'JPEG', 10, doc.internal.pageSize.height - 35, 190, 25);

      // Save PDF
      doc.save("report.pdf");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsGeneratingPDF(false); // Reset generating PDF state
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div id="header-content" style={{ display: isGeneratingPDF ? 'none' : 'block' }}>
        <CompanyHeader />
      </div>
      <div style={{ display: isGeneratingPDF ? 'none' : 'block' }} ref={printableRef}>
        {/* Add your report content here */}
      </div>
      <div id="footer-content" style={{ display: 'none' }}>
        <CompanyFooter />
      </div>
      <Button onClick={handleGeneratePDF} disabled={isGeneratingPDF}>
        {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF Report'}
      </Button>
    </div>
  );
};

export default ReportPDFGenerator;
