"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const pathname = usePathname();
  const {
    pairs,
    timeframes,
    selectedPair,
    selectedTimeframe,
    loadingPairs,
    loadingSignal,
    setPairs,
    setTimeframes,
    setSelectedPair,
    setSelectedTimeframe,
    setSignalsData,
    setLoadingPairs,
    setLoadingSignal,
    getCurrentSignal,
  } = useDashboardStore();

  const currentSignal = getCurrentSignal();

  // Get current tab from pathname
  const currentTab = pathname === "/dashboard/indicators" ? "indicators" : "signal";

  // Fetch pairs on mount
  useEffect(() => {
    const fetchPairs = async () => {
      if (!session?.access_token) {
        return;
      }

      try {
        setLoadingPairs(true);

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
          useDashboardStore.getState().setSelectedTimeframe(data.timeframes[0]);
        }
      } catch (err) {
        console.error("Error fetching pairs:", err);
      } finally {
        setLoadingPairs(false);
      }
    };

    fetchPairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.access_token]);

  // Fetch signals when pair changes
  useEffect(() => {
    const fetchSignals = async () => {
      if (!selectedPair || !session?.access_token) {
        return;
      }

      try {
        setLoadingSignal(true);
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
      } finally {
        setLoadingSignal(false);
      }
    };

    fetchSignals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPair, session?.access_token]);

  // Convert pairs to combobox options
  const pairOptions: ComboboxOption[] = useMemo(
    () =>
      pairs.map((pair) => ({
        value: pair.symbol,
        label: pair.name ? `${pair.symbol} - ${pair.name}` : pair.symbol,
      })),
    [pairs]
  );

  // Handle pair selection
  const handlePairChange = (value: string) => {
    setSelectedPair(value);
    setSignalsData(null); // Reset signals when changing pair (will trigger new fetch)
  };

  // Handle timeframe selection
  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
  };

  return (
    <main className="px min-h-screen w-full gap-16 pt-8 md:flex md:px-24">
      {/* Sidebar */}
      <div className="p-4 md:w-74">
        <div className="w-[inherit] md:fixed">
          <div className="glass rounded-md p-4">
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
                disabled={loadingPairs || pairOptions.length === 0}
              />
            )}

            {/* Vertical Menu */}
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/dashboard/signal">
                <Button
                  variant={currentTab === "signal" ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  Signal
                </Button>
              </Link>
              <Link href="/dashboard/indicators">
                <Button
                  variant={currentTab === "indicators" ? "default" : "ghost"}
                  className="w-full justify-start"
                  disabled={!currentSignal}
                >
                  Indicators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Timeframe Selection - Always visible */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-white/80">Timeframe</label>
          {loadingPairs ? (
            <div className="glass flex flex-wrap gap-2 rounded-xl p-2 backdrop-blur-lg">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-9 w-20 rounded-md" />
              ))}
            </div>
          ) : (
            <div className="glass flex flex-wrap gap-2 rounded-xl p-2 backdrop-blur-lg">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                  className={
                    selectedTimeframe === timeframe
                      ? "border-purple-500/40 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }
                  onClick={() => handleTimeframeChange(timeframe)}
                  disabled={loadingSignal || !selectedPair}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Page Content */}
        {children}
      </div>
    </main>
  );
}
