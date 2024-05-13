import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomerSelection from './CustomerSelection.jsx';
import ProductSelection from './ProductSelection.jsx';
import { Button } from 'react-bootstrap';

const CreateOrder = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({}); 

  const handleSelectedProducts = (newSelectedProducts) => {
    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomerId) {
      toast.error("Please select a customer!");
      return;
    }

    const selectedProductIds = Object.keys(selectedProducts).filter(productId => selectedProducts[productId])
    .map(productId => Number(productId));
  
    if (selectedProductIds.length === 0) {
      toast.error("Please select at least one product!");
      return;
    }

    const orderData = {
      customer_id: selectedCustomerId,
      product_ids: selectedProductIds,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/orders', orderData);
      toast.success("Order created successfully!");
      setTimeout(() => window.location.reload(), 2500);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order!");
    }
  };

  return (
    <div className="order-form-container"> 
    <form onSubmit={handleSubmit}>
      <div className="selections">
        <CustomerSelection onSelectCustomer={setSelectedCustomerId} />
        <ProductSelection onSelectProduct={handleSelectedProducts} />
        <Button type="submit" className="btn btn-primary">Create Order</Button>
      </div>
    </form>
    </div>
  );
};

export default CreateOrder;
