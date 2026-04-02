import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type Signal = {
  id: number; x: number; y: number; type: string; label: string; color: string; intensity: string;
  region: string;
};

const signals: Signal[] = [
  { id: 1, x: 52, y: 38, type: "flood", label: "Flooding Risk — Nakuru", color: "glow-dot-blue", intensity: "high", region: "Nakuru" },
  { id: 2, x: 48, y: 42, type: "disease", label: "Disease Outbreak — Nairobi", color: "glow-dot-red", intensity: "critical", region: "Nairobi" },
  { id: 3, x: 55, y: 35, type: "economic", label: "Economic Stress — Mombasa", color: "glow-dot-gold", intensity: "medium", region: "Mombasa" },
  { id: 4, x: 42, y: 30, type: "infrastructure", label: "Power Grid — Lagos", color: "glow-dot-gold", intensity: "high", region: "Lagos" },
  { id: 5, x: 60, y: 28, type: "climate", label: "Drought Alert — Horn of Africa", color: "glow-dot-red", intensity: "critical", region: "Horn of Africa" },
  { id: 6, x: 35, y: 48, type: "health", label: "Vaccination Campaign — DRC", color: "glow-dot-emerald", intensity: "low", region: "DRC" },
];

export function GlobalMap({ onRegionClick }: { onRegionClick?: (region: string) => void }) {
  const [hoveredSignal, setHoveredSignal] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomCenter, setZoomCenter] = useState({ x: 50, y: 40 });

  const handleSignalClick = useCallback((signal: Signal) => {
    if (zoomLevel === 1) {
      setZoomLevel(2.5);
      setZoomCenter({ x: signal.x, y: signal.y });
    } else {
      onRegionClick?.(signal.region);
    }
  }, [zoomLevel, onRegionClick]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    setZoomCenter({ x: 50, y: 40 });
  }, []);

  return (
    <div className="glass-panel p-3 md:p-4 flex-1 min-h-[240px] md:min-h-[300px] relative overflow-hidden">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <h3 className="section-label text-[9px] md:text-xs">Global Situational Map</h3>
        <div className="flex items-center gap-2">
          {zoomLevel > 1 && (
            <button
              onClick={handleResetZoom}
              className="text-[9px] md:text-[10px] font-mono text-primary hover:text-foreground transition-colors px-2 py-0.5 rounded border border-primary/30"
            >
              Reset View
            </button>
          )}
          <span className="text-[9px] md:text-[10px] font-mono text-muted-foreground">
            {signals.length} active signals
          </span>
        </div>
      </div>

      <motion.div
        className="relative w-full h-[calc(100%-2rem)] rounded-lg overflow-hidden bg-background/50 cursor-crosshair"
        animate={{
          scale: zoomLevel,
          x: zoomLevel > 1 ? (50 - zoomCenter.x) * 3 : 0,
          y: zoomLevel > 1 ? (40 - zoomCenter.y) * 3 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* Map background */}
        <svg viewBox="0 0 100 80" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="hsl(192 100% 50%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#mapGlow)" width="100" height="80" />
          <path
            d="M45,8 L52,6 L58,8 L62,12 L64,18 L62,22 L65,28 L63,35 L60,40 L58,48 L55,55 L52,60 L48,65 L44,68 L40,65 L36,60 L34,55 L32,48 L30,42 L32,35 L34,28 L36,22 L38,15 L42,10 Z"
            fill="hsl(192 100% 50% / 0.08)"
            stroke="hsl(192 100% 50% / 0.25)"
            strokeWidth="0.3"
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 8} x2="100" y2={i * 8} stroke="hsl(192 100% 50% / 0.05)" strokeWidth="0.2" />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 8} y1="0" x2={i * 8} y2="80" stroke="hsl(192 100% 50% / 0.05)" strokeWidth="0.2" />
          ))}
        </svg>

        {/* Heat zones */}
        <div className="absolute inset-0">
          <div className="absolute w-32 h-32 rounded-full bg-glow-red/5 blur-3xl" style={{ left: "45%", top: "30%" }} />
          <div className="absolute w-24 h-24 rounded-full bg-glow-blue/8 blur-2xl" style={{ left: "50%", top: "35%" }} />
          <div className="absolute w-20 h-20 rounded-full bg-glow-gold/5 blur-2xl" style={{ left: "35%", top: "40%" }} />
        </div>

        {/* Signal nodes */}
        {signals.map((signal) => (
          <motion.div
            key={signal.id}
            className="absolute cursor-pointer group"
            style={{ left: `${signal.x}%`, top: `${signal.y}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setHoveredSignal(signal.id)}
            onMouseLeave={() => setHoveredSignal(null)}
            onClick={() => handleSignalClick(signal)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: signal.id * 0.1 }}
            whileHover={{ scale: 1.5 }}
          >
            <div className={`absolute inset-0 ${signal.color} !w-6 !h-6 -m-2 rounded-full opacity-30 animate-ping`} />
            <div className={signal.color} />

            {hoveredSignal === signal.id && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-3 py-2 whitespace-nowrap z-10"
              >
                <p className="text-[10px] font-medium text-foreground">{signal.label}</p>
                <p className={`text-[9px] capitalize ${
                  signal.intensity === "critical" || signal.intensity === "high" ? "priority-high" :
                  signal.intensity === "medium" ? "priority-medium" : "priority-low"
                }`}>
                  {signal.intensity} intensity
                </p>
                <p className="text-[8px] text-muted-foreground mt-0.5">Click to {zoomLevel > 1 ? "view details" : "zoom in"}</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Radar sweep */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full border border-primary/5">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, hsl(192 100% 50% / 0.08) 30deg, transparent 60deg)",
                animation: "radar-sweep 4s linear infinite",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
