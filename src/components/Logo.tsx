// MeetMind wordmark + icon — a sound-wave forming a thought bubble
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background */}
      <rect width="40" height="40" rx="11" fill="#3A5C34" />

      {/* Waveform bars — audio intelligence */}
      <rect x="8"  y="18" width="3" height="4"  rx="1.5" fill="white" opacity="0.4" />
      <rect x="13" y="13" width="3" height="14" rx="1.5" fill="white" opacity="0.65" />
      <rect x="18" y="9"  width="3" height="22" rx="1.5" fill="white" />
      <rect x="23" y="13" width="3" height="14" rx="1.5" fill="white" opacity="0.65" />
      <rect x="28" y="18" width="3" height="4"  rx="1.5" fill="white" opacity="0.4" />
    </svg>
  );
}

export function LogoWordmark({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} />
      <span
        style={{ fontSize: size * 0.46, lineHeight: 1, letterSpacing: "-0.02em" }}
        className="font-semibold text-[#1a1a1a]"
      >
        Meet<span className="text-[#3A5C34]">Mind</span>
      </span>
    </div>
  );
}
