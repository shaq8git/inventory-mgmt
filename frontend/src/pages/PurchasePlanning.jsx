import { useState, useEffect } from "react";
import { usePurchase } from "../contexts/PurchaseContext";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

export default function PurchasePlanning() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = usePurchase();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unit: "pcs",
    quantity: 0,
    unit_price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      sku: "",
      category: "",
      unit: "",
      quantity: "",
      unit_price: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category || "",
      unit: product.unit,
      quantity: product.quantity,
      unit_price: product.unit_price,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
      } catch (error) {
        alert(error.response?.data?.detail || "Failed to delete product");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          ...form,
          quantity: Number(form.quantity),
          unit_price: Number(form.unit_price),
        });
      } else {
        await createProduct({
          ...form,
          quantity: Number(form.quantity),
          unit_price: Number(form.unit_price),
        });
      }
      setForm({
        name: "",
        sku: "",
        category: "",
        unit: "",
        quantity: 0,
        unit_price: 0,
      });
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to save product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Purchase Planning</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="bg-gray-300 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Products</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <span className="text-sm text-gray-500">
              {loading ? "Loading..." : `${filteredProducts.length} records`}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">SKU</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Unit</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0">
                  <td className="py-2 pr-4">{product.name}</td>
                  <td className="py-2 pr-4">{product.sku}</td>
                  <td className="py-2 pr-4">{product.category || "-"}</td>
                  <td className="py-2 pr-4">{product.quantity}</td>
                  <td className="py-2 pr-4">{product.unit}</td>
                  <td className="py-2 pr-4">{product.unit_price}</td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 pr-2 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!paginatedProducts.length && !loading && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


{totalPages > 1 && (
<div className="flex items-center justify-between mt-4">
            
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
             {/* Page number boxes this is a test */}
  <div className="flex gap-2">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-8 h-8 rounded text-sm font-medium
          ${currentPage === page
            ? "bg-gray-800 text-white"
            : "bg-white border text-gray-700 hover:bg-gray-100"
          }`}
      >
        {page}
      </button>
    ))}
  </div>

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
  </div>

)}
</div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-300 p-6 rounded-xl shadow max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Product name"
                className="w-full border p-2 rounded placeholder-gray-700"
                required
              />
              <input
                value={form.sku}
                onChange={(event) => setForm({ ...form, sku: event.target.value })}
                placeholder="SKU"
                className="w-full border p-2 rounded placeholder-gray-700"
                required
              />
              <input
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                placeholder="Category"
                className="w-full border p-2 rounded placeholder-gray-700"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.unit}
                  onChange={(event) => setForm({ ...form, unit: event.target.value })}
                  placeholder="Unit (e.g. pcs, kg)"
                  className="w-full border p-2 rounded placeholder-gray-700"
                />
                <input
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                  placeholder="Quantity Number"
                  className="w-full border p-2 rounded placeholder-gray-700"
                />
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.unit_price}
                onChange={(event) => setForm({ ...form, unit_price: event.target.value })}
                placeholder="Unit price Number"
                className="w-full border p-2 rounded placeholder-gray-700"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex-1">
                  {editingProduct ? "Update" : "Save"} Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
