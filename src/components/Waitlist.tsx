import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { addToWaitlist } from "../lib/db";

const ROLES = [
  "Engineering Manager",
  "Product Manager",
  "Founder / CEO",
  "Sales Leader",
  "Operations",
  "Individual Contributor",
  "Other",
];

type Step = "form" | "submitting" | "done" | "error";

export default function Waitlist() {
  const [step, setStep]       = useState<Step>("form");
  const [email, setEmail]     = useState("");
  const [name, setName]       = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole]       = useState("");
  const [errorMsg, setError]  = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setStep("submitting");
    setError("");

    const result = await addToWaitlist({ email: email.trim().toLowerCase(), name: name.trim(), company: company.trim(), role });

    if (result.ok) {
      setStep("done");
    } else if (result.duplicate) {
      setStep("error");
      setError("You're already on the list! We'll be in touch soon.");
    } else {
      setStep("error");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="py-24 px-5 bg-[#F3F7F2]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* ── Left: copy ── */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-[#C9DEC5] rounded-full px-3.5 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-[#5A8F50] animate-pulse-soft" />
            <span className="text-xs font-medium text-[#3A5C34]">Private beta · 50 spots remaining</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-5">
            Join the waitlist.<br />
            <span className="text-[#3A5C34]">Be first in.</span>
          </h2>

          <p className="text-[16px] text-[#6B6560] leading-relaxed mb-8 max-w-md">
            We're onboarding design partners one cohort at a time. Join the list to get priority access, early pricing, and a direct line to the founding team.
          </p>

          <ul className="space-y-3">
            {[
              "Priority access before public launch",
              "Locked-in early adopter pricing",
              "Direct input into the product roadmap",
              "Free onboarding session with the team",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="size-5 rounded-full bg-[#EDF5EC] border border-[#C9DEC5] grid place-items-center shrink-0">
                  <CheckCircle2 className="size-3 text-[#3A5C34]" strokeWidth={2.5} />
                </div>
                <span className="text-[14px] text-[#4A4540]">{item}</span>
              </li>
            ))}
          </ul>

          {/* Social proof micro-stat */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#6B8F63","#7B8FA8","#A8836B","#5A6A9E","#A07030"].map((c, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-[#F3F7F2] grid place-items-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: c }}
                >
                  {["S","J","P","M","R"][i]}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#6B6560]">
              <span className="font-semibold text-[#1a1a1a]">143 teams</span> already signed up
            </p>
          </div>
        </div>

        {/* ── Right: form card ── */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-[#3A5C34]/5 blur-xl" />
          <div className="relative bg-white border border-[#E5E2DC] rounded-2xl shadow-xl shadow-black/5 overflow-hidden">

            {/* Card header */}
            <div className="px-7 py-5 border-b border-[#E8E4DE] bg-[#F9F8F5]">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Request early access</p>
              <p className="text-[12px] text-[#9B958E] mt-0.5">Takes 30 seconds. No credit card.</p>
            </div>

            <div className="px-7 py-6">
              {/* ── Done state ── */}
              {step === "done" && (
                <div className="py-8 flex flex-col items-center text-center gap-4">
                  <div className="size-14 rounded-full bg-[#EDF5EC] border border-[#C9DEC5] grid place-items-center">
                    <CheckCircle2 className="size-7 text-[#3A5C34]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#1a1a1a] mb-1">You're on the list!</p>
                    <p className="text-[13px] text-[#6B6560] max-w-xs mx-auto leading-relaxed">
                      We'll reach out to <span className="font-medium text-[#1a1a1a]">{email}</span> when your spot opens up. Expect to hear from us soon.
                    </p>
                  </div>
                  <button
                    onClick={() => { setStep("form"); setEmail(""); setName(""); setCompany(""); setRole(""); }}
                    className="text-[12px] text-[#9B958E] hover:text-[#6B6560] transition-colors mt-1"
                  >
                    Submit another →
                  </button>
                </div>
              )}

              {/* ── Form ── */}
              {(step === "form" || step === "submitting" || step === "error") && (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {step === "error" && (
                    <div className="bg-[#FDF0EE] border border-[#EEC5BF] rounded-xl px-4 py-3">
                      <p className="text-[12.5px] text-[#B84E44]">{errorMsg}</p>
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">
                        Full name <span className="text-[#B84E44]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Kim"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0DCD6] bg-[#FDFCFB] text-[13px] text-[#1a1a1a] placeholder-[#C5C0B8] focus:outline-none focus:border-[#3A5C34] focus:ring-2 focus:ring-[#3A5C34]/10 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">
                        Work email <span className="text-[#B84E44]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@acme.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0DCD6] bg-[#FDFCFB] text-[13px] text-[#1a1a1a] placeholder-[#C5C0B8] focus:outline-none focus:border-[#3A5C34] focus:ring-2 focus:ring-[#3A5C34]/10 transition"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0DCD6] bg-[#FDFCFB] text-[13px] text-[#1a1a1a] placeholder-[#C5C0B8] focus:outline-none focus:border-[#3A5C34] focus:ring-2 focus:ring-[#3A5C34]/10 transition"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6560] uppercase tracking-wider mb-1.5">
                      Your role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0DCD6] bg-[#FDFCFB] text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#3A5C34] focus:ring-2 focus:ring-[#3A5C34]/10 transition appearance-none"
                    >
                      <option value="">Select a role…</option>
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={step === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3A5C34] text-white font-semibold text-[14px] hover:bg-[#2E4A29] disabled:opacity-70 transition-colors shadow-md shadow-[#3A5C34]/15 mt-2"
                  >
                    {step === "submitting" ? (
                      <><Loader2 className="size-4 animate-spin" /> Joining…</>
                    ) : (
                      <>Request early access <ArrowRight className="size-4" /></>
                    )}
                  </button>

                  <p className="text-[11px] text-[#9B958E] text-center">
                    No spam, ever. Unsubscribe any time. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
