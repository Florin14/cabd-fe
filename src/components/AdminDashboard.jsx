import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getProducts,
  addProduct,
  deleteProduct,
  deleteOrder,
  getOrders,
} from "../api/api";
import {
  StyledContainer,
  StyledButton,
  StyledInput,
} from "../styles/StyledComponents";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const DashboardSection = styled.div`
  margin-bottom: 20px;
`;
const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #007bff;
    color: white;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }

  .react-datepicker__day {
    font-size: 14px;
    margin: 2px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .react-datepicker__day--selected {
    background-color: #007bff;
    color: white;
  }

  .react-datepicker__day:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stockQuantity: 0,
    price: 0,
    validFrom: new Date(),
  });

  const navigate = useNavigate();


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
    if (
      newProduct.name &&
      newProduct.stockQuantity > 0 &&
      newProduct.price > 0 &&
      newProduct.validFrom
    ) {
      await addProduct(newProduct);
      fetchProducts();
      setNewProduct({
        name: "",
        stockQuantity: 0,
        price: 0,
        validFrom: new Date(),
      });
    } else {
      alert("Please fill out all fields with valid values.");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).then((res) => {
      console.log(res);
    });
    fetchProducts();
  };

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    fetchOrders();
    fetchProducts();
  };

  const handleProductClick = (productId) => {
    // Navigate to the product page with the given productId
    navigate(`/admin/products/${productId}`);
  };

  const handleAllProductsHistoryClick = () => {
    // Navigate to the product page with the given productId
    navigate(`/admin/products-history`);
  };

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
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <StyledInput
            type="number"
            placeholder="Quantity"
            min="1"
            value={newProduct.stockQuantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                stockQuantity: parseInt(e.target.value),
              })
            }
          />
          <StyledInput
            type="number"
            placeholder="Price"
            min="0.01"
            step="0.01"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <label>Valid From</label>
          <StyledDatePickerWrapper>
            <DatePicker
              selected={newProduct.validFrom}
              onChange={(date) =>
                setNewProduct({ ...newProduct, validFrom: date })
              }
              dateFormat="yyyy-MM-dd"
            />
          </StyledDatePickerWrapper>
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
              <th>Valid From</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.stockQuantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{new Date(product.validFrom).toLocaleDateString('en-GB')}</td>
                  <td>
                    <StyledButton
                      disabled={
                        orders?.filter(
                          (order) =>
                            order?.product?.productId === product.productId
                        )?.length > 0
                      }
                      onClick={() => handleDeleteProduct(product.productId)}
                    >
                      Delete
                    </StyledButton>

                    <StyledButton
                      onClick={() => handleProductClick(product.productId)}
                    >
                      History
                    </StyledButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products found.</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
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
              orders.map((order, index) => {
                const details = `${order?.product?.name}, quantity: ${order?.quantity
                  }, total price: $${order?.quantity * order?.product?.price}`;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{details}</td>
                    <td>
                      <StyledButton
                        onClick={() => handleDeleteOrder(order.orderId)}
                      >
                        Delete
                      </StyledButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">No orders found.</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
        <StyledButton
          onClick={() => handleAllProductsHistoryClick()}
        >
          See products history
        </StyledButton>
      </DashboardSection>
    </StyledContainer>
  );
};

export default AdminDashboard;
