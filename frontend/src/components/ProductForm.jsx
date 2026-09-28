// used by both AddProductPage and EditProductPage
export default function ProductForm({ form, onChange, onSubmit, error, submitLabel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</p>
      )}

      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Price</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Stock</label>
        <input
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        {submitLabel}
      </button>
    </form>
  );
}
