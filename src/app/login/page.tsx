"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username dan password harus diisi");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === "admin" && password === "isbi2024") {
      router.push("/");
    } else {
      setError("Username atau password salah");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-800 rounded-lg shadow-xl p-8 border border-neutral-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-amber-500 mb-2">🎭</h1>
            <h2 className="text-xl font-semibold text-white">Sistem Pemetaan</h2>
            <p className="text-neutral-400 text-sm">Ensiklopedia Seni Pertunjukan Jawa Barat</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="Masukkan password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Memuat...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-neutral-400 hover:text-amber-500 transition">
              ← Kembali ke Peta
            </Link>
          </div>
        </div>

        <p className="text-center text-neutral-500 text-xs mt-6">
          © 2024 ISBI Bandung — Sistem Pemetaan Ensiklopedia Seni Pertunjukan Jawa Barat
        </p>
      </div>
    </main>
  );
}