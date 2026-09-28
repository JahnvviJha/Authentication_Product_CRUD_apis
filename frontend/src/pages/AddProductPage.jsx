import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProductForm from "../components/ProductForm";

export default function AddProductPage() {
  const { callWithRefresh } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await callWithRefresh((token) => productApi.create(form, token));
      navigate("/products");
    } catch (err) {
      if (err.errors) {
        setError(err.errors.map((e) => e.msg).join(", "));
      } else {
        setError(err.message || "Failed to create product");
      }
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <ProductForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        submitLabel="Create Product"
      />
    </div>
  );
}
