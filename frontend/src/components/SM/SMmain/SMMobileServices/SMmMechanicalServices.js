import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const SMmMechanicalService = props => {

  const [mechanicalRequests, setMechanicalRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  return (
    <main id="main" className="main">
      <div>
        <h2 className="SMmMechanicalService-heading">Mechanical Service Requests</h2>
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
            {mechanicalRequests.map((request) => (
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
        </Table>
        
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








/*import React from "react";
import '../SMMobileServices/SMmMechanicalServices'



const SMmMechanicalServices = props => {

  
    return (
      <main id="main" className="main">
        <div>

            <h2 className="pHeading">Mobile Mechanical Service Requests</h2>
            <div className="ptable">
                <table className='table table-bordered'>
                    <thead>
                        <tr>

                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Vehicle No</th>
                            <th>Request Date</th>
                            <th>Request Time</th>
                            <th>Location</th>
                            <th>Issue</th>
                            <th>Contact No</th>



                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {
                                
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        </main>

    )
}
export default SMmMechanicalServices;*/