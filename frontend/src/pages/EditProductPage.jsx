import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import ProductForm from "../components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  // pre-fill the form with existing product data
  useEffect(() => {
    productApi
      .getOne(id)
      .then((data) => {
        const p = data.product;
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
        });
      })
      .catch(() => setError("Could not load product"))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await callWithRefresh((token) => productApi.update(id, form, token));
      navigate("/products");
    } catch (err) {
      if (err.errors) {
        setError(err.errors.map((e) => e.msg).join(", "));
      } else {
        setError(err.message || "Failed to update product");
      }
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (error && !form.name) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        submitLabel="Update Product"
      />
    </div>
  );
}
