import "./globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Product Price Board",
  description: "Product Price Board for Calculation of Product Prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
