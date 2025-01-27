"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authcontext";

export default function Products() {
  const [products, setProducts] = useState([]); // All products
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: null, // image will be a file object
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchProducts(); // Fetch products on mount
  }, []);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products?populate=category`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch products.");

      const data = await res.json();
      setProducts(data); // Populate the products list
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (
      !newProduct.name.trim() ||
      !newProduct.price ||
      !newProduct.categoryId ||
      !newProduct.image
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Prepare form data for uploading the image
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category_id", newProduct.categoryId);
      formData.append("image", newProduct.image); // Correct key for the image

      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Authorization header
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      const data = await res.json();

      // Add the new product to the list
      setProducts((prev) => [...prev, data]);
      setSuccessMessage(`Product "${data.name}" added successfully!`);
      setNewProduct({ name: "", price: "", categoryId: "", image: null }); // Clear input fields
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Clear success or error messages
  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Add Product Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add a New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => {
            setNewProduct({ ...newProduct, name: e.target.value });
            clearMessages();
          }}
          className="border rounded p-2 w-full mt-2 mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => {
            setNewProduct({ ...newProduct, price: e.target.value });
            clearMessages();
          }}
          className="border rounded p-2 w-full mt-2 mb-2"
        />
        <input
          type="text"
          placeholder="Category ID"
          value={newProduct.categoryId}
          onChange={(e) => {
            setNewProduct({ ...newProduct, categoryId: e.target.value });
            clearMessages();
          }}
          className="border rounded p-2 w-full mt-2 mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded p-2 w-full mt-2 mb-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {/* Error/Success Messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Products List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="border-b py-4 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {/* Product Image */}
                    <img
                      src={product.image?.url || "/default-image.jpg"} // Use default image if no image URL is available
                      alt={product.name}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-xl">{product.name}</h3>
                      <p className="text-gray-500">Price: ${product.price}</p>
                      <p className="text-gray-500">
                        Category ID: {product.categoryId}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
