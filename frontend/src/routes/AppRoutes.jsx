import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProductGroup from "../pages/ProductGroup";
import ProductInfo from "../pages/ProductInfo";
import OpeningBalance from "../pages/OpeningBalance";
import StockRegister from "../pages/StockRegister";
import Distribution from "../pages/Distribution";
import PurchasePlanning from "../pages/PurchasePlanning";

import UserRegister from "../pages/UserRegister";
import UserRole from "../pages/UserRole";
import UserPermission from "../pages/UserPermission";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="product-group" element={<ProductGroup />} />
        <Route path="product-info" element={<ProductInfo />} />
        <Route path="opening-balance" element={<OpeningBalance />} />

        <Route path="stock-register" element={<StockRegister />} />
        <Route path="distribution" element={<Distribution />} />
        <Route path="purchase-planning" element={<PurchasePlanning />} />

        <Route path="users/registration" element={<UserRegister />} />
        <Route path="users/role" element={<UserRole />} />
        <Route path="users/permission" element={<UserPermission />} />
      </Route>

    </Routes>
  );
}