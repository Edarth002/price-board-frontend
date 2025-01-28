"use client";
import React, { useState } from "react";
import { sendEmail } from "../apis/sendemail";

const EmailNotification = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(null); // To display success or error
  const [loading, setLoading] = useState(false); // Loading state

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await sendEmail(email, subject, body);
      setStatus({ success: true, message: "Email sent successfully!" });
      console.log("Response:", response);
    } catch (error) {
      setStatus({ success: false, message: "Failed to send email." });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6 mx-auto mt-10 rounded-xl space-y-4">
      <h1 className="text-xl font-bold">Send Email Notification</h1>
      <form onSubmit={handleSendEmail} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter recipient email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email subject"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email body"
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
          {loading ? "Sending..." : "Send Email"}
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

export default EmailNotification;
