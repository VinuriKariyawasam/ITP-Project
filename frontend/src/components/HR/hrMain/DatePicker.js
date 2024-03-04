import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";

const MyDatePicker = ({ label, selectedDate, onChange }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MM/dd/yyyy"
        // Other props...
      />
    </Form.Group>
  );
};

export default MyDatePicker;
