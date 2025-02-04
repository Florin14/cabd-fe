import React, { useEffect, useState } from "react";
import { getProducts, getOrders, placeOrder } from "../api/api";
import {
  StyledContainer,
  StyledButton,
  StyledInput,
  StyledSelect,
  StyledCard,
} from "../styles/StyledComponents";

const ClientDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const username = localStorage.getItem("username");

  const fetchProducts = async () => {
    const { data } = await getProducts();

    const now = new Date();
    const validProducts = data.filter((product) => {
        const validFromDate = new Date(product.validFrom);
        return product.stockQuantity > 0 && validFromDate <= now;
    });

    setProducts(validProducts);
};
  const fetchOrders = async () => {
    const { data } = await getOrders();
    setOrders(
      data
        .filter((order) => order.username === username)
        .map((item) => ({ ...item, status: "Sent" }))
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddToOrder = () => {
    if (
      !selectedProduct ||
      quantityToAdd <= 0 ||
      quantityToAdd > selectedProduct.stockQuantity
    ) {
      alert("Please select a valid quantity.");
      return;
    }

    setCurrentOrder({
      product: selectedProduct,
      quantity: quantityToAdd,
      status: "Ongoing",
    });

    setSelectedProduct(null);
    setQuantityToAdd(1);
  };

  const handleRemoveFromOrder = () => {
    setCurrentOrder(null);
  };

  const handleSendOrder = async () => {
    if (currentOrder) {
      const updatedOrder = { ...currentOrder, status: "Sent" };
      setOrders([...orders, updatedOrder]);
      await placeOrder({
        productId: currentOrder.product.productId,
        username,
        quantity: currentOrder.quantity,
      }).then(() => {
        fetchOrders();
        fetchProducts();
        setCurrentOrder(null);
      });
    }
  };

  return (
    <StyledContainer>
      <h2>Client Dashboard</h2>

      <div>
        <h3>Add Product to Order</h3>
        <label>Select Product</label>
        <StyledSelect
          value={selectedProduct ? selectedProduct.productId : ""}
          onChange={(e) => {
            const product = products.find(
              (p) => p.productId === parseInt(e.target.value)
            );
            setSelectedProduct(product);
            setQuantityToAdd(1);
          }}
        >
          <option value="" disabled>
            Select a Product
          </option>
          {products.map((product) => (
            <option key={product?.productId} value={product?.productId}>
              {product?.name} (Available: {product?.stockQuantity})
            </option>
          ))}
        </StyledSelect>

        {selectedProduct && (
          <div>
            <label>Quantity</label>
            <StyledInput
              type="number"
              min="1"
              max={selectedProduct.stockQuantity}
              value={quantityToAdd}
              onChange={(e) =>
                setQuantityToAdd(
                  Math.min(
                    selectedProduct.stockQuantity,
                    parseInt(e.target.value)
                  )
                )
              }
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
            <h4>Product: {currentOrder?.product?.name}</h4>
            <p>Quantity: {currentOrder?.quantity}</p>
            <p>Price: ${currentOrder?.product?.price}</p>
            <p>Status: {currentOrder?.status}</p>
            <StyledButton onClick={handleSendOrder}>Send Order</StyledButton>
            <StyledButton onClick={handleRemoveFromOrder}>
              Remove from Order
            </StyledButton>
          </StyledCard>
        ) : (
          <p>Your current order is empty.</p>
        )}
      </div>

      <div>
        <h3>Old Orders</h3>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <StyledCard key={index}>
              <h4>Product: {order?.product?.name}</h4>
              <p>Quantity: {order?.quantity}</p>
              <p>Price: ${order?.product?.price}</p>
              <p>Status: {order?.status}</p>
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
