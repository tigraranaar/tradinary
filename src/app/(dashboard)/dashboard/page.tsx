"use client";

import { useState, useEffect } from "react";
import {
  IoChevronDown,
  IoTrendingUp,
  IoTrendingDown,
  IoRemove,
  IoAlertCircle,
} from "react-icons/io5";
import { useAuth } from "@/contexts/auth-context";
import { TradingPair, SignalResponse } from "@/types/trading";

export default function DashboardPage() {
  const { session } = useAuth();

  // Dropdowns state
  const [pairs, setPairs] = useState<TradingPair[]>([]);
  const [timeframes, setTimeframes] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>("");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("");
  const [isPairOpen, setIsPairOpen] = useState(false);
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

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
  const getSignalDisplay = (signalType: string) => {
    switch (signalType.toUpperCase()) {
      case "BUY":
        return {
          icon: IoTrendingUp,
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/40",
        };
      case "SELL":
        return {
          icon: IoTrendingDown,
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/40",
        };
      case "HOLD":
      case "NEUTRAL":
        return {
          icon: IoRemove,
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/40",
        };
      default:
        return {
          icon: IoRemove,
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/40",
        };
    }
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
            {/* Trading Pair Dropdown */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-white/80">Trading Pair</label>
              <button
                onClick={() => {
                  if (!loadingPairs && pairs.length > 0) {
                    setIsPairOpen(!isPairOpen);
                    setIsTimeframeOpen(false);
                  }
                }}
                disabled={loadingPairs || pairs.length === 0}
                className="glass flex w-full items-center justify-between rounded-xl px-4 py-3 backdrop-blur-lg transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="font-medium">
                  {loadingPairs ? "Loading pairs..." : selectedPair || "Select a pair"}
                </span>
                <IoChevronDown
                  className={`transition-transform ${isPairOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Pair Dropdown Menu */}
              {isPairOpen && (
                <div className="absolute z-10 mt-2 max-h-60 w-full overflow-hidden overflow-y-auto rounded-xl border border-white/10 bg-[#190029] shadow-xl">
                  {pairs.map((pair) => (
                    <button
                      key={pair.symbol}
                      onClick={() => {
                        setSelectedPair(pair.symbol);
                        setIsPairOpen(false);
                        setSignal(null); // Reset signal when changing pair
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors hover:bg-white/10 ${
                        selectedPair === pair.symbol ? "bg-white/10 font-medium" : ""
                      }`}
                    >
                      {pair.symbol}
                      {pair.name && <span className="ml-2 text-sm text-white/60">{pair.name}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timeframe Dropdown */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-white/80">Timeframe</label>
              <button
                onClick={() => {
                  setIsTimeframeOpen(!isTimeframeOpen);
                  setIsPairOpen(false);
                }}
                disabled={loadingPairs || pairs.length === 0}
                className="glass flex w-full items-center justify-between rounded-xl px-4 py-3 backdrop-blur-lg transition-all hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="font-medium">
                  {loadingPairs
                    ? "Loading timeframes..."
                    : selectedTimeframe || "Select a timeframe"}
                </span>
                <IoChevronDown
                  className={`transition-transform ${isTimeframeOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Timeframe Dropdown Menu */}
              {isTimeframeOpen && (
                <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#190029] shadow-xl">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => {
                        setSelectedTimeframe(timeframe);
                        setIsTimeframeOpen(false);
                        setSignal(null); // Reset signal when changing timeframe
                      }}
                      className={`w-full px-4 py-3 text-left transition-colors hover:bg-white/10 ${
                        selectedTimeframe === timeframe ? "bg-white/10 font-medium" : ""
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                  <p className={`text-3xl font-bold ${getSignalDisplay(signal.signal).color}`}>
                    {signal.signal}
                  </p>
                </div>
                {signal.confidence !== undefined && (
                  <p className="mt-2 text-sm text-white/60">
                    Confidence: {(signal.confidence * 100).toFixed(1)}%
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6">
                <p className="mb-2 text-sm text-white/60">Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Pair:</span>
                    <span className="font-semibold">{signal.pair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Timeframe:</span>
                    <span className="font-semibold">{signal.timeframe}</span>
                  </div>
                  {signal.price !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Price:</span>
                      <span className="font-semibold">${signal.price.toLocaleString()}</span>
                    </div>
                  )}
                  {signal.timestamp && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Time:</span>
                      <span className="font-semibold">
                        {new Date(signal.timestamp).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analysis/Recommendation */}
            {(signal.analysis || signal.recommendation) && (
              <div className="glass mt-6 rounded-xl p-6 backdrop-blur-lg">
                <h3 className="mb-3 text-lg font-semibold">
                  {signal.analysis ? "Analysis" : "Recommendation"}
                </h3>
                <p className="leading-relaxed text-white/80">
                  {signal.analysis || signal.recommendation}
                </p>
              </div>
            )}

            {/* Indicators */}
            {signal.indicators && Object.keys(signal.indicators).length > 0 && (
              <div className="glass mt-6 rounded-xl p-6 backdrop-blur-lg">
                <h3 className="mb-3 text-lg font-semibold">Technical Indicators</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {Object.entries(signal.indicators).map(([key, value]) => (
                    <div key={key} className="rounded-lg bg-white/5 p-3">
                      <p className="mb-1 text-xs text-white/60">{key.toUpperCase()}</p>
                      <p className="font-semibold">
                        {typeof value === "number" ? value.toFixed(2) : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
