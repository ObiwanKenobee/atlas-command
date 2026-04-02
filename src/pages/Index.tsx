import { useState } from "react";
import { TopNavbar } from "@/components/TopNavbar";
import { SidebarFilters } from "@/components/SidebarFilters";
import { GlobalMap } from "@/components/GlobalMap";
import { MetricsBar } from "@/components/MetricsBar";
import { DecisionPanel } from "@/components/DecisionPanel";
import { SystemCardsGrid } from "@/components/SystemCardsGrid";
import { SimulationModal } from "@/components/SimulationModal";
import { NotificationToasts } from "@/components/NotificationToasts";
import { RegionDetail } from "@/components/RegionDetail";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [simOpen, setSimOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className={`
          fixed lg:relative z-40 lg:z-auto h-[calc(100vh-3.5rem)] lg:h-auto
          transition-transform duration-300 lg:transition-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <SidebarFilters />
        </div>

        <main className="flex-1 overflow-y-auto scrollbar-thin p-3 md:p-4 space-y-3">
          <MetricsBar />
          <div className="flex flex-col xl:flex-row gap-3 min-h-[280px] xl:min-h-[340px]">
            <GlobalMap onRegionClick={setSelectedRegion} />
            <DecisionPanel onSimulate={() => setSimOpen(true)} />
          </div>
          <SystemCardsGrid />
        </main>
      </div>

      <SimulationModal open={simOpen} onClose={() => setSimOpen(false)} />
      <NotificationToasts />
      <RegionDetail region={selectedRegion} onClose={() => setSelectedRegion(null)} />
    </div>
  );
};

export default Index;
