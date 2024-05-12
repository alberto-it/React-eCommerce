import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import Button from 'react-bootstrap/Button';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateProduct = async (productData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/products", productData);
      const fetchedProducts = await axios.get("http://127.0.0.1:5000/products");
      setProducts(fetchedProducts.data);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateClick}>Create New Product</Button>
      {isCreating && (
        <CreateProduct onCreate={handleCreateProduct} onHideConfirmation={() => setIsCreating(false)}/>
      )}
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`} onClick={() => onSelect(product.id)}>{product.name}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ProductList;