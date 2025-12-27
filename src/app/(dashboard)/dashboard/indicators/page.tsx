"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { indicatorsColumns, type IndicatorRow } from "../components/indicators-columns";
import { DataTable } from "../components/data-table";

export default function IndicatorsPage() {
  const { selectedPair, selectedTimeframe, getCurrentSignal } = useDashboardStore();
  const currentSignal = getCurrentSignal();

  // Transform indicators object into array format for the table
  const tableData: IndicatorRow[] = currentSignal?.indicators
    ? Object.entries(currentSignal.indicators)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([indicator, value]) => ({
          indicator,
          value,
        }))
    : [];

  if (!currentSignal || !selectedPair || !selectedTimeframe) {
    return (
      <div className="glass rounded-xl border border-red-500/40 bg-red-500/10 p-6 backdrop-blur-lg">
        <h2 className="mb-2 text-xl font-semibold text-red-200">No Data Available</h2>
        <p className="text-red-200">Please select a trading pair and timeframe in the sidebar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
          Technical Indicators
        </h1>
        <p className="text-white/60">
          {selectedPair} • {selectedTimeframe} • {Object.keys(currentSignal.indicators).length}{" "}
          indicators
        </p>
      </div>

      <div className="glass rounded-xl p-6 backdrop-blur-lg">
        <h3 className="mb-4 text-lg font-semibold">
          Technical Indicators ({Object.keys(currentSignal.indicators).length})
        </h3>
        <div className="max-h-[500px] overflow-auto">
          <div className="container mx-auto py-10">
            <DataTable columns={indicatorsColumns} data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}
