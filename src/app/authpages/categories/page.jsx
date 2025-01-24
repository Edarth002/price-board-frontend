"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchCategories, addCategory } from "@/app/components/category";

export const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If token does not exist, redirect to login page
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Fetch categories only if token is available
    const fetchCat = async () => {
      try {
        const categories = await fetchCategories();
        setCategoryData(categories);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCat();
  }, [router]);

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      setError("Please fill out all fields.");
      return;
    }
    try {
      const addedCategory = await addCategory(newCategory);
      setCategoryData((prev) => [...prev, addedCategory]);
      setIsModalOpen(false);
      setNewCategory({ name: "", description: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-10">
        Select your Category from the ones provided below
      </h1>
      <div className="flex px-10 items-end justify-end">
        <button
          className="w-60 rounded-md bg-blue-500 p-2 text-center font-bold hover:bg-blue-600 text-white text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              placeholder="Category Description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
            ></textarea>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center mx-auto">
        {categoryData.map((category) => (
          <div
            className="w-96 h-[26rem] overflow-hidden rounded-xl border border-stone-300 m-2"
            key={category.id}
          >
            <Image
              src="/placeholder.jpg"
              alt="Placeholder image for product category"
              width={350}
              height={350}
              className="w-full object-cover"
            />
            <div className="p-5 my-2">
              <p className="text-2xl font-bold mb-1">{category.name}</p>
              <p className="text-opacity-90 text-sm">{category.description}</p>
            </div>
            <div className="flex px-5 items-center space-x-5">
              <button className="w-full rounded-md bg-blue-500 p-2 text-center font-bold hover:bg-blue-600 text-white text-sm">
                Update
              </button>
              <button className="w-full rounded-md bg-red-500 p-2 text-center font-bold hover:bg-red-600 text-white text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
