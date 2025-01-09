import React, { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct, getOrders } from "../api/api";
import { StyledContainer, StyledButton, StyledInput } from "../styles/StyledComponents";
import ProductCard from "./ProductCard";

const ClientDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, price: 0 });

  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddProduct = async () => {
    await addProduct(newProduct);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <StyledContainer>
      <h2>Client Dashboard</h2>
      <div>
        <StyledInput
          type="text"
          placeholder="Product Name"
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <StyledInput
          type="number"
          placeholder="Quantity"
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <StyledInput
          type="number"
          placeholder="Price"
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <StyledButton onClick={handleAddProduct}>Add Product</StyledButton>
      </div>
      <h3>Products</h3>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
      ))}
      <h3>Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.details}</li>
        ))}
      </ul>
    </StyledContainer>
  );
};

export default ClientDashboard;
