import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateCustomer = ({ customerId, onUpdate }) => {
  const [customer, setCustomer] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerId) {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
          setCustomer(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        } catch (error) {
          console.error(error.response.data);
        }
      }
    };

    fetchCustomer();
  }, [customerId]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/customers/${customerId}`, {
        name,
        email,
        phone,
      });
      onUpdate(response.data);
      navigate('/customers');
      toast.success('Customer updated successfully!');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <p />
      <h2>Update Customer</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        <p />
        <Button variant="primary" type="submit">Update Customer</Button>
      </Form>
    </div>
  );
};

export default UpdateCustomer;