// src/app/admin/page.jsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const products = useQuery(api.products.getProducts);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.addProduct);
  const deleteProduct = useMutation(api.products.deleteProduct);

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
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      const { storageId } = await result.json();

      await addProduct({
        title,
        price: Number(price),
        imageId: storageId,
        description,
      });

      setTitle("");
      setPrice("");
      setDescription("");
      setSelectedFile(null);
      alert("Noutbuk muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-5xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">⚙️ Admin Panel (Noutbuklar boshqaruvi)</h1>
        <Link href="/" className="bg-slate-700 px-4 py-2 rounded hover:bg-slate-600 text-sm">
          ← Bosh sahifaga qaytish
        </Link>
      </div>

      {/* Mahsulot qo'shish formasi */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md mb-10 max-w-xl mx-auto border border-slate-700">
        <h2 className="text-xl font-semibold mb-4">Yangi Noutbuk Qo'shish</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Noutbuk nomi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 outline-none"
          />
          <input
            type="number"
            placeholder="Narxi ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="p-2 rounded bg-slate-700 border border-slate-600 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white"
          />
          <textarea
            placeholder="Tavsifi..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-slate-700 border border-slate-600 outline-none h-20"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 font-medium p-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Yuklanmoqda..." : "Bazaga qo'shish"}
          </button>
        </form>
      </div>

      {/* Mavjud mahsulotlar ro'yxati va o'chirish tugmasi */}
      <h2 className="text-2xl font-bold mb-4">Mavjud Mahsulotlarni Boshqarish</h2>
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        {products === undefined ? (
          <p className="text-gray-400">Yuklanmoqda...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400">Hozircha mahsulotlar yo'q.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover rounded" />
                  )}
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-green-400 text-sm">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Rostdan ham bu noutbukni o'chirmoqchimisiz?")) {
                      deleteProduct({ id: item._id });
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
                >
                  O'chirish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}