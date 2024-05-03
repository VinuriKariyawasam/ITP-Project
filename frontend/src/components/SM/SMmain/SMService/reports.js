import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Row, Form, FormGroup, FormLabel, Col, FormControl, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function Report( {toggleLoading}) {
    const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedTestDate, setSelectedTestDate] = useState(new Date());
  const { handleSubmit } = useForm();

  const [services, setServices] = useState([
    { id: 1, name: "Cut and Polish", completed: false, price: "" },
    { id: 2, name: "Brake Inspection and Service", completed: false, price: "" },
    { id: 3, name: "Oil Change", completed: false, price: "" },
    { id: 4, name: "Body Wash and Interior Cleaning", completed: false, price: "" },
    { id: 5, name: "Wheel Alignment", completed: false, price: "" },
    { id: 6, name: "Battery Inspection and Replacement", completed: false, price: "" },
    { id: 7, name: "Coolant System Flush and Fill", completed: false, price: "" },
    { id: 8, name: "Suspension Inspection", completed: false, price: "" },
    { id: 9, name: "Electrical System Check", completed: false, price: "" },
    { id: 10, name: "General Vehicle Inspection", completed: false, price: "" },
  ]);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [inventoryUsed, setInventoryUsed] = useState(false);
  const [borrowedItems, setBorrowedItems] = useState("");
  const [inventoryTotalPrice, setInventoryTotalPrice] = useState(0);
  const [testRunDone, setTestRunDone] = useState(false);
  const [testRunDetails, setTestRunDetails] = useState("");
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [serviceDoneTechnicianId, setServiceDoneTechnicianId] = useState(""); // Service Done Technician ID
  const [testDoneTechnicianId, settestDoneTechnicianId] = useState(""); // Test run Done Technician ID
  const [serviceReportIdCounter, setServiceReportIdCounter] = useState(1);

   // Generate Service Report ID
  const generateServiceReportId = () => {
    const formattedId = `SM${serviceReportIdCounter.toString().padStart(2, '0')}`;
    return formattedId;
  };

  // Increment serviceReportIdCounter
  const incrementServiceReportCounter = () => {
    setServiceReportIdCounter((prevCounter) => prevCounter + 1);
  };

  // Auto-calculate Total Service Price
  useEffect(() => {
    let totalPrice = 0;
    services.forEach((service) => {
      if (service.completed && service.price !== "") {
        totalPrice += parseFloat(service.price);
      }
    });
    setTotalServicePrice(totalPrice);
  }, [services]);


  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleTestDateChange = (date) => {
    setSelectedTestDate(date);
  };

  const calculateTotalServicePrice = () => {
    let totalPrice = 0;
    services.forEach((service) => {
      if (service.completed && service.price !== "") {
        totalPrice += parseFloat(service.price);
      }
    });
    setTotalServicePrice(totalPrice);
  };

  const onSubmit = async (data) => {
    calculateTotalServicePrice();
  
    const serviceReportId = generateServiceReportId();
  
    const formData = {
      ...data,
      serviceReportId,
      vehicleNumber,
      selectedStartDate,
      selectedEndDate,
      selectedTestDate,
      services,
      inventoryUsed,
      borrowedItems,
      inventoryTotalPrice,
      testRunDone,
      testRunDetails,
      totalServicePrice,
      serviceDoneTechnicianId,
      testDoneTechnicianId,
    };
  
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Form submitted successfully!");
        // Reset form fields or show success message
        incrementServiceReportCounter(); // Increment ID counter for next report
        navigate("/staff/sm/report/");
      } else {
        console.error('Failed to submit report');
        // Handle failure (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      // Handle error (e.g., show error message to user)
    }
    finally{
      toggleLoading(false);
    }
  };
  
  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Service Report</h2>

        <FormGroup as={Row} controlId="formServiceReportId">
          <FormLabel column sm={3} className="text-right">
            Service Report ID
          </FormLabel>
          <Col sm={7}>
            <FormControl
              type="text"
              value={generateServiceReportId()}
              readOnly
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formVehiNumber">
          <FormLabel column sm={3} className="text-right">
            Vehicle Number
          </FormLabel>
          <Col sm={7}>
            <FormControl type="text"value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="Enter Vehicle Number" />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formStartDate">
          <FormLabel column sm={3} className="text-right">
            Service Start Date
          </FormLabel>
          <Col sm={7}>
            <DatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              className="form-control"
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formEndDate">
          <FormLabel column sm={3} className="text-right">
            Service End Date
          </FormLabel>
          <Col sm={7}>
            <DatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              className="form-control"
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formServicesDone">
          <FormLabel column sm={3} className="text-right">
            Services Done
          </FormLabel>
          <Col sm={9}>
            {services.map((service) => (
              <Row key={service.id} className="mb-3">
                <Col sm={4}>
                  <Form.Check
                    type="checkbox"
                    label={service.name}
                    checked={service.completed}
                    onChange={(e) =>
                      setServices((prevServices) =>
                        prevServices.map((prevService) =>
                          prevService.id === service.id
                            ? { ...prevService, completed: e.target.checked }
                            : prevService
                        )
                      )
                    }
                  />
                </Col>
                <Col sm={4}>
                  <FormControl
                    type="text"
                    placeholder="Price"
                    value={service.price}
                    onChange={(e) =>
                      setServices((prevServices) =>
                        prevServices.map((prevService) =>
                          prevService.id === service.id
                            ? { ...prevService, price: e.target.value }
                            : prevService
                        )
                      )
                    }
                    disabled={!service.completed}
                  />
                </Col>
              </Row>
            ))}
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formServiceDoneTechnicianId">
          <FormLabel column sm={3} className="text-right">
            Service Done Technician ID
          </FormLabel>
          <Col sm={7}>
            <FormControl
              type="text"
              placeholder="Enter Technician ID"
              value={serviceDoneTechnicianId}
              onChange={(e) => setServiceDoneTechnicianId(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formTotalServicePrice">
          <FormLabel column sm={3} className="text-right">
            Total Service Price (Rs.)
          </FormLabel>
          <Col sm={7}>
            <FormControl type="text" value={totalServicePrice} readOnly />
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formInventoryServices">
          <FormLabel column sm={3} className="text-right">
            Inventory Services
          </FormLabel>
          <Col sm={7}>
            <Form.Check
              type="checkbox"
              label="Used Inventory Items"
              checked={inventoryUsed}
              onChange={(e) => setInventoryUsed(e.target.checked)}
            />
          </Col>
        </FormGroup>

        {inventoryUsed && (
          <>
            <FormGroup as={Row} controlId="formBorrowedItems">
              <FormLabel column sm={3} className="text-right">
                Borrowed Items
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={borrowedItems}
                  onChange={(e) => setBorrowedItems(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} controlId="formInventoryTotalPrice">
              <FormLabel column sm={3} className="text-right">
                Total Price for Inventory Items (Rs.)
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  type="text"
                  value={inventoryTotalPrice}
                  onChange={(e) => setInventoryTotalPrice(e.target.value)}
                />
              </Col>
            </FormGroup>
          </>
        )}

        <FormGroup as={Row} controlId="formTestRun">
          <FormLabel column sm={3} className="text-right">
            Test Run Done
          </FormLabel>
          <Col sm={7}>
            <Form.Check
              type="checkbox"
              label="Yes"
              checked={testRunDone}
              onChange={(e) => setTestRunDone(e.target.checked)}
            />
          </Col>
        </FormGroup>

        {testRunDone && (
          <>
            <FormGroup as={Row} controlId="formTestDate">
              <FormLabel column sm={3} className="text-right">
                Test Run Date
              </FormLabel>
              <Col sm={7}>
                <DatePicker
                  selected={selectedTestDate}
                  onChange={handleTestDateChange}
                  className="form-control"
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} controlId="formtestDoneTechnicianId">
          <FormLabel column sm={3} className="text-right">
            Testrun Done Technician ID
          </FormLabel>
          <Col sm={7}>
            <FormControl
              type="text"
              placeholder="Enter Technician ID"
              value={testDoneTechnicianId}
              onChange={(e) => settestDoneTechnicianId(e.target.value)}
            />
          </Col>
        </FormGroup>

            <FormGroup as={Row} controlId="formTestRunDetails">
              <FormLabel column sm={3} className="text-right">
                Additional Details
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={testRunDetails}
                  onChange={(e) => setTestRunDetails(e.target.value)}
                />
              </Col>
            </FormGroup>
          </>
        )}

        <FormGroup as={Row}>
          <Col sm={{ span: 7, offset: 3 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default Report;
