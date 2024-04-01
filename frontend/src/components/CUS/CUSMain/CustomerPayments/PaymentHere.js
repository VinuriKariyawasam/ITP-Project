import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import { Button, Form, Carousel } from 'react-bootstrap';
import neotechpay from '../../../../images/Payment/neotechpay.png';
import payhere from '../../../../images/Payment/payhere.png';


const PayHereIntegration = () => {
    const [paymentData, setPaymentData] = useState({
        merchant_id: '1226324',
        return_url: 'http://localhost:3000/customer',
        cancel_url: 'http://localhost:3000/staff',
        notify_url: 'http://localhost:3000/customer',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john@john.com',
        phone: '0714804203',
        address: 'SLT',
        city: 'Kandy',
        country: 'Sri Lanka',
        order_id: 'M01',
        items: 'M01',
        currency: 'LKR',
        amount: '1000.00',
        hash: ''
    });

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        // Generate hash value
        const merchant_secret = 'MjgyNTg0MDA0NDI0NDgwNjczNTYzOTQwNjA4OTQwMjgzMzMyMDc4Nw==';
        const hashms = md5(merchant_secret).toUpperCase();
        const { merchant_id, order_id, amount, currency } = paymentData;
        const hashString = `${merchant_id}${order_id}${amount}${currency}${hashms}`;
        const hash = md5(hashString).toUpperCase();

        // Prepare payment payload
        const paymentPayload = {
            ...paymentData,
            hash: hash
        };

        // Initiate payment
        if (window.payhere) {
            window.payhere.startPayment(paymentPayload);
        } else {
            console.error('PayHere script not loaded');
        }
    };

    useEffect(() => {
        // Include PayHere script
        const script = document.createElement('script');
        script.src = 'https://www.payhere.lk/lib/payhere.js';
        script.async = true;
        script.onload = () => {
            console.log('PayHere script loaded');
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup script after component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main id="cusmain" className="cusmain">
            <div className="container">
                <h1 className="text-center mb-5">Pay Online</h1>
                <div className="row">
                    <div className="col-md-6">
                        <Carousel>
                            <Carousel.Item style={{ height: '500px' }}>
                                <img
                                    className="d-block w-100"
                                    src={neotechpay}
                                    alt="First slide"
                                    style={{ height: '450px' }}
                                    
                                />
                            </Carousel.Item>
                            <Carousel.Item style={{ height: '500px' }}>
                                <img
                                    className="d-block w-100"
                                    src={payhere}
                                    alt="Second slide"
                                    style={{ height: '450px' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="col-md-6">
                        <Form>
                            <Form.Group controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="first_name" placeholder="Enter your first name" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="last_name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" placeholder="Enter your last name" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter your email address" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} />
                            </Form.Group>
                            {/* Add more input fields as needed */}

                            <br></br>
                            <Button onClick={handlePayment}>Pay with PayHere</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PayHereIntegration;
