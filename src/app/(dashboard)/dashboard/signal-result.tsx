import { IoTrendingUp, IoTrendingDown, IoRemove } from "react-icons/io5";
import { SignalResponse, SignalType } from "@/types/trading";
import { IndicatorsTable } from "./basic/indicators-table/indicators-table";

interface SignalResultProps {
  signal: SignalResponse;
}

export function SignalResult({ signal }: SignalResultProps) {
  // Get signal icon and color
  const getSignalDisplay = (signalType: SignalType) => {
    switch (signalType) {
      case "strong_buy":
        return {
          icon: IoTrendingUp,
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/20",
          borderColor: "border-emerald-500/40",
          label: "STRONG BUY",
        };
      case "buy":
        return {
          icon: IoTrendingUp,
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/40",
          label: "BUY",
        };
      case "sell":
        return {
          icon: IoTrendingDown,
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/40",
          label: "SELL",
        };
      case "strong_sell":
        return {
          icon: IoTrendingDown,
          color: "text-rose-400",
          bgColor: "bg-rose-500/20",
          borderColor: "border-rose-500/40",
          label: "STRONG SELL",
        };
      case "hold":
      default:
        return {
          icon: IoRemove,
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/40",
          label: "HOLD",
        };
    }
  };

  // Get market regime display
  const getRegimeDisplay = (regime: string) => {
    switch (regime) {
      case "trending_up":
        return { label: "Trending Up", color: "text-green-400" };
      case "trending_down":
        return { label: "Trending Down", color: "text-red-400" };
      case "ranging":
        return { label: "Ranging", color: "text-yellow-400" };
      case "volatile":
        return { label: "Volatile", color: "text-orange-400" };
      default:
        return { label: regime, color: "text-white/60" };
    }
  };

  return (
    <div className="glass rounded-2xl p-8 backdrop-blur-lg">
      <h2 className="mb-6 text-2xl font-semibold">Signal Analysis</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Signal Type */}
        <div
          className={`rounded-xl border p-6 ${
            getSignalDisplay(signal.signal).bgColor
          } ${getSignalDisplay(signal.signal).borderColor}`}
        >
          <p className="mb-2 text-sm text-white/60">Signal</p>
          <div className="flex items-center gap-3">
            {(() => {
              const SignalIcon = getSignalDisplay(signal.signal).icon;
              return <SignalIcon className={`text-4xl ${getSignalDisplay(signal.signal).color}`} />;
            })()}
            <p className={`text-2xl font-bold ${getSignalDisplay(signal.signal).color}`}>
              {getSignalDisplay(signal.signal).label}
            </p>
          </div>
        </div>

        {/* Confidence */}
        <div className="rounded-xl border border-purple-500/40 bg-purple-500/20 p-6">
          <p className="mb-2 text-sm text-white/60">Confidence</p>
          <p className="text-3xl font-bold text-purple-400">{signal.confidence.toFixed(1)}%</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-purple-500 transition-all"
              style={{ width: `${signal.confidence}%` }}
            />
          </div>
        </div>

        {/* Market Regime */}
        <div className="rounded-xl border border-blue-500/40 bg-blue-500/20 p-6">
          <p className="mb-2 text-sm text-white/60">Market Regime</p>
          <p
            className={`text-2xl font-bold ${getRegimeDisplay(signal.analysis.market_regime).color}`}
          >
            {getRegimeDisplay(signal.analysis.market_regime).label}
          </p>
          <p className="mt-1 text-sm text-white/40">
            {signal.analysis.regime_confidence.toFixed(1)}% confidence
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      {signal.analysis?.breakdown && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold">Category Breakdown</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(signal.analysis.breakdown).map(([category, data]) => (
              <div key={category} className="glass rounded-xl p-4 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{category}</span>
                  <span className="text-xs text-white/40">
                    Weight: {(data.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`text-xl font-bold ${
                      data.score > 0.2
                        ? "text-green-400"
                        : data.score < -0.2
                          ? "text-red-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {data.score > 0 ? "+" : ""}
                    {data.score.toFixed(2)}
                  </span>
                </div>
                {/* Indicator votes */}
                <div className="space-y-1">
                  {data.indicators.map((ind) => (
                    <div key={ind.name} className="flex items-center justify-between text-xs">
                      <span className="text-white/60">{ind.name}</span>
                      <span
                        className={
                          ind.vote.includes("BUY")
                            ? "text-green-400"
                            : ind.vote.includes("SELL")
                              ? "text-red-400"
                              : "text-yellow-400"
                        }
                      >
                        {ind.vote.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6">
        <p className="mb-2 text-sm text-white/60">Details</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <span className="text-sm text-white/60">Symbol:</span>
            <p className="font-semibold">{signal.symbol}</p>
          </div>
          <div>
            <span className="text-sm text-white/60">Timeframe:</span>
            <p className="font-semibold">{signal.timeframe}</p>
          </div>
          <div>
            <span className="text-sm text-white/60">Raw Score:</span>
            <p className="font-semibold">{signal.analysis.score.toFixed(4)}</p>
          </div>
          {signal.timestamp && (
            <div>
              <span className="text-sm text-white/60">Time:</span>
              <p className="font-semibold">{new Date(signal.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Indicators Table */}
      <IndicatorsTable indicators={signal.indicators} />
    </div>
  );
}
