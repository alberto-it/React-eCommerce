import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerSelection = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customerId) => {
    onSelectCustomer(customerId);
  };

  return (
    <div>
      {isLoading && <p>Loading customers...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {customers.length > 0 && (
        <select onChange={(e) => handleCustomerSelect(e.target.value)}>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CustomerSelection;
