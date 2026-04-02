import { useState } from "react";
import { ChevronDown, Globe, Clock, Layers, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const regions = [
  { label: "Global", sub: [] },
  { label: "Africa", sub: ["Kenya", "Nigeria", "Ethiopia"] },
  { label: "Kenya", sub: ["Nairobi", "Nakuru", "Mombasa"] },
  { label: "Nakuru", sub: ["Kibera", "Lanet", "Bahati"] },
];

const timeHorizons = ["Now", "7 Days", "30 Days", "1 Year"];

const dataLayers = [
  { id: "climate", label: "Climate", color: "glow-dot-blue" },
  { id: "health", label: "Health", color: "glow-dot-emerald" },
  { id: "infrastructure", label: "Infrastructure", color: "glow-dot-gold" },
  { id: "economy", label: "Economy", color: "glow-dot-red" },
];

export function SidebarFilters() {
  const [selectedRegion, setSelectedRegion] = useState("Africa");
  const [selectedTime, setSelectedTime] = useState("Now");
  const [scenario, setScenario] = useState<"current" | "simulated">("current");
  const [layers, setLayers] = useState<Record<string, boolean>>({
    climate: true, health: true, infrastructure: true, economy: false,
  });

  const toggleLayer = (id: string) => setLayers(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="w-56 shrink-0 bg-sidebar border-r border-border flex flex-col overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-5">
        {/* Region */}
        <FilterSection icon={Globe} label="Region">
          <div className="space-y-1">
            {regions.map((r) => (
              <button
                key={r.label}
                onClick={() => setSelectedRegion(r.label)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                  selectedRegion === r.label
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Time Horizon */}
        <FilterSection icon={Clock} label="Time Horizon">
          <div className="grid grid-cols-2 gap-1">
            {timeHorizons.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`text-[10px] font-medium px-2 py-1.5 rounded-md transition-colors ${
                  selectedTime === t
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground bg-secondary/50 hover:bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Scenario */}
        <FilterSection icon={Zap} label="Scenario">
          <div className="flex rounded-md overflow-hidden border border-border">
            {(["current", "simulated"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`flex-1 text-[10px] font-medium py-1.5 transition-colors capitalize ${
                  scenario === s
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {s === "current" ? "Current" : "Simulated"}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Data Layers */}
        <FilterSection icon={Layers} label="Data Layers">
          <div className="space-y-2">
            {dataLayers.map((layer) => (
              <label key={layer.id} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  className={`w-8 h-4 rounded-full relative transition-colors ${
                    layers[layer.id] ? "bg-primary/30" : "bg-secondary"
                  }`}
                  onClick={() => toggleLayer(layer.id)}
                >
                  <motion.div
                    className={`absolute top-0.5 w-3 h-3 rounded-full ${
                      layers[layer.id] ? "bg-primary" : "bg-muted-foreground/50"
                    }`}
                    animate={{ left: layers[layer.id] ? 16 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
                <span className={layer.color + " !w-1.5 !h-1.5"} />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {layer.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

function FilterSection({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full mb-2 group"
      >
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="section-label flex-1 text-left">{label}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
