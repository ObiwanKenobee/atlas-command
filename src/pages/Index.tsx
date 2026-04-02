import { useState } from "react";
import { TopNavbar } from "@/components/TopNavbar";
import { SidebarFilters } from "@/components/SidebarFilters";
import { GlobalMap } from "@/components/GlobalMap";
import { MetricsBar } from "@/components/MetricsBar";
import { DecisionPanel } from "@/components/DecisionPanel";
import { SystemCardsGrid } from "@/components/SystemCardsGrid";
import { SimulationModal } from "@/components/SimulationModal";

const Index = () => {
  const [simOpen, setSimOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SidebarFilters />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
          <MetricsBar />
          <div className="flex gap-3 min-h-[340px]">
            <GlobalMap />
            <DecisionPanel onSimulate={() => setSimOpen(true)} />
          </div>
          <SystemCardsGrid />
        </main>
      </div>
      <SimulationModal open={simOpen} onClose={() => setSimOpen(false)} />
    </div>
  );
};

export default Index;
