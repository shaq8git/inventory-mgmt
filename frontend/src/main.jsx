import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PurchaseProvider>
        <AppRoutes />
      </PurchaseProvider>
    </AuthProvider>
  </BrowserRouter>
);
