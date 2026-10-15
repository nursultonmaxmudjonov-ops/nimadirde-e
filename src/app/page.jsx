// src/app/page.jsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export default function ProductsPage() {
  const products = useQuery(api.products.getProducts);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.addProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !selectedFile) {
      alert("Iltimos, barcha maydonlarni to'ldiring va rasm tanlang!");
      return;
    }

    try {
      setLoading(true);

      // 1. Convex dan yuklash uchun maxsus URL olamiz
      const postUrl = await generateUploadUrl();

      // 2. Rasmni Convex Storage ga yuklaymiz
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      const { storageId } = await result.json();

      // 3. Mahsulot ma'lumotlarini bazaga saqlaymiz
      await addProduct({
        title,
        price: Number(price),
        imageId: storageId,
        description,
      });

      // Formalarni tozalash
      setTitle("");
      setPrice("");
      setDescription("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        💻 Noutbuklar Do'koni (File Upload)
      </h1>

      {/* Mahsulot qo'shish formasi */}
      <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md mb-12 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Yangi Noutbuk Qo'shish</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Noutbuk nomi (masalan: ASUS ROG Strix)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 text-white outline-none"
          />
          <input
            type="number"
            placeholder="Narxi ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 text-white outline-none"
          />
          
          {/* Kompyuterdan rasm tanlash */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Noutbuk rasmini tanlang:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="p-2 rounded bg-slate-700 border border-slate-600 text-white file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <textarea
            placeholder="Tavsifi..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 text-white outline-none h-20"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Yuklanmoqda..." : "Qo'shish"}
          </button>
        </form>
      </div>

      {/* Mahsulotlarni Card ko'rinishida chiqarish */}
      <h2 className="text-2xl font-bold mb-6">Mavjud Noutbuklar</h2>

      {products === undefined ? (
        <p className="text-gray-400">Yuklanmoqda...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">Hozircha noutbuklar qo'shilmagan.</p>
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