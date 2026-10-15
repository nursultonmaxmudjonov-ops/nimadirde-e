// src/app/admin/page.jsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Admin sifatida kirganini tekshirish
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const products = useQuery(api.products.getProducts);
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const addProduct = useMutation(api.products.addProduct);
  const deleteProduct = useMutation(api.products.deleteProduct);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [gpu, setGpu] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!authorized) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !selectedFile) {
      alert("Iltimos, Noutbuk nomi, narxi va rasmini kiriting!");
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
        processor: processor || "AMD Ryzen 5",
        ram: ram || "16 GB DDR5",
        storage: storage || "512 GB SSD",
        gpu: gpu || "NVIDIA RTX 5050",
      });

      setTitle("");
      setPrice("");
      setProcessor("");
      setRam("");
      setStorage("");
      setGpu("");
      setDescription("");
      setSelectedFile(null);
      alert("Noutbuk muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  return (
    <main className="p-8 max-w-5xl mx-auto text-white bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          ⚙️ Admin Panel
        </h1>
        <div className="flex gap-3">
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition border border-slate-700">
            Do'kon
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600/20 text-red-400 border border-red-600/30 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white text-sm font-medium transition"
          >
            Chiqish
          </button>
        </div>
      </div>

      {/* Statistika Bloki */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <p className="text-slate-400 text-xs mb-1">Jami modellar soni</p>
          <p className="text-3xl font-extrabold text-blue-400">{products ? products.length : 0}</p>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <p className="text-slate-400 text-xs mb-1">Ombordagi umumiy qiymat</p>
          <p className="text-3xl font-extrabold text-green-400">
            ${products ? products.reduce((sum, item) => sum + item.price, 0) : 0}
          </p>
        </div>
      </div>

      {/* Yangi Mahsulot Qo'shish Formasi */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl mb-12 border border-slate-800">
        <h2 className="text-xl font-bold mb-6 text-blue-400">Yangi Noutbuk Qo'shish</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Model nomi (masalan: ASUS ROG Strix G16)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Narxi ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Protsessor (masalan: Ryzen 5 / i7)"
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="RAM (masalan: 16 GB)"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="SSD (masalan: 512 GB)"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="GPU (masalan: RTX 5050)"
              value={gpu}
              onChange={(e) => setGpu(e.target.value)}
              className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="p-3 rounded-xl bg-slate-800 border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-500 cursor-pointer text-sm"
          />
          <textarea
            placeholder="Qisqacha tavsif..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none h-24 focus:border-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 font-semibold p-3.5 rounded-xl transition disabled:opacity-50 shadow-lg shadow-blue-600/25 text-sm"
          >
            {loading ? "Yuklanmoqda..." : "Mahsulotni Qo'shish"}
          </button>
        </form>
      </div>

      {/* Mavjud Noutbuklar Ro'yxati va O'chirish */}
      <h2 className="text-2xl font-bold mb-6">Mavjud Noutbuklar Ro'yxati</h2>
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl">
        {products === undefined ? (
          <p className="text-slate-500">Yuklanmoqda...</p>
        ) : products.length === 0 ? (
          <p className="text-slate-500">Hozircha mahsulotlar yo'q.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                  )}
                  <div>
                    <h3 className="font-bold text-base text-white">{item.title}</h3>
                    <p className="text-blue-400 text-xs font-mono mt-0.5">{item.processor} | {item.ram} | {item.gpu}</p>
                    <p className="text-green-400 font-bold mt-1">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Rostdan ham bu noutbukni o'chirmoqchimisiz?")) {
                      deleteProduct({ id: item._id });
                    }
                  }}
                  className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition border border-red-600/30"
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