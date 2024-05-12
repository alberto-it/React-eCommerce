import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateProduct = ({ onCreate, onHideConfirmation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price };
    try {
      await onCreate(newProduct);
      toast.success('Product created successfully!'); 
      onHideConfirmation(); 
    } catch (error) {
      toast.error('Error creating product!');  
    }
  };
  
  return (
    <Modal show={true} onHide={onHideConfirmation}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Price</label>
            <input
              type="number"
              className="form-control"
              id="priceInput"
              value={price}
              onChange={(e) => setPrice(e.target.value)}/>
          </div><p />
          <Button type="submit">Create Product</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProduct;