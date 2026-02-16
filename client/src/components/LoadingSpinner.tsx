import { useState, useEffect } from "react";

const PURPLE = "#a78bfa";
const GREEN = "#6abf4b";
const GREEN_LIGHT = "#a3e635";
const BROWN_DARK = "#5c3a1e";
const BROWN_MED = "#8b5e3c";

const spinners = [
  { key: "fish", label: "casting...", icon: <FishSpinner /> },
  { key: "golf", label: "teeing up...", icon: <GolfSpinner /> },
  { key: "heart", label: "healing up...", icon: <HeartSpinner /> },
  { key: "keyboard", label: "typing...", icon: <KeyboardSpinner /> },
];

function FishSpinner() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Fish swimming counter-clockwise */}
      <g className="animate-swim-cw">
        {/* Body */}
        <ellipse cx="32" cy="12" rx="10" ry="5" fill={GREEN} />
        {/* Tail */}
        <polygon points="22,12 16,7 16,17" fill={GREEN_LIGHT} />
        {/* Eye */}
        <circle cx="38" cy="11" r="1.5" fill="white" />
        <circle cx="38" cy="11" r="0.8" fill={BROWN_DARK} />
      </g>
      {/* Water ripples */}
      <circle cx="32" cy="32" r="18" stroke={PURPLE} strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="32" cy="32" r="24" stroke={PURPLE} strokeWidth="1" fill="none" opacity="0.2" />
      <style>{`
        @keyframes swimCw {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-swim-cw {
          animation: swimCw 2s linear infinite;
          transform-origin: 32px 32px;
        }
      `}</style>
    </svg>
  );
}

function GolfSpinner() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Grass */}
      <rect x="0" y="48" width="64" height="16" fill={GREEN} opacity="0.25" rx="2" />
      {/* Hole */}
      <ellipse cx="44" cy="50" rx="10" ry="4" fill={BROWN_MED} />
      <ellipse cx="44" cy="50" rx="6" ry="2.5" fill={BROWN_DARK} />
      {/* Flag */}
      <line x1="44" y1="50" x2="44" y2="22" stroke={BROWN_MED} strokeWidth="1.5" />
      <polygon points="44,22 44,30 54,26" fill={PURPLE} />
      {/* Ball rolling toward hole */}
      <circle cx="10" cy="48" r="4" fill="white" stroke={BROWN_MED} strokeWidth="1" className="animate-roll" />
      <style>{`
        @keyframes roll {
          0%   { cx: 10; cy: 48; }
          70%  { cx: 38; cy: 48; }
          85%  { cx: 42; cy: 48; }
          95%  { cx: 44; cy: 50; r: 3; }
          100% { cx: 44; cy: 50; r: 0; }
        }
        .animate-roll {
          animation: roll 2.5s ease-in infinite;
        }
      `}</style>
    </svg>
  );
}

function HeartSpinner() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Pixel heart — 8-bit style grid */}
      <g className="animate-pulse-heart">
        {/* Row 1 */}
        <rect x="12" y="16" width="6" height="6" fill={PURPLE} />
        <rect x="18" y="16" width="6" height="6" fill={PURPLE} />
        <rect x="30" y="16" width="6" height="6" fill={PURPLE} />
        <rect x="36" y="16" width="6" height="6" fill={PURPLE} />
        {/* Row 2 */}
        <rect x="6" y="22" width="6" height="6" fill={PURPLE} />
        <rect x="12" y="22" width="6" height="6" fill={GREEN} />
        <rect x="18" y="22" width="6" height="6" fill={PURPLE} />
        <rect x="24" y="22" width="6" height="6" fill={PURPLE} />
        <rect x="30" y="22" width="6" height="6" fill={PURPLE} />
        <rect x="36" y="22" width="6" height="6" fill={GREEN} />
        <rect x="42" y="22" width="6" height="6" fill={PURPLE} />
        {/* Row 3 */}
        <rect x="6" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="12" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="18" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="24" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="30" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="36" y="28" width="6" height="6" fill={PURPLE} />
        <rect x="42" y="28" width="6" height="6" fill={PURPLE} />
        {/* Row 4 */}
        <rect x="12" y="34" width="6" height="6" fill={PURPLE} />
        <rect x="18" y="34" width="6" height="6" fill={PURPLE} />
        <rect x="24" y="34" width="6" height="6" fill={PURPLE} />
        <rect x="30" y="34" width="6" height="6" fill={PURPLE} />
        <rect x="36" y="34" width="6" height="6" fill={PURPLE} />
        {/* Row 5 */}
        <rect x="18" y="40" width="6" height="6" fill={PURPLE} />
        <rect x="24" y="40" width="6" height="6" fill={PURPLE} />
        <rect x="30" y="40" width="6" height="6" fill={PURPLE} />
        {/* Row 6 */}
        <rect x="24" y="46" width="6" height="6" fill={PURPLE} />
      </g>
      <style>{`
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.1); opacity: 1; }
        }
        .animate-pulse-heart {
          animation: pulseHeart 1s ease-in-out infinite;
          transform-origin: 27px 32px;
        }
      `}</style>
    </svg>
  );
}

function KeyboardSpinner() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Keycap base/shadow */}
      <rect x="16" y="18" width="32" height="32" rx="4" fill={BROWN_MED} />
      {/* Keycap top — animates pressing down */}
      <g className="animate-keypress">
        <rect x="18" y="16" width="28" height="28" rx="3" fill={BROWN_DARK} stroke={BROWN_MED} strokeWidth="1.5" />
        {/* Letter on key */}
        <text x="32" y="35" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="bold" fill={PURPLE}>
          N
        </text>
      </g>
      <style>{`
        @keyframes keypress {
          0%, 100% { transform: translateY(0); }
          40%      { transform: translateY(4px); }
          60%      { transform: translateY(4px); }
          80%      { transform: translateY(0); }
        }
        .animate-keypress {
          animation: keypress 0.8s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

export default function LoadingSpinner() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * spinners.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        let next = Math.floor(Math.random() * spinners.length);
        while (next === prev) {
          next = Math.floor(Math.random() * spinners.length);
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = spinners[index];

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div key={current.key} className="animate-fade-in">
        {current.icon}
      </div>
      <p key={current.label} className="animate-fade-in text-sm font-medium" style={{ color: PURPLE }}>
        {current.label}
      </p>
    </div>
  );
}
