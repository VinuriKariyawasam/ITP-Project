import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import failurepay from '../../../../images/Payment/failurepay.png';

const PaymentFailure = () => {
    const [countdown, setCountdown] = useState(15); // Initial countdown time
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Redirect to homepage after countdown ends
        const redirectTimer = setTimeout(() => {
            navigate('/customer/payments/payonline');
        }, 15000); // 15 seconds

        // Cleanup
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <main id="cusmain" className="cusmain">
            <Container className="mt-5">
                <Row>
                    <Col className="text-center">
                        <img src={failurepay} style={{ height: '150px', width: '150px' }} alt="Payment Failure" />
                        <h1 className="mb-4">Payment Unsuccessful</h1>
                        <p>Sorry, your payment was unsuccessful.</p>
                        <p>Please try again later.</p>
                        <p>You will be redirected to the My Payments Page in {countdown} seconds</p>
                        <div className="mt-4">
                            <Link to="/customer/payments/payonline">
                                <Button variant="primary">Go to Homepage</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default PaymentFailure;
