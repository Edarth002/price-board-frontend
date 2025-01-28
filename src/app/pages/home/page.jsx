"use client";
import Link from "next/link";
import PriceRecalculation from "@/app/components/recalculateprice";
import EmailNotification from "@/app/components/sendemail";

export default function ProductUtilities() {
  return (
    <div className="p-6">
      <nav className="flex right-10 justify-end">
        <Link
          href="/pages/auth/signup"
          className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-3 py-2 rounded-full"
        >
          Sign Up
        </Link>
      </nav>

      <h1 className="text-3xl font-bold text-center my-10 text-blue-800">
        Welcome to our Awesome Price Board Application
      </h1>
      <PriceRecalculation />
      <EmailNotification />
    </div>
  );
}
