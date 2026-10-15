// src/app/page.jsx
"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";

export default function HomePage() {
  const products = useQuery(api.products.getProducts);

  return (
    <main className="p-8 max-w-6xl mx-auto">
      {/* Yuqori qism (Navigatsiya) */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">💻 Noutbuklar Do'koni</h1>
        <Link
          href="/admin"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow"
        >
          ⚙️ Admin Panel
        </Link>
      </div>

      {/* Noutbuklar Cardlari */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mavjud Noutbuklar</h2>

      {products === undefined ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Hozircha noutbuklar qo'shilmagan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl overflow-hidden shadow-lg flex flex-col justify-between text-black"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <span className="text-lg font-bold text-green-600">
                    ${item.price}
                  </span>
                  <button className="bg-slate-900 text-white px-3 py-1.5 rounded text-sm hover:bg-slate-800">
                    Sotib olish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}