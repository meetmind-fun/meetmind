import { LogoWordmark } from "./Logo";
import { Mail } from "lucide-react";

const links = [
  { label: "Features",         href: "#features" },
  { label: "About",            href: "#product" },
  { label: "Documentation",    href: "#" },
  { label: "Privacy policy",   href: "#" },
  { label: "Terms of service", href: "#" },
];

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.02 2.25h6.638l4.26 5.632 5.326-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E2DC] px-5 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        <LogoWordmark size={30} />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[12.5px] text-[#6B6560] hover:text-[#1a1a1a] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* X / Twitter */}
          <a
            href="https://x.com/meetmindfun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9B958E] hover:text-[#1a1a1a] transition-colors"
            aria-label="Follow MeetMind on X"
          >
            <XIcon />
          </a>

          {/* Email */}
          <a
            href="mailto:support@meetmind.fun"
            className="text-[#9B958E] hover:text-[#1a1a1a] transition-colors"
            aria-label="Email MeetMind support"
          >
            <Mail className="size-3.5" strokeWidth={1.75} />
          </a>

          <div className="h-3.5 w-px bg-[#E5E2DC]" />

          <p className="text-[12px] text-[#9B958E] whitespace-nowrap">© 2025 MeetMind, Inc.</p>

          <a
            href="#/admin"
            className="text-[11px] text-[#C5C0B8] hover:text-[#9B958E] transition-colors"
          >
            Admin
          </a>
        </div>

      </div>

      <div className="max-w-6xl mx-auto flex justify-center mt-6">
        <a href="https://orynth.dev/projects/meetmind" target="_blank" rel="noopener">
          <img src="https://orynth.dev/api/badge/meetmind?theme=light&style=default" alt="Featured on Orynth" width="260" height="80" />
        </a>
      </div>
    </footer>
  );
}
