import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateExpense = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: '',
        date: '',
        description: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`http://localhost:5000/finance/expenses/get-expense/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Update formData state with existing expense data
                    setFormData(data);
                } else {
                    setErrorMessage('Failed to fetch expense data');
                }
            } catch (error) {
                console.error('Error fetching expense:', error);
                setErrorMessage('Failed to fetch expense data');
            }
        };

        fetchExpense();
    }, [id]);

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
            const response = await fetch(`http://localhost:5000/finance/expenses/update-expense/${id}`, {
                method: 'PATCH',
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
                setErrorMessage(data.message || 'Failed to update expense');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
            setErrorMessage('Failed to update expense');
        }
    };

    return (
        <main id="main" className="main">
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
                    Update Expense
                </Button>
            </Form>
        </main>
    );
}

export default UpdateExpense;
