"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/stores/dashboard-store";

export default function DashboardPage() {
  const router = useRouter();
  const { signalsData } = useDashboardStore();

  useEffect(() => {
    // Redirect to /dashboard/signal if signal exists, otherwise stay on /dashboard
    if (signalsData) {
      router.replace("/dashboard/signal");
    }
  }, [router, signalsData]);

  return null;
}
