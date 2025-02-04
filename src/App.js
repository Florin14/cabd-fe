import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ClientDashboard from "./components/ClientDashboard";
import Navbar from "./components/Navbar";
import HistoryPage from "./components/HistoryPage";
import AllProductsHistoryPage from "./components/AllProductsHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/admin/products/:productId" element={<HistoryPage />} />
        <Route path="/admin/products-history" element={<AllProductsHistoryPage />} />

      </Routes>
    </Router>
  );
}

export default App;
