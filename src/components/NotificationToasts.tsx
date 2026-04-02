import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";

type Notification = {
  id: number;
  type: "warning" | "critical" | "info" | "success";
  title: string;
  message: string;
};

const notificationPool: Omit<Notification, "id">[] = [
  { type: "critical", title: "Flood Alert", message: "Water levels rising in Nakuru — threshold exceeded" },
  { type: "warning", title: "Resource Shortage", message: "Medical supplies below 30% in Nairobi sector" },
  { type: "info", title: "Model Updated", message: "AI confidence recalibrated — new data integrated" },
  { type: "success", title: "Deployment Active", message: "Mobile health units deployed to Zone B" },
  { type: "warning", title: "Grid Instability", message: "Lagos power grid showing 12% efficiency drop" },
  { type: "critical", title: "Disease Spike", message: "Cholera cases up 28% in border regions" },
  { type: "info", title: "Satellite Update", message: "New imagery available for Horn of Africa region" },
  { type: "success", title: "Aid Delivered", message: "Food supplies reached 94% of target population" },
];

const iconMap = {
  critical: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  critical: "border-glow-red/40 bg-glow-red/5",
  warning: "border-glow-gold/40 bg-glow-gold/5",
  info: "border-primary/40 bg-primary/5",
  success: "border-glow-emerald/40 bg-glow-emerald/5",
};

const iconColorMap = {
  critical: "text-glow-red",
  warning: "text-glow-gold",
  info: "text-primary",
  success: "text-glow-emerald",
};

export function NotificationToasts() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = notificationPool[Math.floor(Math.random() * notificationPool.length)];
      const newNotif: Notification = { ...template, id: counter };
      setCounter((c) => c + 1);
      setNotifications((prev) => [...prev.slice(-2), newNotif]);

      // Auto-dismiss after 5s
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, [counter]);

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72 md:w-80">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`glass-panel border ${colorMap[n.type]} p-3 rounded-lg cursor-pointer`}
              onClick={() => dismiss(n.id)}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColorMap[n.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-foreground">{n.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                </div>
                <X className="w-3 h-3 text-muted-foreground shrink-0" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
