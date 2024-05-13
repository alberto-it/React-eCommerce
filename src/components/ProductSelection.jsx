import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductSelection = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const newSelectedProducts = selectedOptions.reduce((acc, option) => {
      acc[option.value] = true;
      return acc;
    }, {...selectedProducts});
    setSelectedProducts(newSelectedProducts);
    onSelectProduct(newSelectedProducts);
  };

  return (
    <div>
      {isLoading && <p>Loading products...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {products.length > 0 && (
        <select id="product" multiple onChange={handleProductChange}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ProductSelection;
