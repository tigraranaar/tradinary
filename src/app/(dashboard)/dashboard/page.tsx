"use client";

import { useState, useEffect, useMemo } from "react";
import { IoTrendingUp, IoTrendingDown, IoRemove, IoAlertCircle } from "react-icons/io5";
import { useAuth } from "@/contexts/auth-context";
import { TradingPair, SignalResponse, SignalType } from "@/types/trading";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";

export default function DashboardPage() {
  const { session } = useAuth();

  // Dropdowns state
  const [pairs, setPairs] = useState<TradingPair[]>([]);
  const [timeframes, setTimeframes] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("");

  // Loading and error states
  const [loadingPairs, setLoadingPairs] = useState(true);
  const [loadingSignal, setLoadingSignal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Signal result
  const [signal, setSignal] = useState<SignalResponse | null>(null);

  // Fetch pairs on mount
  useEffect(() => {
    const fetchPairs = async () => {
      if (!session?.access_token) {
        setError("Please log in to access trading data");
        setLoadingPairs(false);
        return;
      }

      try {
        setLoadingPairs(true);
        setError(null);

        const response = await fetch("/api/pairs", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch pairs");
        }

        const data = await response.json();
        setPairs(data.pairs || []);
        setTimeframes(data.timeframes || []);

        // Set first pair as default
        if (data.pairs && data.pairs.length > 0) {
          setSelectedPair(data.pairs[0].symbol);
        }

        // Set first timeframe as default
        if (data.timeframes && data.timeframes.length > 0) {
          setSelectedTimeframe(data.timeframes[0]);
        }
      } catch (err) {
        console.error("Error fetching pairs:", err);
        setError(err instanceof Error ? err.message : "Failed to load trading pairs");
      } finally {
        setLoadingPairs(false);
      }
    };

    fetchPairs();
  }, [session?.access_token]);

  // Handle signal analysis
  const handleAnalyze = async () => {
    if (!selectedPair || !session?.access_token) {
      setError("Please select a trading pair and log in");
      return;
    }

    try {
      setLoadingSignal(true);
      setError(null);
      setSignal(null);

      const response = await fetch("/api/signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          symbol: selectedPair,
          timeframe: selectedTimeframe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          throw new Error(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
        }

        throw new Error(errorData.message || "Failed to fetch signal");
      }

      const data = await response.json();
      setSignal(data);
    } catch (err) {
      console.error("Error fetching signal:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze signal");
    } finally {
      setLoadingSignal(false);
    }
  };

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

  // Convert pairs to combobox options
  const pairOptions: ComboboxOption[] = useMemo(
    () =>
      pairs.map((pair) => ({
        value: pair.symbol,
        label: pair.name ? `${pair.symbol} - ${pair.name}` : pair.symbol,
      })),
    [pairs]
  );

  // Convert timeframes to combobox options
  const timeframeOptions: ComboboxOption[] = useMemo(
    () =>
      timeframes.map((timeframe) => ({
        value: timeframe,
        label: timeframe,
      })),
    [timeframes]
  );

  // Handle pair selection
  const handlePairChange = (value: string) => {
    setSelectedPair(value);
    setSignal(null); // Reset signal when changing pair
  };

  // Handle timeframe selection
  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    setSignal(null); // Reset signal when changing timeframe
  };

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
            Trading Signals Dashboard
          </h1>
          <p className="text-white/60">{"Select your trading pair and timeframe to analyze"}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <IoAlertCircle className="flex-shrink-0 text-xl text-red-400" />
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="glass mb-8 rounded-2xl p-8 backdrop-blur-lg">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Trading Pair Combobox */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Trading Pair</label>
              {loadingPairs ? (
                <div className="glass flex w-full items-center justify-center rounded-xl px-4 py-3 backdrop-blur-lg">
                  <span className="font-medium">Loading pairs...</span>
                </div>
              ) : (
                <Combobox
                  options={pairOptions}
                  value={selectedPair}
                  onValueChange={handlePairChange}
                  placeholder="Select a pair"
                  searchPlaceholder="Search pairs..."
                  emptyMessage="No pair found."
                  disabled={loadingPairs || pairs.length === 0}
                />
              )}
            </div>

            {/* Timeframe Combobox */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Timeframe</label>
              {loadingPairs ? (
                <div className="glass flex w-full items-center justify-center rounded-xl px-4 py-3 backdrop-blur-lg">
                  <span className="font-medium">Loading timeframes...</span>
                </div>
              ) : (
                <Combobox
                  options={timeframeOptions}
                  value={selectedTimeframe}
                  onValueChange={handleTimeframeChange}
                  placeholder="Select a timeframe"
                  searchPlaceholder="Search timeframes..."
                  emptyMessage="No timeframe found."
                  disabled={loadingPairs || pairs.length === 0}
                />
              )}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedPair || loadingSignal || loadingPairs}
            className="btn w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingSignal ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Signal"
            )}
          </button>
        </div>

        {/* Signal Result */}
        {signal && (
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
                    return (
                      <SignalIcon className={`text-4xl ${getSignalDisplay(signal.signal).color}`} />
                    );
                  })()}
                  <p className={`text-2xl font-bold ${getSignalDisplay(signal.signal).color}`}>
                    {getSignalDisplay(signal.signal).label}
                  </p>
                </div>
              </div>

              {/* Confidence */}
              <div className="rounded-xl border border-purple-500/40 bg-purple-500/20 p-6">
                <p className="mb-2 text-sm text-white/60">Confidence</p>
                <p className="text-3xl font-bold text-purple-400">
                  {signal.confidence.toFixed(1)}%
                </p>
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
            {signal.indicators && Object.keys(signal.indicators).length > 0 && (
              <div className="glass mt-6 rounded-xl p-6 backdrop-blur-lg">
                <h3 className="mb-4 text-lg font-semibold">
                  Technical Indicators ({Object.keys(signal.indicators).length})
                </h3>
                <div className="max-h-[500px] overflow-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-[#190029]">
                      <tr className="border-b border-white/10">
                        <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                          Indicator
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-white/60">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(signal.indicators)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([key, value]) => (
                          <tr
                            key={key}
                            className="border-b border-white/5 transition-colors hover:bg-white/5"
                          >
                            <td className="px-4 py-2 text-sm font-medium">{key}</td>
                            <td className="px-4 py-2 text-right font-mono text-sm">
                              {value === null ? (
                                <span className="text-white/30">N/A</span>
                              ) : (
                                value.toFixed(4)
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
