import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const PurchaseContext = createContext(null);

export function PurchaseProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (payload) => {
    const res = await api.post("/products/", payload);
    setProducts((current) =>
      [...current, res.data].sort((left, right) => left.name.localeCompare(right.name))
    );
    return res.data;
  };

  const updateProduct = async (id, payload) => {
    const res = await api.put(`/products/${id}`, payload);
    setProducts((current) =>
      current.map((product) => (product.id === id ? res.data : product)).sort((left, right) => left.name.localeCompare(right.name))
    );
    return res.data;
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  useEffect(() => {
    refreshProducts().catch(() => {
      setProducts([]);
    });
  }, []);

  return (
    <PurchaseContext.Provider
      value={{
        products,
        loading,
        refreshProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase must be used within a PurchaseProvider");
  }
  return context;
}
