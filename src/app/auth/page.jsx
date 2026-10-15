// src/app/auth/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    localStorage.setItem("userEmail", email);
    if (!isLogin) {
      localStorage.setItem("userName", name);
      alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
    } else {
      alert("Tizimga muvaffaqiyatli kirdingiz!");
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
            {isLogin ? "Xush kelibsiz!" : "Akkaunt ochish"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Noutbuklar do'koniga kirish uchun ma'lumotlaringizni kiriting" : "Yangi xaridor sifatida ro'yxatdan o'ting"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-xs text-slate-400 mb-1 block font-medium">Ismingiz</label>
              <input
                type="text"
                placeholder="Ismingizni kiriting"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 outline-none focus:border-blue-500 text-white transition placeholder:text-slate-500 text-sm"
              />
            </div>
          )}
          <div>
            <label className="text-xs text-slate-400 mb-1 block font-medium">Email manzil</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 outline-none focus:border-blue-500 text-white transition placeholder:text-slate-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block font-medium">Parol</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 outline-none focus:border-blue-500 text-white transition placeholder:text-slate-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 font-semibold p-3.5 rounded-xl transition shadow-lg shadow-blue-600/25 mt-2 text-sm"
          >
            {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition"
          >
            {isLogin ? "Akkauntingiz yo'qmi? Ro'yxatdan o'ting" : "Akkauntingiz bormi? Tizimga kiring"}
          </button>
          
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition">
            ← Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  );
}