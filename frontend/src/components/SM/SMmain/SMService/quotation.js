import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image"; // Import toPng function from html-to-image

function AddQuotation({toggleLoading}) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [items, setItems] = useState([
    { id: 1, name: "Cut and Polish", selected: false, price: "" },
    { id: 2, name: "Break inspection and service", selected: false, price: "" },
    { id: 3, name: "Oil Change", selected: false, price: "" },
    { id: 4, name: "Body Wash and Interior Cleaning", selected: false, price: "" },
    { id: 5, name: "Wheel Alignment", selected: false, price: "" },
    { id: 6, name: "Battery Inspection and Replacement", selected: false, price: "" },
    { id: 7, name: "Coolant System Flush and Fill", selected: false, price: "" },
    { id: 8, name: "Suspension Inspection", selected: false, price: "" },
    { id: 9, name: "Electrical System Check", selected: false, price: "" },
    { id: 10, name: "General Vehicle Inspection", selected: false, price: "" },
    { id: 11, name: "Total Cost for Inventory Products", selected: false, price: "" },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [borrowingItems, setBorrowingItems] = useState("");
  const [inventoryInputEnabled, setInventoryInputEnabled] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Custom validation rule for Sri Lankan vehicle number format
  const validateVehicleNumber = (value) => {
    // Define regular expressions for standard alphanumeric and Sinhala word formats
    const alphanumericPattern = /^[A-Z]{2}\s\d{4}$/; // LL NNNN format
    const sinhalaWordPattern = /^[\u0D81\u0DCA\u0DBB\u0DD3]$/; // Sinhala word sri format

    // Validate against both patterns
    return (
      alphanumericPattern.test(value) ||
      sinhalaWordPattern.test(value) ||
      "Invalid Sri Lankan vehicle number"
    );
  };


  const handleCheckboxChange = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);

    const totalCostItem = updatedItems.find((item) => item.id === 11);
    setInventoryInputEnabled(totalCostItem && totalCostItem.selected);

    calculateTotalPrice(updatedItems);
  };

  const handlePriceChange = (itemId, price) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, price } : item
    );
    setItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const calculateTotalPrice = (updatedItems) => {
    const totalPrice = updatedItems
      .filter((item) => item.selected && item.price !== "")
      .reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(totalPrice);
  };

  const onSubmit = async (data) => {
    try {
      const selectedItems = items.filter((item) => item.selected);
      const services = selectedItems.map((item) => ({
        name: item.name,
        price: item.price !== "" ? parseFloat(item.price) : 0,
        selected: item.selected,
      }));
      toggleLoading(true);
      const response = await fetch(`${process.env.React_App_Backend_URL}/api/sm/quotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vnumber: data.vnumber,
          startDate: data.startDate,
          services,
          borrowingItems,
          totalPrice,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Form submitted successfully!");
        navigate("/staff/sm/quotation/");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
    finally{
      toggleLoading(false);
    }
  };

  const handleDownloadQuotation = () => {
    const container = document.getElementById("quotation-container");

    if (container) {
      toPng(container)
        .then(function (dataUrl) {
          const downloadLink = document.createElement("a");
          downloadLink.href = dataUrl;
          downloadLink.download = "service_quotation.png";
          downloadLink.click();
        })
        .catch(function (error) {
          console.error("Error generating image:", error);
        });
    }
  };

  return (
    <Container className="my-4" id="quotation-container">
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Service Quotation</h2>

        <FormGroup as={Row} controlId="formVehiNumber">
          <FormLabel column sm={2}>
            Vehicle Number
          </FormLabel>
          <Col sm={2}>
            <Controller
              name="vnumber"
              control={control}
              rules={{ required: "Vehicle number is required",
                       validate: validateVehicleNumber,
            }}
              render={({ field }) => (
                <FormControl placeholder="Enter vehicle number" {...field} />
              )}
            />
            <Form.Text className="text-danger">
              {errors.vnumber && errors.vnumber.message}
            </Form.Text>
          </Col>
        </FormGroup>

        <FormGroup as={Row} controlId="formStartDate">
          <FormLabel column sm={2}>
            Date
          </FormLabel>
          <Col sm={2}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  className="form-control"
                  {...field}
                />
              )}
            />
            <Form.Text className="text-danger">
              {errors.startDate && errors.startDate.message}
            </Form.Text>
          </Col>
        </FormGroup>

        <h4>Select Services</h4>
        <table className="table">
          <tbody>
            {items.map((item, index) => {
              const hasNextItem = index + 1 < items.length;
              const nextItem = hasNextItem ? items[index + 1] : null;

              if (index % 2 === 0) {
                return (
                  <tr key={item.id}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleCheckboxChange(item.id)}
                        />{" "}
                        {item.name}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        disabled={!item.selected}
                      />
                    </td>
                    {nextItem && (
                      <>
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              checked={nextItem.selected}
                              onChange={() => handleCheckboxChange(nextItem.id)}
                            />{" "}
                            {nextItem.name}
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            value={nextItem.price}
                            onChange={(e) => handlePriceChange(nextItem.id, e.target.value)}
                            disabled={!nextItem.selected}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              }

              return null;
            })}
          </tbody>
        </table>

        {inventoryInputEnabled && (
          <FormGroup as={Row} controlId="formBorrowingItems">
            <FormLabel column sm={2}>
              Borrowing Items
            </FormLabel>
            <Col sm={10}>
              <Controller
                name="borrowingItems"
                control={control}
                render={({ field }) => (
                  <FormControl
                    as="textarea"
                    rows={3}
                    {...field}
                    onChange={(e) => setBorrowingItems(e.target.value)}
                  />
                )}
              />
              <Form.Text className="text-danger">
                {errors.borrowingItems && errors.borrowingItems.message}
              </Form.Text>
            </Col>
          </FormGroup>
        )}

        <FormGroup as={Row} controlId="formTotalPrice">
          <FormLabel column sm={2}>
            Total Price (Rs.)
          </FormLabel>
          <Col sm={2}>
            <FormControl type="text" value={totalPrice} readOnly />
          </Col>
        </FormGroup>
      
      <Row>
        <Col>
      <Button type="button" onClick={handleDownloadQuotation}>
        Download Quotation as Image
      </Button>
      </Col>
      <Col>
      <Button type="submit">Submit</Button>
      </Col>
      </Row>
    </Form>
    </Container>
  );
}

export default AddQuotation;