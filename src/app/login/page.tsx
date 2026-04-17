"use client";

import { useState, FormEvent, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://assets.kiloapps.io/user_840e8ed8-992b-4643-92fd-38dc98263d0a/68732e31-c31b-436c-80cb-5385702aa6cb/a3d19ebb-59a5-44c6-9d8e-a1e69af86aab.webp",
    "https://assets.kiloapps.io/user_840e8ed8-992b-4643-92fd-38dc98263d0a/68732e31-c31b-436c-80cb-5385702aa6cb/15e895de-26dd-4321-b88f-9154f35ece94.jpg",
    "https://assets.kiloapps.io/user_840e8ed8-992b-4643-92fd-38dc98263d0a/68732e31-c31b-436c-80cb-5385702aa6cb/51748c11-719c-4950-bccc-098d43ea878d.jpg",
    "https://assets.kiloapps.io/user_840e8ed8-992b-4643-92fd-38dc98263d0a/68732e31-c31b-436c-80cb-5385702aa6cb/6bc11ac1-a15d-449e-81e0-b55da4c70cff.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password harus diisi");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email atau password salah");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Slideshow Kesenian Jawa Barat */}
        <div className="hidden md:block relative rounded-xl overflow-hidden border border-neutral-700 shadow-xl">
          <div className="relative h-full min-h-[600px]">
            {slides.map((slide, index) => (
              <Image
                key={index}
                src={slide}
                alt={`Kesenian Jawa Barat ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2">Kesenian Jawa Barat</h3>
              <p className="text-neutral-300 text-sm">Menampilkan warisan budaya Sunda yang kaya dan beragam</p>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-amber-500 w-6" : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Login */}
        <div className="w-full">
          <div className="bg-neutral-800 rounded-lg shadow-xl p-8 border border-neutral-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-amber-500 mb-2">🎭</h1>
              <h2 className="text-2xl font-bold text-white">SIBUDI</h2>
              <p className="text-neutral-400 text-sm">Sistem Pemetaan Budaya Indonesia</p>
              <p className="text-neutral-500 text-xs mt-2">ISBI Bandung</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  placeholder="nama@isbi.ac.id"
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

            <div className="mt-6 p-4 bg-neutral-700/50 rounded-lg">
              <p className="text-neutral-400 text-xs text-center mb-2">Akun Demo:</p>
              <div className="text-neutral-500 text-xs space-y-1">
                <p>Mahasiswa: mahasiswa@isbi.ac.id / isbi2024</p>
                <p>Admin: admin@isbi.ac.id / admin123</p>
                <p>Dosen: dosen@isbi.ac.id / dosen123</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-neutral-400 hover:text-amber-500 transition">
                ← Kembali ke Peta
              </Link>
            </div>
          </div>

          <p className="text-center text-neutral-500 text-xs mt-6">
            © 2024 SIBUDI — ISBI Bandung
          </p>
        </div>
      </div>
    </main>
  );
}