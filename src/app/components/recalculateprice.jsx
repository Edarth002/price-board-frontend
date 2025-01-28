"use client";
import React, { useState } from "react";
import { recalculatePrice } from "../apis/recalculateprice";

const PriceRecalculation = () => {
  const [productId, setProductId] = useState("");
  const [status, setStatus] = useState(null); // To display success or error
  const [loading, setLoading] = useState(false); // Loading state

  const handleRecalculatePrice = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await recalculatePrice(productId); // Use API function
      setStatus({ success: true, message: "Price recalculated successfully!" });
      console.log("Response:", response);
    } catch (error) {
      setStatus({
        success: false,
        message: "Failed to recalculate price. Please try again.",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 mx-auto mt-5 space-y-4">
      <h1 className="text-xl font-bold mb-3">Recalculate Product Price</h1>
      <form onSubmit={handleRecalculatePrice} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product ID</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter product ID"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Recalculating..." : "Recalculate Price"}
        </button>
      </form>
      {status && (
        <p
          className={`text-sm ${
            status.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
};

export default PriceRecalculation;
