import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const DeleteExpense = ({ expenseId }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/finance/expenses/delete-expense/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Redirect to previous page
                navigate(-1);
            } else {
                setErrorMessage(data.message || 'Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
            setErrorMessage('Failed to delete expense');
        }
    };

    return (
        <main id="main" className="main">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button variant="danger" onClick={handleDelete}>
                Delete Expense
            </Button>
        </main>
    );
}

export default DeleteExpense;
