import { useEffect, useState, useCallback } from "react";
import {
  Download, Trash2, RefreshCw, LogOut, Search,
  Users, Mail, Building2, Shield, Eye, EyeOff
} from "lucide-react";
import { checkAdminPassword, getWaitlist, deleteEntry, downloadCSV, type WaitlistEntry } from "../lib/db";
import { LogoWordmark } from "../components/Logo";

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]         = useState("");
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (checkAdminPassword(pw)) {
      sessionStorage.setItem("mm_admin", "1");
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col items-center justify-center px-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <LogoWordmark size={36} />
        </div>

        <div className="bg-white border border-[#E5E2DC] rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
          <div className="px-7 py-5 bg-[#F7F6F3] border-b border-[#E5E2DC] flex items-center gap-2.5">
            <Shield className="size-4 text-[#3A5C34]" strokeWidth={1.75} />
            <div>
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Admin dashboard</p>
              <p className="text-[11px] text-[#9B958E]">Restricted access</p>
            </div>
          </div>

          <form onSubmit={attempt} className={`px-7 py-6 space-y-4 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6560] mb-1.5">
                Admin password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  autoFocus
                  onChange={(e) => { setPw(e.target.value); setError(false); }}
                  placeholder="Enter password"
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-[13px] text-[#1a1a1a] placeholder-[#C5C0B8] focus:outline-none focus:ring-2 transition ${
                    error
                      ? "border-[#B84E44] focus:border-[#B84E44] focus:ring-[#B84E44]/10 bg-[#FDF0EE]"
                      : "border-[#E0DCD6] bg-[#FDFCFB] focus:border-[#3A5C34] focus:ring-[#3A5C34]/10"
                  }`}
                />
                <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B958E] hover:text-[#6B6560]">
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {error && <p className="text-[11px] text-[#B84E44] mt-1.5">Incorrect password. Try again.</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#3A5C34] text-white font-semibold text-[13px] hover:bg-[#2E4A29] transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#9B958E] mt-5">
          Default password: <code className="bg-[#E8E4DE] px-1.5 py-0.5 rounded text-[#4A4540]">meetmind-admin-2025</code><br />
          Set <code className="bg-[#E8E4DE] px-1 rounded text-[#4A4540]">VITE_ADMIN_PASSWORD</code> in .env to change it.
        </p>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [entries, setEntries]   = useState<WaitlistEntry[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [lastRefresh, setLast]  = useState<Date>(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getWaitlist();
    setEntries(data);
    setLast(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Listen for localStorage changes (fallback mode)
  useEffect(() => {
    const handler = () => load();
    window.addEventListener("waitlist-updated", handler);
    return () => window.removeEventListener("waitlist-updated", handler);
  }, [load]);

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.email.toLowerCase().includes(q) ||
      e.name.toLowerCase().includes(q) ||
      (e.company ?? "").toLowerCase().includes(q) ||
      (e.role ?? "").toLowerCase().includes(q)
    );
  });

  async function handleDelete(id: string) {
    if (!confirm("Remove this signup from the waitlist?")) return;
    setDeleting(id);
    await deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
  }

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="bg-white border-b border-[#E5E2DC] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <LogoWordmark size={30} />
          <div className="hidden sm:block h-5 w-px bg-[#E5E2DC]" />
          <div className="hidden sm:flex items-center gap-1.5">
            <Shield className="size-3.5 text-[#3A5C34]" strokeWidth={1.75} />
            <span className="text-[12px] font-semibold text-[#3A5C34]">Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 text-[12px] text-[#6B6560] hover:text-[#1a1a1a] border border-[#E5E2DC] bg-white px-3 py-1.5 rounded-lg hover:bg-[#F0EDE8] transition disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => downloadCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#3A5C34] hover:bg-[#2E4A29] px-3 py-1.5 rounded-lg transition disabled:opacity-40"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            onClick={onLogout}
            className="size-8 rounded-lg border border-[#E5E2DC] hover:bg-[#F0EDE8] grid place-items-center transition"
            title="Sign out"
          >
            <LogOut className="size-3.5 text-[#6B6560]" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Users,     label: "Total signups",    val: entries.length,                                             color: "#3A5C34", bg: "#EDF5EC" },
            { icon: Building2, label: "Companies",        val: new Set(entries.map((e) => e.company).filter(Boolean)).size, color: "#5A6A9E", bg: "#F0F2FA" },
            { icon: Mail,      label: "Last 7 days",      val: entries.filter((e) => Date.now() - new Date(e.created_at).getTime() < 7*86400*1000).length, color: "#A07030", bg: "#FDF6ED" },
            { icon: Search,    label: "Filtered results", val: filtered.length,                                            color: "#9B958E", bg: "#F0EDE8" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E5E2DC] rounded-2xl p-5">
              <div className="size-8 rounded-xl grid place-items-center mb-3" style={{ backgroundColor: s.bg }}>
                <s.icon className="size-4" style={{ color: s.color }} strokeWidth={1.75} />
              </div>
              <p className="text-[22px] font-bold text-[#1a1a1a]">{s.val}</p>
              <p className="text-[11px] text-[#9B958E]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden shadow-sm">
          {/* Search + meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-[#E8E4DE]">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#9B958E]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, company…"
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#E0DCD6] bg-[#FDFCFB] text-[12.5px] text-[#1a1a1a] placeholder-[#C5C0B8] focus:outline-none focus:border-[#3A5C34] focus:ring-2 focus:ring-[#3A5C34]/10 transition"
              />
            </div>
            <p className="text-[11px] text-[#9B958E] shrink-0">
              Last updated {lastRefresh.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-[#9B958E]">
              <RefreshCw className="size-4 animate-spin" />
              <span className="text-[13px]">Loading signups…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[14px] font-medium text-[#1a1a1a] mb-1">
                {entries.length === 0 ? "No signups yet" : "No results match your search"}
              </p>
              <p className="text-[12px] text-[#9B958E]">
                {entries.length === 0 ? "Signups from the waitlist form will appear here." : "Try a different search term."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#F0EDE8] bg-[#F9F8F5]">
                    {["Name", "Email", "Company", "Role", "Signed up", ""].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#9B958E]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr
                      key={e.id}
                      className={`border-b border-[#F7F6F3] hover:bg-[#FDFCFB] transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="size-7 rounded-full grid place-items-center text-white text-[10px] font-bold shrink-0"
                            style={{ backgroundColor: ["#6B8F63","#7B8FA8","#A8836B","#5A6A9E","#A07030","#4A7A6B"][i % 6] }}
                          >
                            {(e.name || e.email)[0].toUpperCase()}
                          </div>
                          <span className="font-medium text-[#1a1a1a]">{e.name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#6B6560]">{e.email}</td>
                      <td className="px-5 py-3.5 text-[#6B6560]">{e.company || <span className="text-[#C5C0B8]">—</span>}</td>
                      <td className="px-5 py-3.5">
                        {e.role
                          ? <span className="px-2 py-0.5 rounded-full bg-[#F0EDE8] text-[#6B6560] text-[10px] font-medium">{e.role}</span>
                          : <span className="text-[#C5C0B8]">—</span>
                        }
                      </td>
                      <td className="px-5 py-3.5 text-[#9B958E] whitespace-nowrap">{fmtDate(e.created_at)}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => handleDelete(e.id)}
                          disabled={deleting === e.id}
                          className="size-7 rounded-lg hover:bg-[#FDF0EE] grid place-items-center transition disabled:opacity-40"
                          title="Remove from waitlist"
                        >
                          <Trash2 className="size-3.5 text-[#C5C0B8] hover:text-[#B84E44] transition-colors" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#F0EDE8] bg-[#F9F8F5]">
              <p className="text-[11px] text-[#9B958E]">
                Showing {filtered.length} of {entries.length} signup{entries.length !== 1 ? "s" : ""}
              </p>
              <button
                onClick={() => downloadCSV(filtered)}
                className="flex items-center gap-1.5 text-[11px] font-medium text-[#3A5C34] hover:text-[#2E4A29] transition-colors"
              >
                <Download className="size-3" />
                Download {search ? "filtered" : "all"} as CSV
              </button>
            </div>
          )}
        </div>

        {/* Setup guide */}
        <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6">
          <p className="text-[12px] font-semibold text-[#1a1a1a] mb-3 flex items-center gap-2">
            <Shield className="size-3.5 text-[#3A5C34]" /> Connect a Postgres database
          </p>
          <p className="text-[12px] text-[#6B6560] mb-4 leading-relaxed">
            Currently storing signups in <strong>browser localStorage</strong> (demo mode).
            To persist to a real Postgres database, create a free{" "}
            <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#3A5C34] underline">Supabase</a>{" "}
            project and add these environment variables:
          </p>
          <div className="bg-[#F7F6F3] border border-[#E5E2DC] rounded-xl p-4 font-mono text-[11px] text-[#4A4540] space-y-1">
            <p><span className="text-[#9B958E]"># .env</span></p>
            <p>VITE_SUPABASE_URL=<span className="text-[#3A5C34]">https://xxxx.supabase.co</span></p>
            <p>VITE_SUPABASE_ANON_KEY=<span className="text-[#3A5C34]">eyJh...</span></p>
            <p>VITE_SUPABASE_SERVICE_KEY=<span className="text-[#3A5C34]">eyJh...</span></p>
            <p>VITE_ADMIN_PASSWORD=<span className="text-[#3A5C34]">your-secret-here</span></p>
          </div>
          <p className="text-[11px] text-[#9B958E] mt-3">
            Run this SQL in the Supabase editor to create the table:{" "}
            <code className="bg-[#F0EDE8] px-1 rounded">create table waitlist (id uuid primary key default gen_random_uuid(), email text not null unique, name text, company text, role text, created_at timestamptz not null default now());</code>
          </p>
        </div>
      </main>
    </div>
  );
}

// ── Route controller ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("mm_admin"));

  function logout() {
    sessionStorage.removeItem("mm_admin");
    setAuthed(false);
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={logout} />;
}
