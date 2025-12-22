"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { TradingPair, SignalResponse } from "@/types/trading";
import { type ComboboxOption } from "@/components/ui/combobox";
import { SignalResult } from "./signal-result";
import { ControlsSection } from "./controls-section";
import { DashboardHeader } from "./dashboard-header";
import { ErrorMessage } from "./error-message";

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
        <DashboardHeader />

        {/* Error Message */}
        {error && <ErrorMessage error={error} />}

        {/* Controls Section */}
        <ControlsSection
          pairOptions={pairOptions}
          timeframeOptions={timeframeOptions}
          selectedPair={selectedPair}
          selectedTimeframe={selectedTimeframe}
          loadingPairs={loadingPairs}
          loadingSignal={loadingSignal}
          onPairChange={handlePairChange}
          onTimeframeChange={handleTimeframeChange}
          onAnalyze={handleAnalyze}
        />

        {/* Signal Result */}
        {signal && <SignalResult signal={signal} />}
      </div>
    </main>
  );
}
