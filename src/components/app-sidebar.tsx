"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { ControlsSection } from "@/app/(dashboard)/dashboard/controls-section";
import { type ComboboxOption } from "@/components/ui/combobox";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
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

export function AppSidebar({
  pairOptions,
  timeframeOptions,
  selectedPair,
  selectedTimeframe,
  loadingPairs,
  loadingSignal,
  onPairChange,
  onTimeframeChange,
  onAnalyze,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <ControlsSection
          pairOptions={pairOptions}
          timeframeOptions={timeframeOptions}
          selectedPair={selectedPair}
          selectedTimeframe={selectedTimeframe}
          loadingPairs={loadingPairs}
          loadingSignal={loadingSignal}
          onPairChange={onPairChange}
          onTimeframeChange={onTimeframeChange}
          onAnalyze={onAnalyze}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
