import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [isEditing, setIsEditing] = React.useState(false);
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchData();
  }, [productId]);

  const handleUpdate = async (updatedProductData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData),
      });

      const updatedProduct = await response.json();
      setProduct(updatedProduct); 
      setIsEditing(false); 
    } catch (error) {
      console.error(error); 
    }
  };

  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      if (response.status === 200) {
        toast.success('Product deleted successfully!');
        navigate('/products'); 
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Cannot Delete Product in Existing Order")
    }
  };

  return (
    <div>
      <h3>Product Details for ID: {productId}</h3>
      <p>Name: {product?.name}</p>
      <p>Price: {product?.price}</p>
      <button onClick={() => handleDeleteProduct(productId)}>Delete Product</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Edit' : 'Edit'}
      </button>
      {isEditing && <UpdateProduct productId={productId} onUpdate={handleUpdate} />}

    </div>
  );

};

export default ProductDetails;