import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageTitle from './PageTitle';

const UpdateExpense = ({toggleLoading}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [backendError, setBackendError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: '',
        date: '',
        description: ''
    });
    const [errors, setErrors] = useState({
        title: '',
        amount: '',
        type: '',
        date: ''
    });

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                toggleLoading(true)
                const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/get-expense/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Update formData state with existing expense data
                    setFormData(data);
                } else {
                    setBackendError('Failed to fetch expense data');
                }
            } catch (error) {
                console.error('Error fetching expense:', error);
                setBackendError('Failed to fetch expense data');
            }finally {
              toggleLoading(false)
            }
        };

        fetchExpense();
    }, [id]);

    const handleCancel = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        // if (!formData.amount.trim() || parseFloat(formData.amount) <= 0) {
        //     newErrors.amount = 'Amount must be a positive value';
        // }
        if (!formData.type.trim()) {
            newErrors.type = 'Type is required';
        }
        if (!formData.date.trim()) {
            newErrors.date = 'Date is required';
        }
        setErrors(newErrors);

        // Check if there are any validation errors
        if (Object.values(newErrors).every((error) => !error)) {
            try {
                const response = await fetch(`${process.env.React_App_Backend_URL}/api/finance/expenses/update-expense/${id}`, {
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
                    setBackendError(data.message || 'Failed to update expense');
                }
            } catch (error) {
                console.error('Error updating expense:', error);
                setBackendError('Failed to update expense');
            }
        }
    };

    return (
        <main id="main" className="main">
            <PageTitle path="Finance / Expenses / Edit-Expense" title="Edit-Expense" />
            <Form onSubmit={handleSubmit}>
                {backendError && <p className="error-message">{backendError}</p>}
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        isInvalid={!!errors.type}
                    />
                    <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Expense
                </Button>{' '}
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </main>
    );
};

export default UpdateExpense;
