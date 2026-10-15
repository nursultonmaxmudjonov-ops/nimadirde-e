// src/app/page.jsx
"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const products = useQuery(api.products.getProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Qidiruv bo'yicha filtrlash
  const filteredProducts = products?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.processor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Savatga qo'shish
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`"${product.title}" savatga qo'shildi! 🛒`);
  };

  // Savatdan o'chirish
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white relative">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              ⚡ NEXUS LAPTOP STORE
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Savat tugmasi */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 relative"
            >
              🛒 Savat
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            <Link
              href="/admin/login"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/20"
            >
              ⚙️ Admin Panel
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Qidiruv va banner qismi */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">O'zingiz uchun mukammal noutbukni tanlang</h2>
          <p className="text-slate-400 mb-6">O'yin, dasturlash va professional dizayn uchun eng kuchli modellar.</p>
          
          <input
            type="text"
            placeholder="Noutbuk yoki protsessor bo'yicha qidirish (masalan: ROG, Ryzen)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 outline-none focus:border-blue-500 text-white shadow-xl"
          />
        </div>

        {/* Mahsulotlar Grid */}
        <h3 className="text-2xl font-bold mb-6 text-slate-200">Mavjud Modellar</h3>

        {products === undefined ? (
          <p className="text-slate-500 text-center py-10">Yuklanmoqda...</p>
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-lg">Hech qanday noutbuk topilmadi 🔍</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((item) => (
              <div
                key={item._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition duration-300 group"
              >
                <div>
                  {item.imageUrl && (
                    <div className="relative h-56 overflow-hidden bg-slate-950">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                        In Stock
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="text-xl font-bold text-slate-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
                        💻 <span className="font-semibold">{item.processor || "Ryzen 5"}</span>
                      </div>
                      <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
                        🧠 <span className="font-semibold">{item.ram || "16 GB"}</span>
                      </div>
                      <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
                        💾 <span className="font-semibold">{item.storage || "512 GB"}</span>
                      </div>
                      <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 text-slate-300">
                        🎮 <span className="font-semibold">{item.gpu || "RTX 5050"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-800/60 mt-2">
                  <div>
                    <span className="text-xs text-slate-500 block">Narxi:</span>
                    <span className="text-2xl font-extrabold text-green-400">
                      ${item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-600/20"
                  >
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Savat Modali (Drawer) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-slate-900 w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-slate-800 shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold">🛒 Sizning Savatingiz</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-slate-500 text-center py-12">Savatingiz bo'sh.</p>
              ) : (
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                        )}
                        <div>
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-green-400 text-xs font-bold">${item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium px-2 py-1"
                      >
                        O'chirish
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Jami summa:</span>
                  <span className="text-green-400">${totalPrice}</span>
                </div>
                <button
                  onClick={() => {
                    alert("Buyurtmangiz qabul qilindi! Operator tez orada siz bilan bog'lanadi.");
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-green-600/20"
                >
                  Buyurtmani Rasmiylashtirish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}