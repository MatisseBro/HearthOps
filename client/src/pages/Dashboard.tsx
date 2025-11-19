import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import FurnaceBulletin from "@/components/FurnaceBulletin";
import AllocationsTable, { type Allocation } from "@/components/AllocationsTable";
import DashboardFooter from "@/components/DashboardFooter";

// TODO: remove mock functionality
const mockFurnaceData = {
  drumTemp: 875,
  pressure: 142,
  coalStock: 230,
  mode: "Auto",
  timestamp: new Date().toISOString()
};

// TODO: remove mock functionality
const mockAllocations: Allocation[] = [
  {
    id: "1",
    sector: "North Zone A",
    tonnage: 125,
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    sector: "South Zone B",
    tonnage: 98,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "3",
    sector: "East Zone C",
    tonnage: 156,
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: "4",
    sector: "West Zone D",
    tonnage: 87,
    timestamp: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: "5",
    sector: "Central Zone E",
    tonnage: 142,
    timestamp: new Date(Date.now() - 14400000).toISOString()
  }
];

export default function Dashboard() {
  const [furnaceData, setFurnaceData] = useState(mockFurnaceData);
  const [allocations, setAllocations] = useState(mockAllocations);

  // TODO: remove mock functionality - simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFurnaceData(prev => ({
        ...prev,
        drumTemp: Math.floor(850 + Math.random() * 50),
        pressure: Math.floor(135 + Math.random() * 15),
        coalStock: Math.floor(200 + Math.random() * 50),
        timestamp: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader 
        title="HearthOps – Furnace Monitoring" 
        subtitle="Live telemetry, fuel balance, and sector allocations" 
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="space-y-8">
            <FurnaceBulletin data={furnaceData} />
            <AllocationsTable allocations={allocations} />
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
