import React, { useRef } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
        <div
          className="container"
          style={{ marginTop: "20px", backgroundColor: "#eee" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card"
                style={{
                  boxShadow: "0 20px 27px 0 rgb(0 0 0 / 5%)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "0",
                  wordWrap: "break-word",
                  backgroundColor: "#fff",
                  backgroundClip: "border-box",
                  border: "0 solid rgba(0,0,0,.125)",
                  borderRadius: "1rem",
                }}
              >
                <div className="card-body" ref={componentRef}>
                  <div className="invoice-title">
                    <h4 className="float-end font-size-15">
                      Invoice #DS0204{" "}
                      <span className="badge bg-success font-size-12 ms-2">
                        Paid
                      </span>
                    </h4>
                    <div className="mb-4">
                      <h2 className="mb-1 text-muted">Bootdey.com</h2>
                    </div>
                    <div className="text-muted">
                      <p className="mb-1">
                        3184 Spruce Drive Pittsburgh, PA 15201
                      </p>
                      <p className="mb-1">
                        <i className="uil uil-envelope-alt me-1"></i>{" "}
                        xyz@987.com
                      </p>
                      <p>
                        <i className="uil uil-phone me-1"></i> 012-345-6789
                      </p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="row">
                    {/* Billed To */}
                    <div className="col-sm-6">
                      <BilledTo />
                    </div>
                    {/* Invoice Details */}
                    <div className="col-sm-6">
                      <InvoiceDetails />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <OrderSummary handlePrint={handlePrint} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <PDFViewer>
          <InvoicePDF />
        </PDFViewer>
      </div>
    </>
  );
};

const BilledTo = () => {
  return (
    <div className="text-muted">
      <h5 className="font-size-16 mb-3">Billed To:</h5>
      <h5 className="font-size-15 mb-2">Preston Miller</h5>
      <p className="mb-1">4068 Post Avenue Newfolden, MN 56738</p>
      <p className="mb-1">PrestonMiller@armyspy.com</p>
      <p>001-234-5678</p>
    </div>
  );
};

const InvoiceDetails = () => {
  return (
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
  );
};

const OrderSummary = ({ handlePrint }) => {
  return (
    <div className="py-2">
      <h5 className="font-size-15">Order Summary</h5>
      <div className="table-responsive">
        <table className="table align-middle table-nowrap table-centered mb-0">
          {/* Table structure */}
        </table>
      </div>
      <div className="d-print-none mt-4">
        <div className="float-end">
          <button onClick={handlePrint} className="btn btn-success me-1">
            <i className="fa fa-print"></i> Print
          </button>
          <a href="#" className="btn btn-primary w-md">
            Send
          </a>
        </div>
      </div>
    </div>
  );
};

const InvoicePDF = () => {
  const styles = StyleSheet.create({
    page: {
      padding: 50,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    text: {
      fontSize: 12,
      marginBottom: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.text}>Bootdey.com</Text>
          <Text style={styles.text}>
            3184 Spruce Drive Pittsburgh, PA 15201
          </Text>
          {/* Add more text as needed */}
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
