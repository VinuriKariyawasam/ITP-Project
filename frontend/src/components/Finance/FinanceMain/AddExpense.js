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
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/finance/expenses/add-expense", {
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
                navigate("/finance/expenses");
            } else {
                setErrorMessage(data.message || 'Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setErrorMessage('Failed to add expense');
        }
    };

    return (
        <main id="main" className="main">
             <PageTitle title="Finance / Expenses / Add-Expense" />
            <Form onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
            </Form>
        </main>
    );
}

export default AddExpense;
