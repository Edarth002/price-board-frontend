"use client";
import React, { useEffect, useState } from "react";
import { fetchCategories, addCategory } from "@/app/apis/category";
import Link from "next/link";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchCategories(0, 10); // Fetch first 10 categories
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err.message);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      setError("");
      if (!newCategory.trim()) {
        setError("Category name cannot be empty.");
        return;
      }
      const addedCategory = await addCategory({ name: newCategory });
      setCategories((prev) => [...prev, addedCategory]);
      setNewCategory(""); // Reset input
    } catch (err) {
      console.error("Error adding category:", err.message);
      setError("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <nav className="flex right-10 justify-end">
        <Link
          href="/pages/products"
          className="bg-blue-600 hover:bg-blue-700 duration-300 text-white px-3 py-2 rounded-full"
        >
          Go To Products
        </Link>
      </nav>
      <h1 className="text-xl font-bold mb-4 mt-10">Categories</h1>
      {error && <div className="text-red-500">{error}</div>}

      {/* Add Category */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter new category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Category
        </button>
      </div>

      {/* Display Categories */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="list-disc pl-6">
          {categories.map((category) => (
            <li key={category.id} className="mb-4">
              <div>
                <strong>Name:</strong> {category.name}
              </div>
              <div>
                <strong>ID:</strong> {category.id}
              </div>
              <div>
                <strong>Products:</strong>{" "}
                {category.products && category.products.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {category.products.map((product) => (
                      <li key={product.id}>{product.name}</li>
                    ))}
                  </ul>
                ) : (
                  "No products available"
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesPage;
