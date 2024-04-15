import React, { useEffect, useState } from 'react';
import PageTitle from './PageTitle';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';

const ServiceOrders = () => {
  const [allServiceOrders, setAllServiceOrders] = useState([]);
  const [pendingServiceOrders, setPendingServiceOrders] = useState([]);

  useEffect(() => {
    const fetchAllServiceOrders = async () => {
      const response = await axios.get('http://localhost:5000/api/finance/service-record/all');
      setAllServiceOrders(response.data);
    };

    const fetchPendingServiceOrders = async () => {
      const response = await axios.get('http://localhost:5000/api/finance/service-record/pending');
      setPendingServiceOrders(response.data);
    };

    fetchAllServiceOrders();
    fetchPendingServiceOrders();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <PageTitle
          path="Finance / ServiceOrders"
          title="Service Orders"
        />
        <Container>
          <Row>
            <Col>
              <div>
                <h3>All Service Orders</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Service Report ID</th>
                      <th>Vehicle Number</th>
                      <th>Total for Parts/Accessories</th>
                      <th>Total for Services/Repairs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allServiceOrders.map(order => (
                      <tr key={order._id}>
                        <td>{order.serviceReportId}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>{order.inventoryTotalPrice}</td>
                        <td>{order.totalServicePrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col>
              <div>
                <h3>Pending Service Orders</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Service Report ID</th>
                      <th>Vehicle Number</th>
                      <th>Total for Parts/Accessories</th>
                      <th>Total for Services/Repairs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingServiceOrders.map(order => (
                      <tr key={order._id}>
                        <td>{order.serviceReportId}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>{order.inventoryTotalPrice}</td>
                        <td>{order.totalServicePrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default ServiceOrders;
