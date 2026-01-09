"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const {
    pairs,
    timeframes,
    selectedPair,
    selectedTimeframe,
    signalsData,
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

  // Fetch signals manually
  const handleAnalyze = async () => {
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
      // Redirect to /dashboard/signal after successful analysis
      if (pathname === "/dashboard") {
        router.push("/dashboard/signal");
      }
    } catch (err) {
      console.error("Error fetching signals:", err);
    } finally {
      setLoadingSignal(false);
    }
  };

  // Convert pairs to combobox options
  const pairOptions: ComboboxOption[] = useMemo(
    () =>
      pairs.map((pair) => ({
        value: pair.symbol,
        label: pair.symbol.toUpperCase(),
      })),
    [pairs]
  );

  // Handle pair selection
  const handlePairChange = (value: string) => {
    setSelectedPair(value);
    setSignalsData(null); // Reset signals when changing pair
    // Redirect to /dashboard when changing pair
    if (pathname !== "/dashboard") {
      router.push("/dashboard");
    }
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
              <div className="flex flex-col gap-6">
                <Combobox
                  options={pairOptions}
                  value={selectedPair}
                  onValueChange={handlePairChange}
                  placeholder="Select a pair"
                  searchPlaceholder="Search pairs..."
                  emptyMessage="No pair found."
                  disabled={loadingPairs || pairOptions.length === 0}
                />
                <Button
                  variant="glass"
                  onClick={handleAnalyze}
                  disabled={
                    loadingSignal || !selectedPair || loadingPairs || pairOptions.length === 0
                  }
                  className="whitespace-nowrap"
                >
                  {loadingSignal ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            )}

            {/* Vertical Menu - Only show after analysis */}
            {signalsData && (
              <div className="mt-10 flex flex-col gap-2">
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
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Loading Signals Indicator */}
        {loadingSignal ? (
          <div className="mb-6">
            <div className="glass flex items-center justify-center gap-3 rounded-xl p-4 backdrop-blur-lg">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500"></div>
              <span className="text-sm font-medium text-white/80">Loading signals...</span>
            </div>
          </div>
        ) : null}

        {/* Timeframe Selection - Always visible */}
        {signalsData ? (
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-white/80">
              Choose a Timeframe
            </label>
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
        ) : null}

        {/* Page Content */}
        {children}
      </div>
    </main>
  );
}
