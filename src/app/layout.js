import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/authcontext";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata = {
  title: "Product Price Board",
  description: "Product Price Board for Calculation of Product Prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
