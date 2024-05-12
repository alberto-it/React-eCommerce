import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateCustomer from "./CreateCustomer";
import Button from 'react-bootstrap/Button';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/customers");
        setCustomers(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchCustomers();
  }, []);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateCustomer = async (customerData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/customers", customerData);
      const fetchedCustomers = await axios.get("http://127.0.0.1:5000/customers");
      setCustomers(fetchedCustomers.data);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateClick}>Create New Customer</Button>
      {isCreating && (
        <CreateCustomer onCreate={handleCreateCustomer} onHideConfirmation={() => setIsCreating(false)}/>)}
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link to={`/customers/${customer.id}`} onClick={() => onSelect(customer.id)}>{customer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;