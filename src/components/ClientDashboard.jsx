import React, { useEffect, useState } from "react";
import { getProducts, getOrders } from "../api/api";
import { StyledContainer, StyledButton, StyledInput, StyledSelect, StyledCard } from "../styles/StyledComponents";

const ClientDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const username = localStorage.getItem("username");

  const fetchProducts = async () => {
    const { data } = await getProducts();
    const inStockProducts = data.filter((product) => product.quantity > 0);
    setProducts(inStockProducts);
  };

  const fetchOrders = async () => {
    const { data } = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddToOrder = async () => {
    if (!selectedProduct || quantityToAdd <= 0 || quantityToAdd > selectedProduct.quantity) {
      alert("Please select a valid quantity.");
      return;
    }

    if (!currentOrder) {
      setCurrentOrder({
        product: selectedProduct,
        quantity: quantityToAdd,
        status: "ONGOING",
      });
    } else {
      setCurrentOrder({
        ...currentOrder,
        quantity: quantityToAdd,
      });
    }

    setSelectedProduct(null);
    setQuantityToAdd(1);
  };

  const handleRemoveFromOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <StyledContainer>
      <h2>Client Dashboard</h2>

      <div>
        <h3>Add Product to Order</h3>
        <label>Select Product</label>
        <StyledSelect
          value={selectedProduct ? selectedProduct.id : ""}
          onChange={(e) => {
            const product = products.find((p) => p.id === parseInt(e.target.value));
            setSelectedProduct(product);
            setQuantityToAdd(1);
          }}
        >
          <option value="" disabled>Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Available: {product.quantity})
            </option>
          ))}
        </StyledSelect>

        {selectedProduct && (
          <div>
            <label>Quantity</label>
            <StyledInput
              type="number"
              min="1"
              max={selectedProduct.quantity}
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(Math.min(selectedProduct.quantity, parseInt(e.target.value)))}
            />
            <label>Price</label>
            <StyledInput
              type="text"
              value={`$${selectedProduct.price}`}
              readOnly
            />
            <StyledButton onClick={handleAddToOrder}>Add to Order</StyledButton>
          </div>
        )}
      </div>

      <div>
        <h3>Current Order</h3>
        {currentOrder ? (
          <StyledCard>
            <h4>Product: {currentOrder.product.name}</h4>
            <p>Quantity: {currentOrder.quantity}</p>
            <p>Price: ${currentOrder.product.price}</p>
            <p>Status: {currentOrder.status}</p>
            <StyledButton onClick={handleRemoveFromOrder}>Remove from Order</StyledButton>
          </StyledCard>
        ) : (
          <p>Your current order is empty.</p>
        )}
      </div>

      <div>
        <h3>Old Orders</h3>
        {orders.length > 0 ? (
          orders.map((order) => (
            <StyledCard key={order.id}>
              <h4>Product: {order.productName}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ${order.price}</p>
              <p>Status: {order.status}</p>
            </StyledCard>
          ))
        ) : (
          <p>No previous orders found.</p>
        )}
      </div>
    </StyledContainer>
  );
};

export default ClientDashboard;
