import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Droplets, Activity, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

type RegionData = {
  name: string;
  population: string;
  riskLevel: string;
  riskColor: string;
  metrics: { label: string; value: string; icon: any; trend: string }[];
  chartData: { t: string; v: number }[];
};

const regionDatabase: Record<string, RegionData> = {
  Nakuru: {
    name: "Nakuru County, Kenya",
    population: "2.16M",
    riskLevel: "High",
    riskColor: "priority-high",
    metrics: [
      { label: "Flood Risk", value: "78%", icon: Droplets, trend: "+12%" },
      { label: "Displaced", value: "45K", icon: Users, trend: "+8K" },
      { label: "Infrastructure", value: "62%", icon: Activity, trend: "-4%" },
      { label: "Aid Coverage", value: "71%", icon: TrendingUp, trend: "+3%" },
    ],
    chartData: [
      { t: "6h", v: 42 }, { t: "12h", v: 55 }, { t: "18h", v: 63 },
      { t: "24h", v: 71 }, { t: "30h", v: 78 }, { t: "36h", v: 74 },
    ],
  },
  Nairobi: {
    name: "Nairobi, Kenya",
    population: "4.73M",
    riskLevel: "Critical",
    riskColor: "priority-high",
    metrics: [
      { label: "Disease Cases", value: "1,240", icon: Activity, trend: "+28%" },
      { label: "Hospital Load", value: "94%", icon: Users, trend: "+11%" },
      { label: "Supply Level", value: "31%", icon: Droplets, trend: "-8%" },
      { label: "Response Teams", value: "12", icon: TrendingUp, trend: "+4" },
    ],
    chartData: [
      { t: "Mon", v: 32 }, { t: "Tue", v: 45 }, { t: "Wed", v: 58 },
      { t: "Thu", v: 72 }, { t: "Fri", v: 85 }, { t: "Sat", v: 91 },
    ],
  },
  Mombasa: {
    name: "Mombasa, Kenya",
    population: "1.21M",
    riskLevel: "Medium",
    riskColor: "priority-medium",
    metrics: [
      { label: "Economic Stress", value: "0.58", icon: TrendingUp, trend: "+0.09" },
      { label: "Unemployment", value: "34%", icon: Users, trend: "+2%" },
      { label: "Port Activity", value: "67%", icon: Activity, trend: "-12%" },
      { label: "Food Security", value: "72%", icon: Droplets, trend: "-3%" },
    ],
    chartData: [
      { t: "W1", v: 38 }, { t: "W2", v: 44 }, { t: "W3", v: 51 },
      { t: "W4", v: 48 }, { t: "W5", v: 55 }, { t: "W6", v: 58 },
    ],
  },
  Lagos: {
    name: "Lagos, Nigeria",
    population: "15.9M",
    riskLevel: "High",
    riskColor: "priority-high",
    metrics: [
      { label: "Power Outages", value: "47/day", icon: Activity, trend: "+12" },
      { label: "Grid Load", value: "89%", icon: TrendingUp, trend: "+7%" },
      { label: "Affected Pop.", value: "3.2M", icon: Users, trend: "+400K" },
      { label: "Repair Progress", value: "38%", icon: Droplets, trend: "+5%" },
    ],
    chartData: [
      { t: "6am", v: 65 }, { t: "9am", v: 78 }, { t: "12pm", v: 89 },
      { t: "3pm", v: 92 }, { t: "6pm", v: 85 }, { t: "9pm", v: 72 },
    ],
  },
  "Horn of Africa": {
    name: "Horn of Africa Region",
    population: "130M+",
    riskLevel: "Critical",
    riskColor: "priority-high",
    metrics: [
      { label: "Drought Severity", value: "Extreme", icon: Droplets, trend: "Worsening" },
      { label: "Food Insecure", value: "23M", icon: Users, trend: "+3M" },
      { label: "Water Access", value: "28%", icon: Droplets, trend: "-5%" },
      { label: "Aid Pledged", value: "$1.8B", icon: TrendingUp, trend: "+$200M" },
    ],
    chartData: [
      { t: "Jan", v: 45 }, { t: "Feb", v: 52 }, { t: "Mar", v: 68 },
      { t: "Apr", v: 75 }, { t: "May", v: 82 }, { t: "Jun", v: 88 },
    ],
  },
  DRC: {
    name: "Democratic Republic of Congo",
    population: "102M",
    riskLevel: "Low",
    riskColor: "priority-low",
    metrics: [
      { label: "Vaccination Rate", value: "62%", icon: Activity, trend: "+8%" },
      { label: "Coverage Target", value: "85%", icon: TrendingUp, trend: "On track" },
      { label: "Teams Deployed", value: "340", icon: Users, trend: "+45" },
      { label: "Supply Chain", value: "78%", icon: Droplets, trend: "+3%" },
    ],
    chartData: [
      { t: "W1", v: 28 }, { t: "W2", v: 35 }, { t: "W3", v: 42 },
      { t: "W4", v: 51 }, { t: "W5", v: 58 }, { t: "W6", v: 62 },
    ],
  },
};

export function RegionDetail({ region, onClose }: { region: string | null; onClose: () => void }) {
  const data = region ? regionDatabase[region] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative glass-panel border-primary/20 w-full max-w-lg mx-4 p-5 md:p-6"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-bold text-foreground">{data.name}</h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Population: <span className="text-foreground font-mono">{data.population}</span></span>
                  <span>Risk: <span className={`font-semibold ${data.riskColor}`}>{data.riskLevel}</span></span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-md hover:bg-secondary transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {data.metrics.map((m) => (
                <div key={m.label} className="glass-panel p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <m.icon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{m.label}</span>
                  </div>
                  <p className="text-sm font-bold font-mono glow-text-blue">{m.value}</p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{m.trend}</p>
                </div>
              ))}
            </div>

            {/* Trend chart */}
            <div className="glass-panel p-3">
              <p className="section-label mb-2">Risk Trend</p>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id="regionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(192 100% 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(192 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(222 41% 9%)", border: "1px solid hsl(222 20% 20%)", borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="v" stroke="hsl(192 100% 50%)" fill="url(#regionGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
