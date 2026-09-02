// The SpotBooker mark, inline as SVG so it always renders — no external
// file path to get wrong, no public/ folder placement to worry about.
function Logo({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SpotBooker logo"
    >
      <defs>
        <linearGradient id="spotbooker-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#176b72" />
          <stop offset="100%" stopColor="#0b3d40" />
        </linearGradient>
      </defs>
      <path
        d="M32 4C19.85 4 10 13.85 10 26c0 16 22 34 22 34s22-18 22-34C54 13.85 44.15 4 32 4z"
        fill="url(#spotbooker-pin)"
      />
      <circle cx="32" cy="26" r="15" fill="#f6f3ec" />
      <path
        d="M24.5 26.5 L29.5 31.5 L40 20"
        fill="none"
        stroke="#c99a4b"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Logo;
