"use client";
import { useState } from "react";
import { calculatePrice, sendEmailNotification } from "@/app/apis/utilities";
import Link from "next/link";

export default function ProductUtilities() {
  const [productData, setProductData] = useState({ productId: 0 });
  const [emailData, setEmailData] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Update product data
  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Update email data
  const handleEmailInput = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit product data
  const handleCalculatePrice = async () => {
    setIsLoading(true); // Set loading state
    setResponseMessage(null); // Reset previous response
    setErrorMessage(null); // Reset previous error

    try {
      const data = await calculatePrice(productData);
      setResponseMessage(`Price calculated successfully: ${data.price}`);
    } catch (error) {
      setErrorMessage(`Error calculating price: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading state to false after request is done
    }
  };

  // Submit email data
  const handleSendEmail = async () => {
    setIsLoading(true); // Set loading state
    setResponseMessage(null); // Reset previous response
    setErrorMessage(null); // Reset previous error

    try {
      const data = await sendEmailNotification(emailData);
      setResponseMessage("Email sent successfully");
    } catch (error) {
      setErrorMessage(`Error sending email: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading state to false after request is done
    }
  };

  return (
    <div className="p-6">
      <nav className="bg-blue-600 hover:bg-blue-700 text-white w-28 text-center p-2 rounded-full absolute top-4 right-10 justify-end">
        <Link href="/pages/auth/signup">Sign in</Link>
      </nav>

      <h1 className="text-2xl font-bold mb-4 text-center mt-10">
        Product Utilities
      </h1>

      {/* Product Section */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-2">Calculate Product Price</h2>
        <input
          type="text"
          name="productId"
          value={productData.productId}
          onChange={handleProductInput}
          placeholder="Enter Product ID"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleCalculatePrice}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Loading..." : "Calculate Price"}
        </button>
      </div>

      {/* Email Section */}
      <div className="mb-6 mt-14">
        <h2 className="text-xl font-semibold mb-2">Send Email Notification</h2>
        <input
          type="email"
          name="email"
          value={emailData.email}
          onChange={handleEmailInput}
          placeholder="Recipient Email"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="subject"
          value={emailData.subject}
          onChange={handleEmailInput}
          placeholder="Subject"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          name="body"
          value={emailData.body}
          onChange={handleEmailInput}
          placeholder="Message Body"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleSendEmail}
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Sending..." : "Send Email"}
        </button>
      </div>

      {/* Feedback */}
      <div className="space-y-2">
        {responseMessage && !errorMessage && (
          <div className=" text-green-800 p-2 rounded">{responseMessage}</div>
        )}
        {errorMessage && !responseMessage && (
          <div className=" text-red-800 p-2 rounded">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
