import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LogoWordmark } from "./Logo";

const navLinks = [
  { label: "Product",      href: "#product" },
  { label: "How it Works", href: "#how" },
  { label: "Features",     href: "#features" },
  { label: "Roadmap",      href: "#roadmap" },
  { label: "Pricing",      href: "#pricing" },
];

export default function Navbar({ onWatchDemo }: { onWatchDemo?: () => void }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F6F3]/92 backdrop-blur-lg border-b border-[#E5E2DC] py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#"><LogoWordmark size={34} /></a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-[#6B6560] hover:text-[#1a1a1a] transition-colors duration-200 font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2">
          {onWatchDemo && (
            <button
              onClick={onWatchDemo}
              className="text-sm font-medium text-[#3A5C34] hover:text-[#2E4A29] transition-colors px-3 py-2 flex items-center gap-1.5"
            >
              <span className="size-4 rounded-full bg-[#EDF5EC] border border-[#C9DEC5] grid place-items-center text-[9px]">▶</span>
              See how it works
            </button>
          )}
          <a
            href="#waitlist"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-[#3A5C34] text-white hover:bg-[#2E4A29] transition-colors duration-200 shadow-sm"
          >
            Join waitlist
          </a>
        </div>

        <button
          className="md:hidden text-[#6B6560] hover:text-[#1a1a1a] transition"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#F7F6F3]/98 backdrop-blur border-t border-[#E5E2DC] px-5 py-5 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[#6B6560] hover:text-[#1a1a1a] py-2 font-medium transition"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#waitlist"
              className="block text-center text-sm font-semibold px-4 py-2.5 rounded-full bg-[#3A5C34] text-white"
            >
              Join waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
