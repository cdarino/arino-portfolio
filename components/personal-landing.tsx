"use client";

import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenuBar } from "@/components/animated-menu-bar";
import FooterGlow from "@/components/footer-glow";
import {
  Github,
  Video,
  Youtube,
} from "lucide-react";

const menuItems = ["home", "about", "contact"] as const;
type MenuItem = typeof menuItems[number];

const HeaderBar: React.FC = () => {
  const [active, setActive] = useState<MenuItem>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    const setFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "about") setActive("about");
      else if (hash === "contact") setActive("contact");
      else setActive("home");
    };
    handleScroll();
    setFromHash();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", setFromHash);
    const handleNavSelect = (event: Event) => {
      const detail = (event as CustomEvent).detail as MenuItem | undefined;
      if (detail) setActive(detail);
    };
    window.addEventListener("nav-select", handleNavSelect as EventListener);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", setFromHash);
      window.removeEventListener("nav-select", handleNavSelect as EventListener);
    };
  }, []);

  const handleSelect = (item: MenuItem) => {
    setActive(item);
    if (item === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(item);
    if (el) {
      const offset = 96;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={twMerge(
        "fixed top-4 left-0 right-0 z-20 mx-auto w-full max-w-5xl flex items-center justify-between gap-6 rounded-2xl px-4 py-3 transition-all",
        scrolled
          ? "border border-white/10 bg-zinc-950/85 backdrop-blur"
          : "border border-transparent bg-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-500 p-[2px]">
          <img
            src="/Logo.jpg"
            alt="Cedric logo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="text-sm uppercase tracking-[0.3em] text-zinc-400">Cedric Ariño</div>
      </div>
      <div className="ml-auto">
        <MenuBar active={active} onSelect={handleSelect} />
      </div>
    </header>
  );
};


const HeroSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-500 opacity-60 blur-lg animate-glow" />
        <img
          src="/Cedric.jpg"
          alt="avatar"
          className="relative h-[22rem] w-[22rem] rounded-full border-4 border-zinc-800 shadow-xl z-10"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight font-geist drop-shadow-lg">
        Hi, I'm Cedric
      </h1>
      <p className="text-xl md:text-2xl text-zinc-300 max-w-lg mx-auto font-inter font-normal">
        I build mobile apps as business solutions to real-world problems, focusing on clarity, usability, and impact.
      </p>
    </section>
  );
};

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/cdarino',
    label: 'GitHub',
    icon: <Github size={28} />,
    bg: 'bg-zinc-800',
    text: 'text-white',
  },
];

const SocialsBlock: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-4 w-full font-inter">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        aria-label={link.label}
        className={twMerge(
          'flex items-center gap-2 rounded-full border border-zinc-800 px-7 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-opacity-80',
          link.bg,
          link.text,
        )}
        style={{ minWidth: 140, minHeight: 56 }}
        tabIndex={0}
      >
        {link.icon}
        <span>{link.label}</span>
      </a>
    ))}
  </div>
);

const AboutBlock = ({ className }: { className?: string }) => (
  <div className={twMerge("w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-lg text-center font-inter", className)}>
    <p className="text-lg md:text-xl text-zinc-200 font-normal">
      Driven by problem-solving and clean design, with a focus on building products that feel intuitive and deliver real value.
    </p>
  </div>
);

const HighlightsBlock = () => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
    <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 p-5 shadow-lg backdrop-blur-sm">
      <div className="text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
        Laundr Prototype
      </div>
      <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
        A laundry delivery app concept focused on fast pickup, tracking, and clear status updates.
      </p>
      <div className="mt-4 flex justify-center">
        <div className="h-[297px] w-[210px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70">
          <img
            src="/laundr.jpg"
            alt="Laundr preview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 p-4 shadow-lg backdrop-blur-sm">
        <div className="text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
          Mobile Focus
        </div>
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
          Building with Flutter to deliver cross‑platform apps with a clean, consistent UX.
        </p>
        <div className="mt-3 flex justify-start pl-2">
          <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70">
            <img
              src="/flutter.png"
              alt="Flutter"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 p-4 shadow-lg backdrop-blur-sm">
        <div className="text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
          Leadership
        </div>
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
          Vice President for Internal Affairs - ACCESS (Ateneo Circle of Computer Enthusiasts for Study and Success).
        </p>
        <div className="mt-3 flex justify-start pl-2">
          <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70">
            <img
              src="/access.jpg"
              alt="ACCESS"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TechStackBlock = () => (
  <div className="w-full flex flex-wrap justify-center gap-2">
    {[
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Java",
      "C++",
    ].map((item) => (
      <span
        key={item}
        className="rounded-full border border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur-sm"
      >
        {item}
      </span>
    ))}
  </div>
);

