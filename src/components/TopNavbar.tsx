import { useState } from "react";
import { Bell, User, Shield } from "lucide-react";
import { motion } from "framer-motion";

const tabs = ["Overview", "Risks", "Systems", "Economy", "Health", "Climate", "Governance"];

export function TopNavbar() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <nav className="h-14 glass-panel rounded-none border-x-0 border-t-0 flex items-center px-6 gap-6 z-50 relative">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-4 shrink-0">
        <Shield className="w-6 h-6 text-primary" />
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-wide text-foreground">ATLAS SANCTUM</span>
          <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">Decision Intelligence</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-0 left-1 right-1 h-[2px] rounded-full bg-primary"
                style={{ boxShadow: "0 0 8px hsl(192 100% 50% / 0.5)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-glow-emerald">
          <span className="glow-dot-emerald" />
          LIVE
        </div>
        <button className="relative p-2 rounded-md hover:bg-secondary transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-glow-red" />
        </button>
        <button className="p-2 rounded-md hover:bg-secondary transition-colors">
          <User className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
}
