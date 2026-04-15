import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

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
            <span className="text-neutral-300 text-sm">Halo, {session.user?.name}</span>
            <Link href="/" className="text-neutral-300 hover:text-amber-500 transition text-sm">
              Peta
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
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Venue</h3>
            <p className="text-3xl font-bold text-amber-500">20</p>
            <p className="text-neutral-400 text-sm">Total Venue</p>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Seni Pertunjukan</h3>
            <p className="text-3xl font-bold text-amber-500">12</p>
            <p className="text-neutral-400 text-sm">Jenis Seni</p>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">ISBI Bandung</h3>
            <p className="text-3xl font-bold text-amber-500">5</p>
            <p className="text-neutral-400 text-sm">Kampus</p>
          </div>
        </div>
      </div>
    </main>
  );
}