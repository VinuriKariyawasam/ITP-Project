import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageTitle from './PageTitle';

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: '',
        date: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        // Title validation
        if (name === 'title') {
            if (value.trim() === '') {
                newErrors[name] = 'Title is required';
            } else {
                delete newErrors[name];
            }
        }

        // Amount validation
        if (name === 'amount') {
            if (value.trim() === '') {
                newErrors[name] = 'Amount is required';
            } else if (isNaN(parseFloat(value))) {
                newErrors[name] = 'Amount must be a number';
            } else if (parseFloat(value) <= 0) {
                newErrors[name] = 'Amount must be positive';
            } else {
                delete newErrors[name];
            }
        }

        // Type validation
        if (name === 'type') {
            if (value.trim() === '') {
                newErrors[name] = 'Type is required';
            } else {
                delete newErrors[name];
            }
        }

        // Date validation
        if (name === 'date') {
            if (value.trim() === '') {
                newErrors[name] = 'Date is required';
            } else {
                delete newErrors[name];
            }
        }

        setErrors(newErrors);

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear previous error message when user starts typing
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/add-expense`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (response.ok) {
                    // Reset form data if the request was successful
                    setFormData({
                        title: '',
                        amount: '',
                        type: '',
                        date: '',
                        description: ''
                    });
                    // Redirect to previous page
                    navigate(-1);
                } else {
                    setErrorMessage(data.message || 'Failed to add expense');
                }
            } catch (error) {
                console.error('Error adding expense:', error);
                setErrorMessage('Failed to add expense');
            }
        } else {
            setErrorMessage('Please fix the validation errors before submitting');
        }
    };

    const handleCancel = () => {
        // Navigate back to previous page
        navigate(-1);
    };

    return (
        <main id="main" className="main">
            <PageTitle path="Finance / Expenses / Add-Expense" title="Add-Expense" />
            <Form onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="amount" 
                        value={formData.amount} 
                        onChange={handleChange} 
                        isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.amount}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        isInvalid={!!errors.type}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.type}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </Form.Group><br></br>
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>{" "}
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </main>
    );
}

export default AddExpense;
