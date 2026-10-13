"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Bizning Mahsulotlar</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group cursor-pointer block"
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <img 
                src={product.images?.[0]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
              />
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="font-semibold text-gray-800 text-base line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-indigo-600">
                  ${product.price}
                </span>
                <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  Batafsil →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}