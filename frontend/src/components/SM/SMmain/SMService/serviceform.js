import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceForm = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch services from backend on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get( "http://localhost:5000/api/sm/services");
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Handle service selection
  const handleServiceChange = (serviceId) => {
    const selectedService = services.find((service) => service._id === serviceId);
    if (selectedService) {
      const isSelected = selectedServices.some((service) => service._id === serviceId);
      if (isSelected) {
        // Deselect service
        setSelectedServices(selectedServices.filter((service) => service._id !== serviceId));
      } else {
        // Select service
        setSelectedServices([...selectedServices, selectedService]);
      }
    }
  };

  // Calculate total price based on selected services
  useEffect(() => {
    const newTotalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedServices]);

  return (
    <div>
      <h2>Select Services</h2>
      <form>
        {services.map((service) => (
          <div key={service._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedServices.some((selected) => selected._id === service._id)}
                onChange={() => handleServiceChange(service._id)}
              />{' '}
              {service.name} (${service.price})
            </label>
          </div>
        ))}
      </form>
      <div>
        <h3>Total Price: ${totalPrice}</h3>
      </div>
    </div>
  );
};

export default ServiceForm;
