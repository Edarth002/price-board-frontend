import "./globals.css";

export const metadata = {
  title: "Product Price Board",
  description: "Product Price Board for Calculation of Product Prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </body>
    </html>
  );
}
