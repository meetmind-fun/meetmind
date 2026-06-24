import { Coins, Lock, Users, Rocket, Gift, BarChart } from "lucide-react";

const allocation = [
  { label: "Community & Backers",    pct: 40, color: "#6B5A9E", bg: "#F3F0FA", icon: Users,   desc: "Early supporters on EasyA Kickstart" },
  { label: "Product Development",    pct: 25, color: "#4A7A6B", bg: "#EEF5F3", icon: Rocket,  desc: "Engineering, AI models, infrastructure" },
  { label: "Team & Advisors",        pct: 15, color: "#6B8F63", bg: "#F2F7F1", icon: Lock,    desc: "2-year vest, 6-month cliff" },
  { label: "Ecosystem & Grants",     pct: 12, color: "#B07A3E", bg: "#FDF6EE", icon: Gift,    desc: "Partnerships, integrations, bounties" },
  { label: "Treasury & Liquidity",   pct:  8, color: "#7A8FB0", bg: "#EFF2F8", icon: BarChart, desc: "DAO-controlled reserves" },
];

const utility = [
  { emoji: "🔓", title: "Premium Access",  desc: "Hold $MIND to unlock advanced AI features, unlimited transcription, and priority processing." },
  { emoji: "🗳️", title: "Governance",      desc: "Vote on the product roadmap, integrations, and protocol upgrades. Your tokens, your voice." },
  { emoji: "💸", title: "Revenue Share",   desc: "50% of subscription revenue flows to $MIND stakers. We earn together." },
  { emoji: "🤝", title: "Partner Rewards", desc: "Enterprises that bring their teams to MeetMind earn $MIND bounties." },
];

const tokenInfo = [
  { label: "Token name",    val: "$MIND" },
  { label: "Chain",         val: "Solana" },
  { label: "Total supply",  val: "1,000,000,000" },
  { label: "Launch",        val: "EasyA Kickstart" },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-3">Tokenomics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            $MIND — the intelligence token
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            $MIND aligns community, product, and revenue. Back early, shape the future, and share in its growth.
          </p>
        </div>

        {/* Token info strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {tokenInfo.map((s) => (
            <div key={s.label} className="bg-[#FDFCFB] border border-[#E8E4DE] rounded-xl p-4 text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#9B958E] mb-1">{s.label}</div>
              <div className="text-[14px] font-semibold text-[#1a1a1a]">{s.val}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-7">

          {/* Allocation */}
          <div className="bg-[#FDFCFB] border border-[#E8E4DE] rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-6">
              <Coins className="size-4 text-[#6B8F63]" strokeWidth={1.75} />
              <span className="text-[13px] font-semibold text-[#1a1a1a]">Token Allocation</span>
            </div>

            <div className="space-y-3.5 mb-6">
              {allocation.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-7 rounded-lg grid place-items-center shrink-0" style={{ backgroundColor: a.bg }}>
                    <a.icon className="size-3.5" style={{ color: a.color }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium text-[#1a1a1a] truncate">{a.label}</span>
                      <span className="text-[12px] font-semibold text-[#1a1a1a] ml-2">{a.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#F0EDE8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${a.pct}%`, backgroundColor: a.color, opacity: 0.65 }}
                      />
                    </div>
                    <p className="text-[10px] text-[#9B958E] mt-0.5">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple visual ring */}
            <div className="pt-5 border-t border-[#E8E4DE] flex items-center gap-4">
              <div className="relative size-20 shrink-0">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    return allocation.map((a, i) => {
                      const C = 100.53;
                      const dash = (a.pct / 100) * C;
                      const el = (
                        <circle
                          key={i} cx="18" cy="18" r="16" fill="none"
                          strokeWidth="3.5"
                          stroke={a.color}
                          strokeOpacity="0.7"
                          strokeDasharray={`${dash} ${C - dash}`}
                          strokeDashoffset={-(offset / 100) * C}
                        />
                      );
                      offset += a.pct;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[11px] font-bold text-[#1a1a1a]">1B</div>
                    <div className="text-[8px] text-[#9B958E]">SUPPLY</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {allocation.map((a) => (
                  <div key={a.label} className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ backgroundColor: a.color, opacity: 0.7 }} />
                    <span className="text-[10px] text-[#6B6560]">{a.label} {a.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Utility + CTA */}
          <div className="flex flex-col gap-5">
            <div className="bg-[#FDFCFB] border border-[#E8E4DE] rounded-2xl p-7">
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-4">Token Utility</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {utility.map((u, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] hover:border-[#C5C0B8] transition-colors">
                    <div className="text-xl mb-2">{u.emoji}</div>
                    <h4 className="text-[12px] font-semibold text-[#1a1a1a] mb-1">{u.title}</h4>
                    <p className="text-[11px] text-[#6B6560] leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kickstart CTA card */}
            <div className="bg-[#F3F7F2] border border-[#C5D9C1] rounded-2xl p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#4A6741] mb-2">Live on EasyA Kickstart</p>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Back $MIND early.</h3>
              <p className="text-[13px] text-[#6B6560] mb-5 leading-relaxed">
                The first 500 backers lock in the lowest price. Join the founding community and help shape the future of meetings.
              </p>
              <a
                href="https://kickstart.easya.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A6741] text-white text-[13px] font-semibold hover:bg-[#3D5636] transition-colors shadow-sm"
              >
                Buy $MIND on Kickstart →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
