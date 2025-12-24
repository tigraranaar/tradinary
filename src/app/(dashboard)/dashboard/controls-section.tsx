import { Button } from "@/components/ui/button";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";

interface ControlsSectionProps {
  pairOptions: ComboboxOption[];
  timeframeOptions: ComboboxOption[];
  selectedPair: string;
  selectedTimeframe: string;
  loadingPairs: boolean;
  loadingSignal: boolean;
  onPairChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
  onAnalyze: () => void;
}

export function ControlsSection({
  pairOptions,
  timeframeOptions,
  selectedPair,
  selectedTimeframe,
  loadingPairs,
  loadingSignal,
  onPairChange,
  onTimeframeChange,
  onAnalyze,
}: ControlsSectionProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
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
            onValueChange={onPairChange}
            placeholder="Select a pair"
            searchPlaceholder="Search pairs..."
            emptyMessage="No pair found."
            disabled={loadingPairs || pairOptions.length === 0}
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
            onValueChange={onTimeframeChange}
            placeholder="Select a timeframe"
            searchPlaceholder="Search timeframes..."
            emptyMessage="No timeframe found."
            disabled={loadingPairs || timeframeOptions.length === 0}
          />
        )}
      </div>

      {/* Analyze Button */}
      <Button
        onClick={onAnalyze}
        disabled={!selectedPair || loadingSignal || loadingPairs}
        variant="glass"
        className="mt-4 w-full"
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
      </Button>
    </div>
  );
}
