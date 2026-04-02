import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Truck, Droplets, MessageSquare, Eye } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis,
} from "recharts";

function useLiveChartData(baseData: { day: string; risk: number }[], variance = 8, interval = 4000) {
  const [data, setData] = useState(baseData);
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          risk: Math.max(10, Math.min(100, d.risk + (Math.random() - 0.45) * variance)),
        }))
      );
    }, interval);
    return () => clearInterval(id);
  }, []);
  return data;
}

const baseRiskData = [
  { day: "Mon", risk: 42 }, { day: "Tue", risk: 55 }, { day: "Wed", risk: 48 },
  { day: "Thu", risk: 67 }, { day: "Fri", risk: 72 }, { day: "Sat", risk: 61 }, { day: "Sun", risk: 78 },
];

const resourceData = [
  { cat: "Aid", flow: 84 }, { cat: "Med", flow: 67 }, { cat: "Food", flow: 92 },
  { cat: "Water", flow: 56 }, { cat: "Energy", flow: 73 },
];

const infraItems = [
  { label: "Water Systems", value: 78, color: "bg-glow-blue" },
  { label: "Power Grid", value: 62, color: "bg-glow-gold" },
  { label: "Road Network", value: 85, color: "bg-glow-emerald" },
  { label: "Telecom", value: 91, color: "bg-primary" },
];

const sentimentAlerts = [
  { text: "Rising concern about water access in Nakuru", type: "warning" },
  { text: "Positive response to mobile health deployment", type: "positive" },
  { text: "Community tension detected in border regions", type: "critical" },
];

export function SystemCardsGrid() {
  const riskData = useLiveChartData(baseRiskData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
      {/* Risk Forecast */}
      <motion.div className="glass-panel-hover p-3 md:p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-glow-red" />
          <span className="section-label">Risk Forecast</span>
          <span className="ml-auto text-[8px] font-mono text-primary animate-pulse">● LIVE</span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={riskData}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(222 41% 9%)", border: "1px solid hsl(222 20% 20%)", borderRadius: 8, fontSize: 11 }} />
            <Area type="monotone" dataKey="risk" stroke="hsl(0 84% 60%)" fill="url(#riskGrad)" strokeWidth={2} animationDuration={800} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-[9px] md:text-[10px] text-muted-foreground mt-2">7-day probability trend • <span className="priority-high">streaming</span></p>
      </motion.div>

      {/* Resource Flow */}
      <motion.div className="glass-panel-hover p-3 md:p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-3.5 h-3.5 text-glow-emerald" />
          <span className="section-label">Resource Flow</span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={resourceData}>
            <XAxis dataKey="cat" tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(222 41% 9%)", border: "1px solid hsl(222 20% 20%)", borderRadius: 8, fontSize: 11 }} />
            <Bar dataKey="flow" fill="hsl(153 100% 45%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[9px] md:text-[10px] text-muted-foreground mt-2">Allocation efficiency across sectors</p>
      </motion.div>

      {/* Infrastructure Health */}
      <motion.div className="glass-panel-hover p-3 md:p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-3.5 h-3.5 text-glow-blue" />
          <span className="section-label">Infrastructure Health</span>
        </div>
        <div className="space-y-2.5">
          {infraItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono text-foreground">{item.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Community Sentiment */}
      <motion.div className="glass-panel-hover p-3 md:p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-glow-gold" />
          <span className="section-label">Community Sentiment</span>
        </div>
        <div className="space-y-2">
          {sentimentAlerts.map((alert, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px]">
              <span className={`mt-0.5 shrink-0 ${
                alert.type === "critical" ? "glow-dot-red" :
                alert.type === "warning" ? "glow-dot-gold" : "glow-dot-emerald"
              }`} />
              <span className="text-muted-foreground leading-relaxed">{alert.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ethical AI Panel */}
      <motion.div className="glass-panel-hover p-3 md:p-4 md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-3.5 h-3.5 text-glow-purple" />
          <span className="section-label">Ethical AI Governance</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Bias Detection</p>
            <div className="flex items-center gap-2">
              <span className="glow-dot-emerald" />
              <span className="text-xs font-mono text-foreground">Low Risk — 0.03</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">Gender, ethnic, regional parity within bounds</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Decision Transparency</p>
            <div className="flex items-center gap-2">
              <span className="glow-dot-blue" />
              <span className="text-xs font-mono text-foreground">94.2% Explainable</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">All recommendations have traceable reasoning chains</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Tradeoff Analysis</p>
            <div className="flex items-center gap-2">
              <span className="glow-dot-gold" />
              <span className="text-xs font-mono text-foreground">3 Active Tradeoffs</span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">Speed vs thoroughness, cost vs coverage, local vs regional</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
