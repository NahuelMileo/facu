/** Very faint radar: concentric rings, bearings and a slow sweep. Purely decorative. */
export function Radar({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e7e3d9" stopOpacity="0" />
            <stop offset="1" stopColor="#e7e3d9" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#e7e3d9" strokeOpacity="0.09" strokeWidth="0.75">
          {[40, 80, 120, 160, 199].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} />
          ))}
          <path d="M200 0v400M0 200h400" />
          <path d="M58.6 58.6l282.8 282.8M341.4 58.6L58.6 341.4" strokeDasharray="2 6" />
        </g>
        <g fill="#e7e3d9" fillOpacity="0.25" fontFamily="monospace" fontSize="7">
          <text x="204" y="12">000</text>
          <text x="384" y="196">090</text>
          <text x="204" y="394">180</text>
          <text x="4" y="196">270</text>
        </g>
        <g className="origin-center animate-sweep" style={{ transformBox: "view-box" }}>
          <path d="M200 200 L200 1 A199 199 0 0 1 340.7 59.3 Z" fill="url(#sweep)" />
          <path d="M200 200 L340.7 59.3" stroke="#e7e3d9" strokeOpacity="0.25" strokeWidth="0.75" />
        </g>
        {/* contacts */}
        <circle cx="262" cy="128" r="2" fill="#c8912f" fillOpacity="0.7" />
        <circle cx="138" cy="246" r="1.5" fill="#e7e3d9" fillOpacity="0.35" />
      </svg>
    </div>
  );
}