const AboutMeSection = () => (
  <section id="about" className="w-full flex flex-col items-center gap-8 py-10">
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80 font-semibold">
        About Me
      </div>
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight font-geist">
        Building products that solve real problems.
      </h2>
      <p className="mt-4 text-base md:text-lg text-zinc-300 max-w-2xl">
        I focus on turning real‑world pain points into practical mobile solutions.
        My goal is to become a successful tech startup CEO by building products that people genuinely rely on.
        I value clear UX, strong fundamentals, and consistent iteration from idea to launch.
      </p>
    </div>

    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          title: "What I’m Learning",
          body: "Mobile app development with Flutter, focusing on smooth UX and scalable structure.",
        },
        {
          title: "Strengths",
          body: "Problem‑solving, clear UI thinking, and building reliable, maintainable code.",
        },
        {
          title: "Current Goal",
          body: "Successfully launch a startup built around a real market need.",
        },
        {
          title: "Leadership",
          body: "Organizing teams and initiatives that help peers grow in tech.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="text-sm uppercase tracking-widest text-cyan-300/80 font-semibold">
            {item.title}
          </div>
          <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const ContactInfoBlock = () => (
  <div id="contact" className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-black/80 p-6 shadow-lg backdrop-blur-sm">
    <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80 font-semibold">
      Contact Info
    </div>
    <ul className="mt-4 space-y-3 text-sm text-zinc-300">
      <li className="flex items-center justify-between gap-3">
        <span className="text-zinc-400">Email</span>
        <a href="mailto:cedricarino12@gmail.com" className="hover:text-white transition">
          cedricarino12@gmail.com
        </a>
      </li>
      <li className="flex items-center justify-between gap-3">
        <span className="text-zinc-400">Phone</span>
        <a href="tel:+639001234567" className="hover:text-white transition">
          +63 966 182 5317
        </a>
      </li>
      <li className="flex items-center justify-between gap-3">
        <span className="text-zinc-400">Location</span>
        <span>Davao City, Davao del Sur</span>
      </li>
    </ul>
  </div>
);

const ConnectSection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateMessage = (msg: string) => {
    if (!msg.trim()) return "Message cannot be empty.";
    if (msg.trim().length < 3) return "Message must be at least 3 characters.";
    if (msg.length > 200) return "Message cannot exceed 200 characters.";
    return "";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowToast(true);
    setMessage("");
    setError("");
    if (inputRef.current) inputRef.current.blur();
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (error) setError("");
  };

  return (
    <section className="w-full flex flex-col items-center gap-8 mt-12 font-inter relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fade-in">
          Message sent!
        </div>
      )}
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
        <ContactInfoBlock />
        <div className="w-full">
          <p className="text-lg text-zinc-400 mb-4 max-w-md font-normal text-center md:text-left">
            Interested in collaborating, chatting about tech, or just saying hi? Send me a message below!
          </p>
          <form onSubmit={handleSend} className="flex w-full gap-2 items-center justify-center md:justify-start">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className={twMerge(
                "flex-1 rounded-full border px-5 py-3 text-base text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none shadow font-inter",
                error ? "border-cyan-500 focus:border-cyan-500" : "border-zinc-700 bg-zinc-900 focus:border-purple-400"
              )}
              maxLength={201}
            />
            <button
              type="submit"
              className={twMerge(
                "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 px-7 py-3 text-base font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all",
                message.trim() ? "hover:scale-105 hover:shadow-xl cursor-pointer opacity-100" : "opacity-50 cursor-not-allowed"
              )}
              disabled={!message.trim()}
              aria-disabled={!message.trim()}
            >
              Send
            </button>
          </form>
          {error && (
            <div className="text-cyan-400 text-sm mt-2 font-medium text-center md:text-left">{error}</div>
          )}
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export const PersonalLanding = () => {
  return (
    <div id="top" className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_transparent_60%),radial-gradient(ellipse_at_bottom,_#0b1120_0%,_transparent_65%)] bg-zinc-950 px-4 pt-16 pb-0 text-zinc-50 font-inter relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(168,85,247,0.22),_transparent_60%)]" />
        <div className="absolute -top-40 -left-40 w-[620px] h-[620px] bg-gradient-to-tr from-cyan-500 via-purple-500 to-indigo-500 opacity-30 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-48 -right-48 w-[640px] h-[640px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 opacity-25 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-10" />
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center gap-12 z-10 pt-20">
        <HeaderBar />
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300/80">
          Portfolio
        </div>
        <HeroSection />
        <AboutBlock className="mt-4" />
        <HighlightsBlock />
        <TechStackBlock />
        <AboutMeSection />
        <SocialsBlock />
        <ConnectSection />
        <FooterGlow />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        .font-inter { font-family: 'Inter', 'Geist', system-ui, sans-serif; }
        .font-geist { font-family: 'Geist', 'Inter', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};
