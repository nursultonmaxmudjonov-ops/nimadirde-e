// src/app/admin/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Login yoki parol xato!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">⚙️ Admin Kirish</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Faqat ma'muriyat uchun</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Admin Login</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Parol</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 font-semibold p-3 rounded-lg transition mt-2 shadow-lg shadow-blue-600/20"
          >
            Kirish
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition">
            ← Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  );
}