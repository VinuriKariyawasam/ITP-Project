import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Form, Stack ,Container, Row ,Col} from "react-bootstrap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SMmMechanicalService = props => {

  const [mechanicalRequests, setMechanicalRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState('');

  const [cusName, setCusName] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [reqLocation, setReqLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [contactNo, setContactNo] = useState("");

  useEffect(() => {
    getMechanicalRequests();
  }, []);

  const getMechanicalRequests = () => {
    axios.get("http://localhost:5000/api/mobile/get-mechanical")
      .then((res) => {
        setMechanicalRequests(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleTableRowClick = (request) => {
    setCusName(request.cusName);
    setCusEmail(request.cusEmail);
    setVehicleNo(request.vehicleNo);
    setReqDate(request.reqDate);
    setReqTime(request.reqTime);
    setReqLocation(request.reqLocation);
    setIssue(request.issue);
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
      axios.delete(`http://localhost:5000/api/mobile/delete-mechanical/${id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleDownloadReports = () => {
    const container = document.getElementById("RequestC");
  
    if (container) {
      html2canvas(container).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save("Mechanical_Requests.pdf");
      });
    }
  };

  return (
    <main id="main" className="main">
      <div>
      <Link to='/staff/sm/mobilemain'>
      <Button variant="outline-dark"  ><i class="bi bi-arrow-left-square-fill"></i></Button></Link>
        <h2 className="SMmMechanicalService-heading">Mechanical Service Requests</h2>
        <Row><Col><Stack direction="horizontal" gap={1}><div>
            <i class="bi bi-search"></i></div><div>
            <Form.Group controlId="search">
              <Form.Control type="text" placeholder="Search here by vehicle No" value={search} onChange={handleSearch} />
            </Form.Group> </div><div>
            <Button variant="outline-dark" onClick={clearFilters}>Clear Search</Button>
          </div></Stack></Col>
          <Col><Button variant="outline-dark" onClick={handleDownloadReports}>Download report of Mechanical requests</Button>
          </Col>
          </Row><br />
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
              <th>Issue</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
          {mechanicalRequests
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
                <td>{request.issue}</td>
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
                <strong>Issue: </strong>{selectedRequest.issue}<br />
                <strong>Contact No: </strong>{selectedRequest.contactNo}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </main>
  )
}

export default SMmMechanicalService;