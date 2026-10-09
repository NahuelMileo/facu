/** Scan lines, a slow scan beam and film grain over the whole viewport. Purely decorative. */
export function Atmosphere() {
  return (
    <>
      <div aria-hidden className="scanlines" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[58] h-32 animate-scan bg-linear-to-b from-transparent via-white/[0.022] to-transparent"
      />
      <div aria-hidden className="grain" />
    </>
  );
}
