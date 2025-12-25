"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { TradingPair, SignalResponse, SignalsResponse } from "@/types/trading";
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

  // Signals for all timeframes
  const [signalsData, setSignalsData] = useState<SignalsResponse | null>(null);

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

  // Fetch signals when pair changes
  useEffect(() => {
    const fetchSignals = async () => {
      if (!selectedPair || !session?.access_token) {
        return;
      }

      try {
        setLoadingSignal(true);
        setError(null);
        setSignalsData(null);

        const response = await fetch("/api/signal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            symbol: selectedPair,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // Handle rate limiting
          if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After");
            throw new Error(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
          }

          throw new Error(errorData.message || "Failed to fetch signals");
        }

        const data = await response.json();
        setSignalsData(data);
      } catch (err) {
        console.error("Error fetching signals:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch signals");
      } finally {
        setLoadingSignal(false);
      }
    };

    fetchSignals();
  }, [selectedPair, session?.access_token]);

  // Get current signal for selected timeframe
  const currentSignal: SignalResponse | null = useMemo(() => {
    if (!signalsData || !selectedTimeframe) {
      return null;
    }
    return signalsData.signals[selectedTimeframe] || null;
  }, [signalsData, selectedTimeframe]);

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
    setSignalsData(null); // Reset signals when changing pair (will trigger new fetch)
  };

  // Handle timeframe selection
  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    // No need to reset signals - we use cached data
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
        />

        {/* Signal Result */}
        {currentSignal && <SignalResult signal={currentSignal} />}
      </div>
    </main>
  );
}
