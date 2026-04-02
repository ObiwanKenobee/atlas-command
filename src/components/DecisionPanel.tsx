import { motion } from "framer-motion";
import { Zap, ArrowRight, Shield } from "lucide-react";

type Decision = {
  id: string;
  title: string;
  impactScore: number;
  riskReduction: number;
  priority: "high" | "medium" | "low";
};

const decisions: Decision[] = [
  { id: "1", title: "Deploy flood barriers in Nakuru County", impactScore: 92, riskReduction: 34, priority: "high" },
  { id: "2", title: "Activate mobile health units — Nairobi", impactScore: 87, riskReduction: 28, priority: "high" },
  { id: "3", title: "Redirect aid logistics to Horn region", impactScore: 76, riskReduction: 22, priority: "medium" },
  { id: "4", title: "Upgrade power grid redundancy — Lagos", impactScore: 68, riskReduction: 15, priority: "medium" },
  { id: "5", title: "Community vaccination drive — DRC", impactScore: 61, riskReduction: 18, priority: "low" },
];

export function DecisionPanel({ onSimulate }: { onSimulate: () => void }) {
  return (
    <div className="glass-panel p-3 md:p-4 xl:w-80 shrink-0 flex flex-col max-h-[400px] xl:max-h-none">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <Shield className="w-4 h-4 text-primary" />
        <h3 className="section-label">Recommended Actions</h3>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
        {decisions.map((d, i) => (
          <motion.div
            key={d.id}
            className="glass-panel-hover p-2.5 md:p-3 cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-2 mb-1.5 md:mb-2">
              <span className={`text-[8px] md:text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                d.priority === "high" ? "bg-glow-red/15 priority-high" :
                d.priority === "medium" ? "bg-glow-gold/15 priority-medium" :
                "bg-glow-emerald/15 priority-low"
              }`}>
                {d.priority}
              </span>
            </div>
            <p className="text-[10px] md:text-xs font-medium text-foreground mb-1.5 md:mb-2 leading-relaxed">{d.title}</p>
            <div className="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-mono text-muted-foreground">
              <span>Impact: <span className="glow-text-blue">{d.impactScore}</span></span>
              <span>Risk ↓ <span className="glow-text-emerald">{d.riskReduction}%</span></span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onSimulate}
        className="mt-3 md:mt-4 w-full flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[10px] md:text-xs font-semibold hover:bg-primary/20 transition-colors"
        style={{ boxShadow: "0 0 20px -5px hsl(192 100% 50% / 0.3)" }}
      >
        <Zap className="w-3.5 h-3.5" />
        Simulate Outcome
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
