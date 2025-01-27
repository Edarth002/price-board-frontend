"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import { useAuth } from "@/app/context/authcontext";

export default function Categories() {
  const [categories, setCategories] = useState([]); // All categories
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCategories(); // Fetch categories on mount
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories?populate=products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch categories.");

      const data = await res.json();
      setCategories(data); // Populate the categories list
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddCategory = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!newCategory.trim()) {
      setErrorMessage("Category name cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Failed to add category.");

      const data = await res.json();
      setCategories((prev) => [...prev, data]);
      setSuccessMessage(`Category "${data.name}" added successfully!`);
      setNewCategory(""); // Clear input
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleUpdateCategory = async (categoryId, updatedName) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!updatedName.trim()) {
      setErrorMessage("Updated category name cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!res.ok) throw new Error("Failed to update category.");

      const data = await res.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, name: data.name } : cat
        )
      );
      setSuccessMessage(`Category "${data.name}" updated successfully!`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 right-10 flex justify-end">
        <Link
          href="/pages/products"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Products
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Add Category Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add a New Category</h2>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            clearMessages();
          }}
          className="border rounded p-2 w-full mt-2 mb-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Error/Success Messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Categories List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Categories</h2>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="border-b py-2 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {category.name} (ID: {category.id})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleUpdateCategory(
                          category.id,
                          prompt("Enter new name:", category.name)
                        )
                      }
                      className="bg-blue-600 text-white duration-300 hover:bg-blue-700 px-2 py-1 rounded-lg"
                    >
                      Update
                    </button>
                    <button className="bg-red-600 text-white duration-300 hover:bg-red-700 px-2 py-1 rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Display Products within the Category */}
                <div>
                  <h3 className="mt-2 font-medium">
                    Products in this category:
                  </h3>
                  {category.products && category.products.length > 0 ? (
                    <ul>
                      {category.products.map((product) => (
                        <li key={product.id} className="ml-4">
                          - {product.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No products found in this category.</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
