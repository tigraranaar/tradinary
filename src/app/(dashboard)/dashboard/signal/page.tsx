"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { SignalResult } from "../signal-result";
import { DashboardHeader } from "../dashboard-header";

export default function SignalPage() {
  const { getCurrentSignal } = useDashboardStore();
  const currentSignal = getCurrentSignal();

  return (
    <>
      {/* Header */}
      <DashboardHeader />

      {/* Signal Result */}
      {currentSignal && <SignalResult signal={currentSignal} />}
    </>
  );
}
