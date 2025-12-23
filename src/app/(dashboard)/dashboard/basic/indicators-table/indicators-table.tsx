import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { IndicatorRow } from "./columns";

interface IndicatorsTableProps {
  indicators: Record<string, number | null>;
}

export function IndicatorsTable({ indicators }: IndicatorsTableProps) {
  if (!indicators || Object.keys(indicators).length === 0) {
    return null;
  }

  // Transform object into array format for the table
  const tableData: IndicatorRow[] = Object.entries(indicators)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([indicator, value]) => ({
      indicator,
      value,
    }));

  return (
    <div className="glass mt-6 rounded-xl p-6 backdrop-blur-lg">
      <h3 className="mb-4 text-lg font-semibold">
        Technical Indicators ({Object.keys(indicators).length})
      </h3>
      <div className="max-h-[500px] overflow-auto">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={tableData} />
        </div>
      </div>
    </div>
  );
}
