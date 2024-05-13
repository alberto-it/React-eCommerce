import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <h2>Order Details for ID: {orderId}</h2>
      {isLoading ? (
        <p>Loading order...</p>
      ) : order ? (
        <>
          <h5>Customer: {order.customer.name}</h5>
          <p>Email: {order.customer.email}</p>
          <p>Phone: {order.customer.phone}</p>
          <p>Order Date: {order.order_date}</p>
          <h5>Products:</h5>
          <ul>
            {order.products.map((product) => (
              <li key={product.id}>
                <p>{product.name}: ${product.price}</p>
              </li>
            ))}
          </ul>
          <p>
          <b>Total Price: </b>$
          {order.products.reduce((acc, product) => acc + product.price, 0)}
        </p>
        </>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
