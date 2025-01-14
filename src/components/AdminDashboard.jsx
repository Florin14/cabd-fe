import React, { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct, deleteOrder, getOrders } from "../api/api";
import { StyledContainer, StyledButton, StyledInput } from "../styles/StyledComponents";
import styled from "@emotion/styled";

const DashboardSection = styled.div`
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const AdminDashboard = () => {
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
    if (newProduct.name && newProduct.quantity > 0 && newProduct.price > 0) {
      await addProduct(newProduct);
      fetchProducts();
      setNewProduct({ name: "", quantity: 0, price: 0 });
    } else {
      alert("Please fill out all fields with valid values.");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  // const handleClearProductHistory = async () => {
  //   if (window.confirm("Are you sure you want to delete all products?")) {
  //     // await deleteAllProducts();
  //     fetchProducts();
  //   }
  // };

  return (
    <StyledContainer>
      <h2>Admin Dashboard</h2>

      <DashboardSection>
        <h3>Add Product</h3>
        <div>
          <StyledInput
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <StyledInput
            type="number"
            placeholder="Quantity"
            min="1"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          />
          <StyledInput
            type="number"
            placeholder="Price"
            min="0.01"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          />
          <StyledButton onClick={handleAddProduct}>Add Product</StyledButton>
        </div>
      </DashboardSection>

      <DashboardSection>
        <h3>Product Inventory</h3>
        <StyledTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <StyledButton onClick={() => handleDeleteProduct(product.id)}>Delete</StyledButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products found.</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
        {/* {products.length > 0 && (
          <StyledButton onClick={handleClearProductHistory}>Clear All Products</StyledButton>
        )} */}
      </DashboardSection>

      <DashboardSection>
        <h3>Orders</h3>
        <StyledTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Order Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.details}</td>
                  <td>
                    <StyledButton onClick={() => handleDeleteOrder(order.id)}>Delete</StyledButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No orders found.</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </DashboardSection>
    </StyledContainer>
  );
};

export default AdminDashboard;
