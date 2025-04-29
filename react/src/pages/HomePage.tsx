import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to ShopMate
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Discover the best deals on electronics, fashion & more.
        </p>
        <Button className="text-lg px-6 py-3">Shop Now</Button>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((id) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>Product {id}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`https://via.placeholder.com/300x200?text=Product+${id}`}
                  alt={`Product ${id}`}
                  className="mb-4 rounded"
                />
                <p className="text-gray-600 mb-2">
                  High-quality product you’ll love.
                </p>
                <Button variant="outline">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Category Highlights */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Electronics", "Clothing", "Home", "Books"].map((cat, i) => (
            <div
              key={i}
              className="bg-white w-40 h-40 flex items-center justify-center text-center shadow-md rounded hover:bg-blue-50 transition"
            >
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-5xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["Fast Shipping", "Get your order in 2-3 days"],
            ["Secure Payments", "Safe and encrypted checkout"],
            ["24/7 Support", "Always here to help"],
          ].map(([title, desc], i) => (
            <div key={i} className="p-6 border rounded shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
