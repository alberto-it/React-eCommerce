import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateOrder from './CreateOrder';
import Button from 'react-bootstrap/Button';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:5000/orders");
        setOrders(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOrder = async (orderData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/orders", orderData);
      const fetchedOrders = await axios.get("http://127.0.0.1:5000/orders");
      setOrders(fetchedOrders.data);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? 'Cancel' : 'Create New Order'}
      </Button>
      {isCreating && (
        <CreateOrder onCreate={handleCreateOrder} onHideConfirmation={() => setIsCreating(false)}/>
      )}
        <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.order_id}`} onClick={() => onSelect(order.order_id)}>ID:{order.order_id} ({order.customer.name})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
