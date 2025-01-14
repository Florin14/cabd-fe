import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// export const login = (username, password) => API.post("/users/login", { username, password });
export const getProducts = () => API.get("/products");
export const addProduct = (product) => API.post("/products", product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const deleteOrder = (id) => API.delete(`/order/${id}`);

export const getOrders = () => API.get("/orders/admin");
export const placeOrder = (order) => API.post("/orders/client", order);

export default API;
