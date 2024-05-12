import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CreateCustomer = ({ onCreate, onHideConfirmation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { name, email, phone };
    try {
      await onCreate(newCustomer);
      toast.success('Customer created successfully!'); 
      onHideConfirmation(); 
    } catch (error) {
      toast.error('Error creating customer!');  
    }
  };
  
  return (
    <Modal show={true} onHide={onHideConfirmation}>
      <Modal.Header closeButton>
        <Modal.Title>Create Customer</Modal.Title>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}/>
          </div><p />
          <Button variant="primary" type="submit">Create Customer</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCustomer;