import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// export const login = (username, password) => API.post("/users/login", { username, password });
export const getProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getAllProductsHistory = () => API.get("/productHistories");
export const productStateAtTimestamp = (productId, timestamp) =>
  API.get(`/productHistories/state-at-timestamp`, {
    params: { productId, timestamp },
  });// export const getProductHistory = (product) => API.post("/productHistories", product);
export const getProductPricePeriods = (id) => API.get(`/productHistories/price-periods/${id}`);
export const getProductPriceDifferences = (id) => API.get(`/productHistories/price-differences/${id}`);

export const getOrders = () => API.get("/orders");
export const placeOrder = (order) => API.post("/orders", order);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export default API;
