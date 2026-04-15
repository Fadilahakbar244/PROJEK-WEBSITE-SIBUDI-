import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎭</span>
            <div>
              <h1 className="text-lg font-bold text-white">ISBIBANDUNG</h1>
              <p className="text-xs text-neutral-400">Seni Pertunjukan Jawa Barat</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/kampus" className="text-neutral-300 hover:text-amber-500 transition text-sm">
              Info Kampus
            </Link>
            <Link href="/login" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-lg transition">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Sistem Pemetaan Ensiklopedia</h2>
          <p className="text-neutral-400">Peta Seni Pertunjukan Jawa Barat</p>
        </div>
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 min-h-[400px] flex items-center justify-center">
          <p className="text-neutral-500">Memuat Peta...</p>
        </div>
      </div>
    </main>
  );
}
