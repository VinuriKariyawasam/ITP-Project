import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import logo from "../../../../images/Payment/neotechlogo.jpg";

const InvoiceComponent = () => {
  const componentRef = React.useRef();
  const [downloadingPDF, setDownloadingPDF] = React.useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    setDownloadingPDF(true);
    const element = componentRef.current;
    const options = {
      filename: "invoice.pdf",
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
                      Invoice #DS0204{" "}
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
                        <h5 className="font-size-15 mb-2">Nimal Perera</h5>
                        <p className="mb-1">
                          123, Main Street, Colombo 05, Sri Lanka
                        </p>
                        <p className="mb-1">nperera@gmail.com</p>
                        <p>+94 77 123 4567</p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-muted text-sm-end">
                        <div>
                          <h5 className="font-size-15 mb-1">Invoice No:</h5>
                          <p>#DZ0112</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                          <p>12 Oct, 2020</p>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-size-15 mb-1">Order No:</h5>
                          <p>#1123456</p>
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
                            <th>Price</th>
                            <th>Discount</th>
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
                            <td>Rs. 5640.00</td>
                            <td>0</td>
                            <td className="text-end">Rs. 5640.00</td>
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
                            <td>Rs. 2000.00</td>
                            <td>0</td>
                            <td className="text-end">Rs. 2000.00</td>
                          </tr>
                          <tr>
                            <th scope="row" colSpan="4" className="text-end">
                              Sub Total
                            </th>
                            <td className="text-end">Rs. 7640.00</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Discount :
                            </th>
                            <td className="border-0 text-end"> 0 </td>
                          </tr>

                          <tr>
                            <th
                              scope="row"
                              colSpan="4"
                              className="border-0 text-end"
                            >
                              Tax
                            </th>
                            <td className="border-0 text-end">0</td>
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
                              <h4 className="m-0 fw-semibold">Rs.7640.00</h4>
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
                            >
                              Download
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

export default InvoiceComponent;
