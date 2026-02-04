"use client";

export default function FooterGlow() {
  return (
    <footer className="relative z-10 mt-2 w-full pt-16 pb-8">
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div className="absolute inset-0 glow-drift translate-y-12">
          <div className="absolute -top-52 left-[-36%] h-[560px] w-[560px] rounded-full bg-cyan-500/20 blur-[140px]" />
          <div className="absolute -bottom-72 right-[-34%] h-[680px] w-[680px] rounded-full bg-purple-500/20 blur-[160px]" />
        </div>
        <div className="absolute top-52 right-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-indigo-500/14 blur-[140px]" />
      </div>
      <style>{`
        @keyframes glowDrift {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(12px, -10px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .glow-drift { animation: glowDrift 28s ease-in-out infinite; }
      `}</style>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-2xl border border-white/10 bg-zinc-950/70 px-6 py-10 backdrop-blur-md md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start pl-6">
          <a
            href="#top"
            className="mb-4 flex items-center gap-3"
            onClick={(event) => {
              event.preventDefault();
              window.dispatchEvent(new CustomEvent("nav-scroll", { detail: "home" }));
            }}
          >
            <span className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-500 p-[2px]">
              <img
                src="/Logo.jpg"
                alt="Cedric logo"
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">
              Cedric Ariño
            </span>
          </a>
          <p className="mb-6 max-w-xs text-center text-sm text-zinc-300 md:text-left">
            I create clean, modern web experiences with an eye for
            detail, accessibility, and performance.
          </p>
          <div className="mt-2 flex gap-3 text-cyan-300">
            <a href="https://github.com/cdarino" aria-label="GitHub" className="transition hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .29a12 12 0 00-3.797 23.401c.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.084-.729.084-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.306 3.495.999.106-.775.418-1.307.76-1.608-2.665-.301-5.466-1.332-5.466-5.933 0-1.31.469-2.381 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.301 1.23a11.502 11.502 0 016.002 0c2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.805 5.629-5.476 5.925.429.369.813 1.096.813 2.211v3.285c0 .32.217.694.825.576A12 12 0 0012 .29"></path>
              </svg>
            </a>
          </div>
        </div>

        <nav className="flex w-full flex-col gap-3 text-center px-6 md:w-auto md:text-left">
          <div className="mb-1 text-xs font-semibold tracking-widest text-cyan-300 uppercase">
            Links
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-300 md:justify-start">
            <li>
              <a
                href="#top"
                className="transition hover:text-white"
                onClick={(event) => {
                  event.preventDefault();
                  window.dispatchEvent(new CustomEvent("nav-scroll", { detail: "home" }));
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="transition hover:text-white"
                onClick={(event) => {
                  event.preventDefault();
                  window.dispatchEvent(new CustomEvent("nav-scroll", { detail: "about" }));
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="transition hover:text-white"
                onClick={(event) => {
                  event.preventDefault();
                  window.dispatchEvent(new CustomEvent("nav-scroll", { detail: "contact" }));
                }}
              >
                Contact
              </a>
            </li>
            <li><a href="https://github.com/cdarino" className="transition hover:text-white">GitHub</a></li>
          </ul>
        </nav>
      </div>

      <div className="relative z-10 mt-10 text-center text-xs text-zinc-400">
        <span>&copy; 2026 Cedric Ariño. All rights reserved.</span>
      </div>
    </footer>
  );
}
