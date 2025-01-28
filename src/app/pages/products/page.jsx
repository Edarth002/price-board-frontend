"use client";

import { useEffect, useState } from "react";
import { fetchProducts, addProduct } from "@/app/apis/products";

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Store products
  const [name, setName] = useState(""); // Product name input
  const [price, setPrice] = useState(""); // Product price input
  const [categoryId, setCategoryId] = useState(""); // Product category ID input
  const [image, setImage] = useState(null); // Product image input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      }
    };

    loadProducts();
  }, []);

  // Handle form submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset previous error

    try {
      const newProduct = await addProduct({
        name,
        price: parseFloat(price),
        category_id: parseInt(categoryId),
        image,
      });

      setProducts((prev) => [...prev, newProduct]); // Add new product to list
      setName(""); // Reset form fields
      setPrice("");
      setCategoryId("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setError(`Error adding product: ${err.message}`); // Show detailed error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Product Form */}
      <form className="mb-6" onSubmit={handleAddProduct}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="categoryId"
          >
            Category ID
          </label>
          <input
            id="categoryId"
            type="number"
            className="w-full border rounded px-3 py-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="file"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Products List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="border rounded p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Category ID: {product.category_id}</p>
                </div>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
