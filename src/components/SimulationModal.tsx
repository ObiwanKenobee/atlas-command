import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingDown, TrendingUp, DollarSign, Users, BarChart3 } from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine,
} from "recharts";

const simulationData = [
  { time: "T0", before: 72, after: 72 },
  { time: "T+1d", before: 75, after: 68 },
  { time: "T+3d", before: 80, after: 58 },
  { time: "T+7d", before: 84, after: 45 },
  { time: "T+14d", before: 82, after: 35 },
  { time: "T+30d", before: 78, after: 28 },
];

const outcomes = [
  { label: "Population Protected", before: "1.2M", after: "2.1M", icon: Users, positive: true },
  { label: "Risk Reduction", before: "12%", after: "38%", icon: TrendingDown, positive: true },
  { label: "Cost Estimate", before: "$0", after: "$4.2M", icon: DollarSign, positive: false },
  { label: "System Load", before: "67%", after: "82%", icon: BarChart3, positive: false },
];

export function SimulationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative glass-panel border-primary/20 w-full max-w-3xl mx-4 p-6 max-h-[85vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground">Simulation: Flood Barrier Deployment</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Nakuru County • 30-day projection</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-secondary transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Chart */}
            <div className="mb-6">
              <p className="section-label mb-3">Risk Index — Before vs After Intervention</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={simulationData}>
                  <defs>
                    <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(192 100% 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(192 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(222 41% 9%)", border: "1px solid hsl(222 20% 20%)", borderRadius: 8, fontSize: 11 }} />
                  <ReferenceLine y={50} stroke="hsl(43 100% 50% / 0.3)" strokeDasharray="3 3" label={{ value: "Threshold", fill: "hsl(43 100% 50%)", fontSize: 9 }} />
                  <Area type="monotone" dataKey="before" stroke="hsl(0 84% 60%)" fill="url(#beforeGrad)" strokeWidth={2} name="Without intervention" />
                  <Area type="monotone" dataKey="after" stroke="hsl(192 100% 50%)" fill="url(#afterGrad)" strokeWidth={2} name="With intervention" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Outcomes grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {outcomes.map((o) => (
                <div key={o.label} className="glass-panel p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <o.icon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{o.label}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xs font-mono text-muted-foreground line-through">{o.before}</span>
                    <span className={`text-sm font-bold font-mono ${o.positive ? "glow-text-emerald" : "glow-text-gold"}`}>{o.after}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Confidence */}
            <div className="glass-panel p-4">
              <p className="section-label mb-2">Confidence Intervals</p>
              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-muted-foreground">Best case: </span>
                  <span className="font-mono glow-text-emerald">Risk ↓ 45%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected: </span>
                  <span className="font-mono glow-text-blue">Risk ↓ 34%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Worst case: </span>
                  <span className="font-mono priority-high">Risk ↓ 18%</span>
                </div>
                <div className="ml-auto">
                  <span className="text-muted-foreground">Model confidence: </span>
                  <span className="font-mono glow-text-blue">87.3%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                style={{ boxShadow: "0 0 20px -5px hsl(192 100% 50% / 0.3)" }}
              >
                Approve & Deploy
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
