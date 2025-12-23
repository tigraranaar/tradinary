interface IndicatorsTableProps {
  indicators: Record<string, number | null>;
}

export function IndicatorsTable({ indicators }: IndicatorsTableProps) {
  if (!indicators || Object.keys(indicators).length === 0) {
    return null;
  }

  return (
    <div className="glass mt-6 rounded-xl p-6 backdrop-blur-lg">
      <h3 className="mb-4 text-lg font-semibold">
        Technical Indicators ({Object.keys(indicators).length})
      </h3>
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-[#190029]">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Indicator</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(indicators)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-4 py-2 text-sm font-medium">{key}</td>
                  <td className="px-4 py-2 text-right font-mono text-sm">
                    {value === null ? <span className="text-white/30">N/A</span> : value.toFixed(4)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
