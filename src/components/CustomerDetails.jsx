import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateCustomer from './UpdateCustomer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [isEditing, setIsEditing] = React.useState(false);
  const [customer, setCustomer] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/customers/${customerId}`);
      const data = await response.json();
      setCustomer(data);
    };
    fetchData();
  }, [customerId]);

  const handleUpdate = async (updatedCustomerData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomerData),
      });

      const updatedCustomer = await response.json();
      setCustomer(updatedCustomer); 
      setIsEditing(false); 
    } catch (error) {
      console.error(error); 
    }
  };

  const navigate = useNavigate();

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
      if (response.status === 200) {
        toast.success('Customer deleted successfully!');
        navigate('/customers'); 
      } else {
        console.error('Error deleting customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error("Cannot Delete Customer with existing Order")
    }
  };

  return (
    <div>
      <h3>Customer Details for ID: {customerId}</h3>
      <p>Name: {customer?.name}</p>
      <p>Email: {customer?.email}</p>
      <p>Phone: {customer?.phone}</p><br />
      <Button onClick={() => handleDeleteCustomer(customerId)}>Delete Customer</Button>
      <Button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Edit' : 'Edit'}
      </Button>
      {isEditing && <UpdateCustomer customerId={customerId} onUpdate={handleUpdate} />}

    </div>
  );

};

export default CustomerDetails;