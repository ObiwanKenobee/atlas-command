import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Activity, Brain } from "lucide-react";

function useAnimatedValue(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const initial = value;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(initial + (target - initial) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return value;
}

function useLiveMetric(base: number, variance: number, interval = 3000) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * variance);
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return value;
}

const metricsConfig = [
  { label: "Population at Risk", baseValue: 2.4, variance: 0.3, unit: "M", format: (v: number) => v.toFixed(1) + "M", icon: Users, glowClass: "glow-text-blue" },
  { label: "Resource Efficiency", baseValue: 73.2, variance: 4, unit: "%", format: (v: number) => v.toFixed(1) + "%", icon: BarChart3, glowClass: "glow-text-emerald" },
  { label: "System Stress Index", baseValue: 0.67, variance: 0.08, unit: "", format: (v: number) => v.toFixed(2), icon: Activity, glowClass: "glow-text-gold" },
  { label: "AI Confidence", baseValue: 91.4, variance: 2, unit: "%", format: (v: number) => v.toFixed(1) + "%", icon: Brain, glowClass: "glow-text-blue" },
];

export function MetricsBar() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
      {metricsConfig.map((metric, i) => (
        <MetricCard key={metric.label} metric={metric} index={i} />
      ))}
    </div>
  );
}

function MetricCard({ metric, index }: { metric: typeof metricsConfig[0]; index: number }) {
  const liveValue = useLiveMetric(metric.baseValue, metric.variance, 3000 + index * 500);
  const animatedValue = useAnimatedValue(liveValue);
  const [prevValue, setPrevValue] = useState(liveValue);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (Math.abs(liveValue - prevValue) > metric.variance * 0.3) {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
      setPrevValue(liveValue);
    }
  }, [liveValue]);

  const change = liveValue - metric.baseValue;
  const changeStr = (change >= 0 ? "+" : "") + (metric.unit === "M" ? change.toFixed(1) : metric.unit === "" ? change.toFixed(2) : change.toFixed(1)) + metric.unit;

  return (
    <motion.div
      className={`glass-panel-hover p-3 md:p-4 transition-all ${flash ? "border-primary/40" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-1.5 md:mb-2">
        <span className="section-label text-[9px] md:text-xs">{metric.label}</span>
        <metric.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
      </div>
      <div className={`metric-value text-xl md:text-3xl ${metric.glowClass}`}>
        {metric.format(animatedValue)}
      </div>
      <div className={`text-[9px] md:text-[10px] font-mono mt-1 ${
        change > 0 && metric.label === "System Stress Index" ? "priority-high" :
        change > 0 ? "glow-text-emerald" : "priority-medium"
      }`}>
        {changeStr} from baseline
      </div>
    </motion.div>
  );
}
