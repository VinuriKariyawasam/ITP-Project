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

function Addquotation() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [items, setItems] = useState([
    { id: 1, name: "Cut and Polish", selected: false, price: "" },
    { id: 2, name: "Break inspection and service", selected: false, price: "" },
    { id: 3, name: "Oil Change", selected: false, price: "" },
    { id: 4, name: "Body Wash and Interior Cleaning", selected: false, price: "" },
    { id: 5, name: "Wheel Alignment", selected: false, price: "" },
    { id: 6, name: "Battery Inspection and Replacement", selected: false, price: "" },
    { id: 7, name: "Coolent System Flush and Fill", selected: false, price: "" },
    { id: 8, name: "Suspension Inspection", selected: false, price: "" },
    { id: 9, name: "Electrical System Check", selected: false, price: "" },
    { id: 10, name: "General Vehicle Inspection", selected: false, price: "" },
    { id: 11, name: "Total Cost for Inventory Produts", selected: false, price: "" },


  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleCheckboxChange = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
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
      .filter((item) => item.selected && item.price)
      .reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(totalPrice);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      // Filter selected items
      const selectedItems = items.filter((item) => item.selected);

      // Prepare selected services with prices
      const services = selectedItems.map((item) => ({
        name: item.name,
        price: item.price,
      }));

      console.log("Selected Services:", services);

      // Handle form submission logic here (e.g., API call)
      // Assuming you will submit the form data (including selected services) to the backend
      // Example fetch API call
      const response = await fetch("http://localhost:5000/api/sm/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, services }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        alert("Form submitted successfully!");
        navigate("/staff/sm"); // Redirect to success page after successful submission
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
   
    <Container className="my-4">
        <h1> Quotation Maker is here!</h1>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <h2>Service Quotation</h2>
      {/* Vehicle Number */}
      <FormGroup as={Row} controlId="formVehiNumber">
        <FormLabel column sm={2}>
          Vehicle Number
        </FormLabel>
        <Col sm={2}>
          <Controller
            name="vnumber"
            control={control}
            rules={{ required: "Vehicle number is required" }}
            render={({ field }) => (
              <FormControl placeholder="Enter vehicle number" {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.vnumber && errors.vnumber.message}
          </Form.Text>
        </Col>
      </FormGroup>

      {/* Date */}
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

     {/* Services Table */}
<h4>Select Services</h4>
<table className="table">
  <tbody>
    {items.map((item, index) => {
      // Check if the current item and the next item exist
      const hasNextItem = index + 1 < items.length;
      const nextItem = hasNextItem ? items[index + 1] : null;

      // Render a row for every pair of items
      if (index % 2 === 0) {
        return (
          <tr key={item.id}>
            {/* First item */}
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

            {/* Second item (if exists) */}
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

      return null; // Skip rendering for odd-indexed items
    })}
  </tbody>
</table>


      {/* Total Price */}
      <FormGroup as={Row} controlId="formTotalPrice">
        <FormLabel column sm={2}>
          Total Price
        </FormLabel>
        <Col sm={2}>
          <FormControl
            type="text"
            value={totalPrice}
            readOnly
          />
        </Col>
      </FormGroup>

      {/* Other Details */}
      <FormGroup as={Row} controlId="formOtherDetails">
        <FormLabel column sm={2}>
          Other Details
        </FormLabel>
        <Col sm={10}>
          <Controller
            name="otherDetails"
            control={control}
            render={({ field }) => (
              <FormControl as="textarea" rows={3} {...field} />
            )}
          />
          <Form.Text className="text-danger">
            {errors.otherDetails && errors.otherDetails.message}
          </Form.Text>
        </Col>
      </FormGroup>

      {/* Submit Button */}
      <Button type="submit">Submit</Button>
    </Form>
    </Container>
  );
}

export default Addquotation;
