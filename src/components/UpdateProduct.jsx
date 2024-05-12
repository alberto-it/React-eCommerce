import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProduct = ({ productId, onUpdate }) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
          setProduct(response.data);
          setName(response.data.name);
          setPrice(response.data.price);
        } catch (error) {
          console.error(error.response.data);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/products/${productId}`, {
        name,
        price,
      });
      onUpdate(response.data);
      navigate('/products');
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <p />
      <h2>Update Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter New Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <p />
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;