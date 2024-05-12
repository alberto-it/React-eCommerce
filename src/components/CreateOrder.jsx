import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomerSelection from './CustomerSelection.jsx';
import ProductSelection from './ProductSelection.jsx';
import { Modal, Button } from 'react-bootstrap';

const CreateOrder = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        product_id: selectedProductId,
        customer_id: selectedCustomerId,
      };
      const response = await axios.post('http://127.0.0.1:5000/orders', orderData);

      toast.success('Order created successfully!');
      setTimeout(() => window.location.reload(), 2000);

    } catch (error) {
      console.error('Error creating order:', error.response.data);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="selections">
        <CustomerSelection onSelectCustomer={setSelectedCustomerId} />
        <ProductSelection onSelectProduct={setSelectedProductId} />
        <Button type="submit" className="btn btn-primary">Create Order</Button>
      </div>
    </form>
  );
};

export default CreateOrder;