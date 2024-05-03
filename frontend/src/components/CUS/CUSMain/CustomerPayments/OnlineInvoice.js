import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import logo from "../../../../images/Payment/neotechlogo.jpg";
import { useLocation } from "react-router-dom";

import axios from "axios";

const OnlineInvoice = ({toggleLoading}) => {
  const location = useLocation();
  const {
    state: { paymentId },
  } = location;


  const handleBackToHome=()=>{
    window.location.href = "/customer";
  }

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        toggleLoading(true)
        const response = await fetch(
          `${process.env.React_App_Backend_URL}/api/finance/billing/${paymentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch invoice data");
        }
        const data = await response.json();
        setInvoiceData(data.data);
        setLoading(false);


        

        // Automatically trigger upload PDF after fetching invoice data
        handleUploadPDF();
      } catch (error) {
        console.error("Error fetching invoice data:", error.message);
      }finally{
        toggleLoading(false)
      }
    };

    fetchInvoiceData();
  }, [paymentId]);

  useEffect(() => {
    if (!loading && invoiceData && !pdfUploaded) {
      handleUploadPDF();
      setPdfUploaded(true);
    }
  }, [loading, invoiceData, pdfUploaded]);

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    setDownloadingPDF(true);
    const element = componentRef.current;
    const options = {
      filename: `${paymentId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        setDownloadingPDF(false);
      });
  };

  const handleUploadPDF = async () => {
    setDownloadingPDF(true);
    const element = componentRef.current;

    try {
      const options = {
        margin: [0, 0, 0, 0],
        filename: `${paymentId}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Generate PDF file as blob
      const pdfBlob = await html2pdf()
        .from(element)
        .set(options)
        .toPdf()
        .output("blob");

      // Create FormData object
      const formData = new FormData();
      formData.append("file", pdfBlob, `${paymentId}.pdf`);

      // Send PDF file to the server
      const response = await axios.post(
        `${process.env.React_App_Backend_URL}/api/finance/billing/uploadinvoice`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

      // Extract necessary data from the response
      const { name, type, downloadURL } = response.data;

      // Prepare data for the database
      const postData = {
        paymentInvoiceId: paymentId,
        name: name,
        date: currentDate,
        amount: total, // Assuming the current date
        downloadURL: downloadURL,
      };

      // Send a POST request to the database
      const dbResponse = await axios.post(
        `${process.env.React_App_Backend_URL}/api/finance/invoices/addonline`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data saved to database:", dbResponse.data);


      const incomeData = {
        title: `Invoice ${paymentId}`,
        serviceInvoiceId: postData.paymentInvoiceId,
        amount: postData.amount,
        type: "Online Payment",
        date: postData.date,
        time: currentTime,
        status: "Received",
      };
      console.log(incomeData)
      
      const incomeResponse = await axios.post(
        `${process.env.React_App_Backend_URL}/api/finance/incomes/add-income`,
        incomeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const paymentHistoryData = {
        invoice_id:paymentId,
        name: invoiceData.name,
        email: email,
        amount: total,
        date: currentDate,
        url: downloadURL,

      }


      const PHResponse = await axios.post(
        `${process.env.React_App_Backend_URL}/api/finance/paymenthistory/add`,
        paymentHistoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      // Send email with the PDF attachment
      const emailOptions = {
        to: `${email}`, // Replace with recipient email address
        subject: `Online Payment Confirmation for Invoice ${paymentId}`,
        
        html: `<p><b>Dear Valued Customer</b></p>
              <p>We're delighted to inform you that your invoice is now ready for download. Please click the link below to download your invoice:</p>
              <p><a href="${downloadURL}" download>Download Invoice</a></p>
              <p>Should you have any questions or require further assistance, please don't hesitate to reach out to our team. We're always here to help.</p>
              <p>Thank you for choosing us as your trusted partner. We appreciate your business.</p>
              <p>Warm regards,</p>
              <p><b><i>Finance Division- Neo Tech Motors</i></b></p>`,
      };

      // Send a fetch request to the backend controller for sending email
      await fetch(`${process.env.React_App_Backend_URL}/api/finance/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailOptions.to,
          subject: emailOptions.subject,
          text: emailOptions.text,
          html: emailOptions.html,
        }),
      });

      console.log("Email sent successfully");


    } catch (error) {
      console.error("Error uploading file:", error.message);
    }

    setDownloadingPDF(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Destructure invoice data
  const {
    serviceRecordId,
    paymentInvoiceId,
    name,
    address,
    email,
    phone,
    partsPrice,
    partsDiscount,
    servicePrice,
    serviceDiscount,
    taxRate,
    total,
    currentDate,
    currentTime,
    status,
  } = invoiceData || {};

  // Function to format price in Rs.2000.00 format
  const formatPrice = (price) => {
    return `Rs.${price.toFixed(2)}`;
  };

  // Calculate total discount
  const totalDiscount =
    partsPrice * (partsDiscount / 100) + servicePrice * (serviceDiscount / 100);

  // Calculate tax amount
  const taxAmount = (total - totalDiscount) * (taxRate / 100);

  return (
    <main id="cusmain" className="cusmain">
      <Container>
        <div ref={componentRef}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <div className="invoice-title">
                    <h4 className="float-end font-size-15">
                      Invoice #{paymentInvoiceId}{" "}
                      <span className="badge bg-success font-size-12 ms-2">
                        Paid
                      </span>
                    </h4>
                    <div className="mb-4">
                      <img src={logo} alt="Invoice Logo" width="200px" />
                    </div>
                    <div className="text-muted">
                      <p className="mb-1">323/1/A Main Street Battaramulla</p>
                      <p className="mb-1">
                        <i className="uil uil-envelope-alt me-1"></i>{" "}
                        info@neotech.com
                      </p>
                      <p>
                        <i className="uil uil-phone me-1"></i> 0112887998
                      </p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="text-muted">
                        <h5 className="font-size-16 mb-3">Billed To:</h5>
                        <h5 className="font-size-15 mb-2">{name}</h5>
                        <p className="mb-1">{address}</p>
                        <p className="mb-1">{email}</p>
                        <p>{phone}</p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-muted text-sm-end">
                        <div>
                          <h5 className="font-size-15 mb-1">Invoice No:</h5>
                          <p>{paymentInvoiceId}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                          <p>{currentDate}</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Time</h5>
                          <p>{currentTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <h5 className="font-size-15">Order Summary</h5>

                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap table-centered mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th className="text-end" style={{ width: "120px" }}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">01</th>
                            <td>
                              <div>
                                <h5 className="text-truncate font-size-14 mb-1">
                                  Parts and Accessories
                                </h5>
                              </div>
                            </td>
                            <td>{formatPrice(partsPrice)}</td>
                            <td>
                              {formatPrice(partsPrice * (partsDiscount / 100))}
                            </td>
                            <td className="text-end">
                              {formatPrice(
                                partsPrice - partsPrice * (partsDiscount / 100)
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">02</th>
                            <td>
                              <div>
                                <h5 className="text-truncate font-size-14 mb-1">
                                  Service/Repair Charges
                                </h5>
                              </div>
                            </td>
                            <td>{formatPrice(servicePrice)}</td>
                            <td>
                              {formatPrice(
                                servicePrice * (serviceDiscount / 100)
                              )}
                            </td>
                            <td className="text-end">
                              {formatPrice(
                                servicePrice -
                                  servicePrice * (serviceDiscount / 100)
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Sub Total
                            </th>
                            <td className="border-0 text-end">
                              {formatPrice(
                                partsPrice -
                                  partsPrice * (partsDiscount / 100) +
                                  servicePrice -
                                  servicePrice * (serviceDiscount / 100)
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Discount
                            </th>
                            <td className="border-0 text-end">
                              {formatPrice(totalDiscount)}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Tax ({taxRate}%)
                            </th>
                            <td className="border-0 text-end">
                              {formatPrice(taxAmount)}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Total
                            </th>
                            <td className="border-0 text-end">
                              <h4 className="m-0 fw-semibold">
                                {formatPrice(total)}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-print-none mt-4">
                      <div className="float-end">
                        {!downloadingPDF && (
                          <>
                            <Button
                              variant="success"
                              onClick={handlePrint}
                              className="me-1"
                            >
                              Print
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleDownloadPDF}
                              className="me-1"
                            >
                              Download
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleBackToHome}
                            >
                            Back to Home
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </main>
  );
};

export default OnlineInvoice;
