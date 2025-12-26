import { create } from "zustand";
import { SignalsResponse, SignalResponse, TradingPair } from "@/types/trading";

interface DashboardState {
  // Pairs and timeframes
  pairs: TradingPair[];
  timeframes: string[];
  setPairs: (pairs: TradingPair[]) => void;
  setTimeframes: (timeframes: string[]) => void;

  // Selected values
  selectedPair: string;
  selectedTimeframe: string;
  setSelectedPair: (pair: string) => void;
  setSelectedTimeframe: (timeframe: string) => void;

  // Signals data
  signalsData: SignalsResponse | null;
  setSignalsData: (data: SignalsResponse | null) => void;

  // Loading states
  loadingPairs: boolean;
  loadingSignal: boolean;
  setLoadingPairs: (loading: boolean) => void;
  setLoadingSignal: (loading: boolean) => void;

  // Computed: get current signal
  getCurrentSignal: () => SignalResponse | null;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  pairs: [],
  timeframes: [],
  selectedPair: "",
  selectedTimeframe: "",
  signalsData: null,
  loadingPairs: true,
  loadingSignal: false,

  // Setters
  setPairs: (pairs) => set({ pairs }),
  setTimeframes: (timeframes) => set({ timeframes }),
  setSelectedPair: (pair) => set({ selectedPair: pair }),
  setSelectedTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),
  setSignalsData: (data) => set({ signalsData: data }),
  setLoadingPairs: (loading) => set({ loadingPairs: loading }),
  setLoadingSignal: (loading) => set({ loadingSignal: loading }),

  // Computed
  getCurrentSignal: () => {
    const { signalsData, selectedTimeframe } = get();
    if (!signalsData || !selectedTimeframe) {
      return null;
    }
    return signalsData.signals[selectedTimeframe] || null;
  },
}));
