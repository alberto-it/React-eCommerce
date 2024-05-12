import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Home from './components/Home'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import OrdersList from './components/OrdersList';
import OrderDetails from './components/OrderDetails';

function App() {
  const { customerId } = useParams();
  const { productId } = useParams();
  const [customers, setCustomers] = useState([]); 
  const [products, setProducts] = useState([]);
  const [setSelectedCustomerId] = useState(null);
  const [setSelectedProductId] = useState(null);
  const [setError] = useState(null);

  const handleCustomerUpdate = async (customerId, customerData) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/customers/${customerId}`, customerData);
      const updatedCustomers = customers.map((customer) => (customer.id === customerId ? response.data : customer));
      setCustomers(updatedCustomers);
    } catch (error) {
      setError(error);
    }
  };

  const handleProductUpdate = async (productId, productData) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/products/${productId}`, productData);
      const updatedProducts = products.map((product) => (product.id === productId ? response.data : product));
      setProducts(updatedProducts);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/customers" element={<CustomerList customers={customers} onSelect={setSelectedCustomerId} />} />
          <Route path="/customers/:customerId" element={<CustomerDetails customerId={customerId}
              onUpdate={handleCustomerUpdate}  />} />

          <Route path="/products" element={<ProductList products={products} onSelect={setSelectedProductId} />} />
          <Route path="/products/:productId" element={<ProductDetails productID={productId}
              onUpdate={handleProductUpdate}  />} />
          
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />

        </Routes>
      </div>

    </Router>
  );
}

export default App;
