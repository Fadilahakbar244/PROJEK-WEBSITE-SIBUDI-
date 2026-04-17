import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-neutral-900">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎭</span>
            <div>
              <h1 className="text-lg font-bold text-white">SIBUDI</h1>
              <p className="text-xs text-neutral-400">Sistem Pemetaan Budaya Indonesia</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-neutral-300 text-sm">Halo, {session.user?.name}</span>
                <Link href="/dashboard" className="text-neutral-300 hover:text-amber-500 transition text-sm">
                  Dashboard
                </Link>
                <form action={async () => {
                  "use server";
                  const { signOut } = await import("next-auth/react");
                  await signOut({ callbackUrl: "/" });
                }}>
                  <button type="submit" className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-lg transition">
                    Keluar
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-lg transition">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Sistem Pemetaan Ensiklopedia</h2>
          <p className="text-neutral-400">Seni Pertunjukan Jawa Barat - ISBI Bandung</p>
        </div>
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 min-h-[400px] flex items-center justify-center">
          <p className="text-neutral-500">tampilan slideshow kesenian jawa barat</p>
        </div>
      </div>
    </main>
  );
}