import { motion } from "framer-motion";
import { Users, BarChart3, Activity, Brain } from "lucide-react";

const metrics = [
  {
    label: "Population at Risk",
    value: "2.4M",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    glowClass: "glow-text-blue",
  },
  {
    label: "Resource Efficiency",
    value: "73.2%",
    change: "+3.1%",
    trend: "up" as const,
    icon: BarChart3,
    glowClass: "glow-text-emerald",
  },
  {
    label: "System Stress Index",
    value: "0.67",
    change: "+0.04",
    trend: "up" as const,
    icon: Activity,
    glowClass: "glow-text-gold",
  },
  {
    label: "AI Confidence",
    value: "91.4%",
    change: "-0.8%",
    trend: "down" as const,
    icon: Brain,
    glowClass: "glow-text-blue",
  },
];

export function MetricsBar() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="glass-panel-hover p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="section-label">{metric.label}</span>
            <metric.icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className={`metric-value ${metric.glowClass}`}>{metric.value}</div>
          <div className={`text-[10px] font-mono mt-1 ${
            metric.trend === "up" && metric.label === "System Stress Index"
              ? "priority-high"
              : metric.trend === "up"
              ? "glow-text-emerald"
              : "priority-medium"
          }`}>
            {metric.change} from last period
          </div>
        </motion.div>
      ))}
    </div>
  );
}
