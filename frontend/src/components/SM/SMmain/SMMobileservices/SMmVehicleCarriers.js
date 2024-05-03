import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Form, Stack ,Container, Row ,Col} from "react-bootstrap";
import jsPDF from 'jspdf';
import logo from "../../../../images/Payment/neotechlogo.jpg";

const SMmVehicleCarriers = ({toggleLoading}) => {

  const [carrierRequests, setCarrierRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState('');

  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [reqLocation, setReqLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [contactNo, setContactNo] = useState("");

  useEffect(() => {
    getVehicleCarrierRequests();
  }, []);

  const getVehicleCarrierRequests = () => {
      toggleLoading(true); // Set loading to true before API call
    axios.get(`${process.env.React_App_Backend_URL}/api/mobile/get-vehiclecarrier`)
      .then((res) => {
        setCarrierRequests(res.data);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => {
        toggleLoading(false); // Set loading to false after API call
      });
  };

  const handleTableRowClick = (request) => {
    setCusName(request.cusName);
    setCusEmail(request.cusEmail);
    setVehicleNo(request.vehicleNo);
    setReqDate(request.reqDate);
    setReqTime(request.reqTime);
    setReqLocation(request.reqLocation);
    setAdditionalInfo(request.additionalInfo);
    setContactNo(request.contactNo);
  };

  const handleMoreButtonClick = (request) => {
    setSelectedRequest(request);
  };

  const handleCardClose = () => {
    setSelectedRequest(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setSearch('');
  };

  const deleteRequest = (id) => {
    const shouldDelete = window.confirm("Please confirm deletion!");
    if (shouldDelete) {
        toggleLoading(true);
      axios.delete(`${process.env.React_App_Backend_URL}/api/mobile/delete-vehiclecarrier/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          toggleLoading(false); // Set loading to false after API call
        });
    }
  };

  const handleDownloadReports = () => {
    const doc = new jsPDF();
  
    // Create an Image object for the logo
    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = logoImg.width;
      canvas.height = logoImg.height;

      // Draw the logo onto the canvas
      ctx.drawImage(logoImg, 0, 0);

      // Convert canvas to data URL
      const logoDataUrl = canvas.toDataURL("image/jpeg");

      // Add the logo image and company details to the PDF
      doc.addImage(logoDataUrl, "JPEG", 10, 10, 60, 30);
      doc.setFontSize(12);
      doc.setTextColor(128, 128, 128); // Set text color to black
      doc.text("323/1/A Main Street Battaramulla", 10, 55); // Adjusted position
      doc.text("info@neotech.com", 10, 59); // Adjusted position for email
      doc.text("0112887998", 10, 63); // Adjusted position for phone number
      doc.setLineWidth(0.5);//add a line
      doc.line(10, 68, 200, 68); // Adjusted vertical position of the line
      doc.setFont("helvetica", "bold"); //add report header
      doc.setTextColor(0, 0, 0);
      doc.text("Vehicle Carrier Requests", 10, 76);

       // Set font size for the table
      doc.setFontSize(10);
      // Add table
      const tableColumns = [
        "Customer Name",
        //"Customer Email",
        "Vehicle No",
        "Date",
        //"Time",
        "Location",
        "Current Info",
        "Contact No",
      ];
      const tableData = carrierRequests.map((request) => [
        request.cusName,
        //request.cusEmail,
        request.vehicleNo,
        request.reqDate,
        //request.reqTime,
        request.reqLocation,
        request.additionalInfo,
        request.contactNo,
      ])
      doc.autoTable({
        startY: 80, // Adjusted startY to leave space for the logo
        head: [tableColumns],
        body: tableData,
        theme: "plain",
        didDrawPage: function (data) {
          // Add table heading on each page
          doc.setFontSize(16);
          doc.setTextColor(0, 0, 255);
        },
        tableWidth: 'auto', 
      });
      doc.save("Vehicle_Carrier_Requests.pdf");
    };
  };


  return (
    <main id="main" className="main">
      <div>
      <Link to='/staff/sm/mobilemain'>
      <Button variant="outline-dark"  ><i class="bi bi-arrow-left-square-fill"></i></Button></Link>
        <h2 className="SMmMechanicalService-heading">Vehicle Carrier Service Requests</h2>
        <Row><Col><Stack direction="horizontal" gap={1}><div>
            <i class="bi bi-search"></i></div><div>
            <Form.Group controlId="search">
              <Form.Control type="text" placeholder="Search here by vehicle No" value={search} onChange={handleSearch} />
            </Form.Group> </div><div>
            <Button variant="outline-dark" onClick={clearFilters}>Clear Search</Button>
          </div></Stack></Col>
          <Col><Button variant="outline-dark" onClick={handleDownloadReports}>Download report of Vehicle carrier requests</Button>
          </Col></Row><br />
          <Container className="my-4" id="RequestC">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Vehicle No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Current Info</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {carrierRequests
            .filter((request) =>
                  request.vehicleNo?.toLowerCase().includes(search.toLowerCase())
                  )
            .map((request) => (
              <tr key={request._id} onClick={() => handleTableRowClick(request)}>
                <td>{request.cusName}</td>
                <td>{request.cusEmail}</td>
                <td>{request.vehicleNo}</td>
                <td>{request.reqDate}</td>
                <td>{request.reqTime}</td>
                <td>{request.reqLocation}</td>
                <td>{request.additionalInfo}</td>
                <td>{request.contactNo}</td>
                <td>
                  <Button variant="secondary" onClick={() => handleMoreButtonClick(request)}>
                    view
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteRequest(request._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table></Container>
        
        {selectedRequest && (
          <Card>
            <Card.Body>
              <button type="button" className="btn-close" aria-label="Close"  onClick={handleCardClose}></button>
              <Card.Title>Selected Request Details</Card.Title>
              <Card.Text>
                <strong>Customer Name: </strong>{selectedRequest.cusName}<br />
                <strong>Email: </strong>{selectedRequest.cusEmail}<br />
                <strong>Vehicle No: </strong>{selectedRequest.vehicleNo}<br />
                <strong>Date: </strong>{selectedRequest.reqDate}<br />
                <strong>Time: </strong>{selectedRequest.reqTime}<br />
                <strong>Location: </strong>{selectedRequest.reqLocation}<br />
                <strong>Current Info: </strong>{selectedRequest.additionalInfo}<br />
                <strong>Contact No: </strong>{selectedRequest.contactNo}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </main>
  )
}

export default SMmVehicleCarriers;