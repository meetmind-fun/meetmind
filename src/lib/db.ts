/**
 * Waitlist persistence layer.
 *
 * Priority order:
 *   1. Supabase (if VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are set)
 *   2. localStorage fallback — works in any browser, zero config needed
 *
 * To connect a real Postgres database:
 *   1. Create a free project at https://supabase.com
 *   2. Run this SQL in the Supabase SQL editor:
 *
 *        create table waitlist (
 *          id          uuid primary key default gen_random_uuid(),
 *          email       text not null unique,
 *          name        text,
 *          company     text,
 *          role        text,
 *          created_at  timestamptz not null default now()
 *        );
 *
 *        -- Allow anyone to insert (for the public waitlist form)
 *        alter table waitlist enable row level security;
 *        create policy "public insert" on waitlist for insert with check (true);
 *
 *        -- Reads are blocked by RLS; the admin uses the service-role key
 *        -- set VITE_SUPABASE_SERVICE_KEY in .env for the admin dashboard
 *
 *   3. Add to your .env file:
 *        VITE_SUPABASE_URL=https://xxxx.supabase.co
 *        VITE_SUPABASE_ANON_KEY=eyJh...
 *        VITE_SUPABASE_SERVICE_KEY=eyJh...   ← for admin reads (optional)
 *        VITE_ADMIN_PASSWORD=your-secret
 */

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  company: string;
  role: string;
  created_at: string;
}

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL        = import.meta.env.VITE_SUPABASE_URL        as string | undefined;
const SUPABASE_ANON_KEY   = import.meta.env.VITE_SUPABASE_ANON_KEY   as string | undefined;
const SUPABASE_SERVICE_KEY= import.meta.env.VITE_SUPABASE_SERVICE_KEY as string | undefined;
const useSupabase          = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

const LS_KEY = "meetmind_waitlist";

// ── Helpers ───────────────────────────────────────────────────────────────────
function supaHeaders(serviceRole = false) {
  const key = serviceRole && SUPABASE_SERVICE_KEY ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY!;
  return {
    "Content-Type":  "application/json",
    "apikey":        key,
    "Authorization": `Bearer ${key}`,
    "Prefer":        "return=representation",
  };
}

// ── Public: add to waitlist ───────────────────────────────────────────────────
export async function addToWaitlist(
  data: Omit<WaitlistEntry, "id" | "created_at">
): Promise<{ ok: boolean; duplicate?: boolean; error?: string }> {
  if (useSupabase) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method:  "POST",
        headers: supaHeaders(),
        body:    JSON.stringify(data),
      });
      if (res.status === 409) return { ok: false, duplicate: true };
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err?.message ?? `HTTP ${res.status}` };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  // localStorage fallback
  const list = getLSList();
  if (list.find((e) => e.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, duplicate: true };
  }
  const entry: WaitlistEntry = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  localStorage.setItem(LS_KEY, JSON.stringify([...list, entry]));
  window.dispatchEvent(new CustomEvent("waitlist-updated"));
  return { ok: true };
}

// ── Admin: read all ───────────────────────────────────────────────────────────
export async function getWaitlist(): Promise<WaitlistEntry[]> {
  if (useSupabase) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist?select=*&order=created_at.desc`,
        { headers: supaHeaders(true) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return [];
    }
  }
  return getLSList().slice().reverse();
}

// ── Admin: delete one ─────────────────────────────────────────────────────────
export async function deleteEntry(id: string): Promise<boolean> {
  if (useSupabase) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?id=eq.${id}`, {
        method: "DELETE",
        headers: supaHeaders(true),
      });
      return res.ok;
    } catch { return false; }
  }
  const updated = getLSList().filter((e) => e.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("waitlist-updated"));
  return true;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getLSList(): WaitlistEntry[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]"); }
  catch { return []; }
}

export function toCSV(entries: WaitlistEntry[]): string {
  const headers = ["id", "email", "name", "company", "role", "created_at"];
  const escape  = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const rows    = entries.map((e) => headers.map((h) => escape(String((e as any)[h] ?? ""))).join(","));
  return [headers.join(","), ...rows].join("\n");
}

export function downloadCSV(entries: WaitlistEntry[]) {
  const blob = new Blob([toCSV(entries)], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `meetmind-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Admin password ────────────────────────────────────────────────────────────
export function checkAdminPassword(pw: string): boolean {
  const configured = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
  // Default password when no env var set — change in production!
  return pw === (configured ?? "meetmind-admin-2025");
}
