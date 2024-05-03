import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import successpay from '../../../../images/Payment/successpay.png';

const PaymentSuccess = (props) => {
    const [countdown, setCountdown] = useState(15); // Initial countdown time
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Redirect to homepage after countdown ends
        const redirectTimer = setTimeout(() => {
            navigate('/customer/payments/onlinepayment/invoice', { state: { paymentId: props.paymentId } });
        }, 10000); // 15 seconds

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
                        <img src={successpay} style={{ height: '150px', width: '150px' }} alt="Payment Success" />
                        <h1 className="mb-4">Payment Successful</h1>
                        <p>Thank you for your payment!</p>
                        <p>Your Payment Successfully Verified.</p>
                        <p>You will be redirected to the Payment Invoice in {countdown} seconds</p>
                        <div className="mt-4">
                            <Link to="/customer/payments/onlinepayment/invoice">
                                <Button variant="primary">View Invoice</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default PaymentSuccess;
