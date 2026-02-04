import React from 'react';
import { Home, User, Mail } from "lucide-react";

interface MenuBarProps {
  active?: 'home' | 'about' | 'contact';
  onSelect?: (key: 'home' | 'about' | 'contact') => void;
}

const icons = {
  home: <Home className="h-5 w-5" />,
  about: <User className="h-5 w-5" />,
  contact: <Mail className="h-5 w-5" />,
};

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, active, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // Calculate width based on label length (min 44px for icon, plus label)
  const expandedWidth = Math.max(44 + label.length * 9 + 32, 120); // 9px per char + 32px padding

  // Responsive: hide text and keep button compact on small screens
  const isExpanded = (hovered || active);

  // Show tooltip on mobile tap
  const handleMobileTooltip = (e: React.MouseEvent) => {
    if (window.innerWidth < 640) {
      e.preventDefault();
      setShowTooltip(true);
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
      tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 1200);
    }
    if (onClick) onClick();
  };

  React.useEffect(() => () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      className={`flex items-center rounded-xl border transition-colors focus:outline-none relative overflow-visible
        ${active ? 'border-cyan-400/50 bg-zinc-900 text-white font-semibold' : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60'}
        duration-300
        w-10 sm:w-auto
        px-0 sm:px-3
        justify-center sm:justify-start
        bg-zinc-950/60
      `}
      style={{
        minWidth: 40,
        minHeight: 36,
        width: undefined, // let Tailwind handle width
        transition: 'background 0.2s, border 0.2s',
        paddingLeft: undefined,
        paddingRight: undefined,
        paddingTop: 6,
        paddingBottom: 6,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleMobileTooltip}
    >
      {/* Tooltip for mobile view */}
      <span
        className={`sm:hidden absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow transition-opacity duration-200 pointer-events-none z-20
          ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </span>
      <span className="flex items-center justify-center w-9 h-9">
        {icon}
      </span>
      <span
        className={`text-sm transition-all duration-300 whitespace-nowrap pointer-events-none ml-2
          hidden sm:inline
          ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
        style={{
          transition: 'opacity 0.3s, width 0.35s cubic-bezier(0.4,0,0.2,1), margin 0.3s',
          width: isExpanded ? expandedWidth - 44 - 32 : 0, // icon + padding
        }}
      >
        {label}
      </span>
    </button>
  );
};

export const MenuBar = ({ active = 'home', onSelect }: MenuBarProps) => {
  return (
    <nav className="flex items-center gap-1.5 bg-zinc-950/70 p-1.5 rounded-2xl border border-zinc-800/80 w-fit mx-auto transition-all duration-300 backdrop-blur">
      <IconButton icon={icons.home} label="Home" active={active === 'home'} onClick={() => onSelect?.('home')} />
      <div className="w-px h-5 bg-zinc-800/80 mx-1" />
      <IconButton icon={icons.about} label="About" active={active === 'about'} onClick={() => onSelect?.('about')} />
      <IconButton icon={icons.contact} label="Contact" active={active === 'contact'} onClick={() => onSelect?.('contact')} />
    </nav>
  );
};
