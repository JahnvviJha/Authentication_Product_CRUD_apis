import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
  const { user, callWithRefresh } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data = await productApi.getAll();
      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    try {
      await callWithRefresh((token) => productApi.remove(id, token));
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {user && (
          <Link
            to="/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            + Add Product
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <div key={product._id} className="border rounded p-4 bg-white shadow-sm">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
                <p>
                  <span className="font-medium">Category:</span> {product.category}
                </p>
              </div>

              {user && (
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/products/${product._id}/edit`}
                    className="text-sm bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
