"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/stores/dashboard-store";
import { SignalResult } from "../components/signal-result";
import { DashboardHeader } from "../components/dashboard-header";

export default function SignalPage() {
  const router = useRouter();
  const { getCurrentSignal, signalsData } = useDashboardStore();
  const currentSignal = getCurrentSignal();

  useEffect(() => {
    // Redirect to /dashboard if no signal exists
    if (!signalsData) {
      router.replace("/dashboard");
    }
  }, [router, signalsData]);

  if (!signalsData) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <DashboardHeader />

      {/* Signal Result */}
      {currentSignal && <SignalResult signal={currentSignal} />}
    </>
  );
}
